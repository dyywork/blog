---
date: 2026-06-29
category:
  - redis
tag:
  - 缓存
  - 穿透
  - 击穿
  - 雪崩
  - 前端转后端
---

# 缓存实战（对比前端缓存策略）

## 1. Redis 缓存的基本模式

```javascript
// 前端：还记得请求缓存吗？
const cache = new Map();

async function fetchUser(id) {
    if (cache.has(id)) {
        return cache.get(id);          // 缓存命中
    }
    const data = await api.getUser(id); // 查数据库
    cache.set(id, data);               // 写入缓存
    return data;
}
```

```javascript
// Node.js + Redis 缓存
async function getUser(id) {
    // ① 先查缓存
    const cached = await redis.get(`user:${id}`);
    if (cached) {
        return JSON.parse(cached);      // 缓存命中 ✅
    }

    // ② 缓存未命中，查数据库
    const user = await db.findUser(id);

    // ③ 写入缓存，设置过期时间
    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));

    return user;
}
```

> **流程图**：请求 → 查缓存（有则返回）→ 无则查 DB → 写入缓存 → 返回

---

## 2. 三大缓存问题（面试高频）

### ① 缓存穿透 — 查一个不存在的数据

```javascript
// 问题：查一个不存在的 id（比如 -1），永远查不到缓存
// 每次都穿透到数据库，高并发下 DB 会挂

// ❌ 有问题的代码
async function getUser(id) {
    const cached = await redis.get(`user:${id}`);
    if (cached) return JSON.parse(cached);
    // 如果 id 不存在，每次请求都查 DB！
    const user = await db.findUser(id);
    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
    return user;
}

// ✅ 解决方案：缓存空值
async function getUser(id) {
    const cached = await redis.get(`user:${id}`);
    if (cached !== null) {              // 注意：存了空值也会返回
        return cached === 'NULL' ? null : JSON.parse(cached);
    }
    const user = await db.findUser(id);
    // 不管有没有数据都缓存（空值缓存 5 分钟）
    await redis.setex(`user:${id}`, user ? 3600 : 300,
        user ? JSON.stringify(user) : 'NULL');
    return user;
}

// ✅ 方案2：布隆过滤器（Bloom Filter）
// 在 Redis 前面加一层布隆过滤器，不存在的 id 直接拦截
// 类似前端的「黑名单」检查
```

```javascript
// 前端类比：防抖 + 缓存
// 缓存穿透 ≈ 请求一个不存在的路由
// 不用每次都去服务器查 404，在本地维护一个 404 列表
```

### ② 缓存击穿 — 热点 key 过期

```javascript
// 问题：某个热点 key 刚好过期，高并发瞬间打到 DB
// 比如微博热搜第一条的缓存刚过期，10000 个请求同时来

// ✅ 解决方案：互斥锁（只有第一个人查 DB）
async function getHotNews(id) {
    const cached = await redis.get(`hot:${id}`);
    if (cached) return JSON.parse(cached);

    // 尝试加锁，只有一个请求能拿到锁
    const lockKey = `lock:hot:${id}`;
    const locked = await redis.set(lockKey, '1', 'NX', 'EX', 10);

    if (locked) {
        // 拿到锁的请求查数据库
        const news = await db.findNews(id);
        await redis.setex(`hot:${id}`, 3600, JSON.stringify(news));
        await redis.del(lockKey);            // 释放锁
        return news;
    } else {
        // 没拿到锁的等待并重试
        await sleep(100);
        return getHotNews(id);              // 递归重试
    }
}
```

```javascript
// 前端类比：多个组件同时请求同一个接口
// 用请求去重：只发一次请求，其他人等结果
```

### ③ 缓存雪崩 — 大量 key 同时过期

```javascript
// 问题：大量 key 在同一时间过期，流量全部打到 DB

// ✅ 解决方案 1：过期时间加随机值
await redis.setex(`user:${id}`, 3600 + Math.random() * 600,
    JSON.stringify(user));
// 过期时间在 3600~4200 秒之间随机

// ✅ 解决方案 2：永不过期 + 异步刷新
async function getConfig(key) {
    // 没有设置过期时间
    const cached = await redis.get(`config:${key}`);
    if (cached) {
        // 后台异步刷新（刷新后半段逻辑单独运行）
        asyncRefreshConfig(key);
        return JSON.parse(cached);
    }
    // 首次加载
    const config = await db.getConfig(key);
    await redis.set(`config:${key}`, JSON.stringify(config));
    return config;
}

// ✅ 解决方案 3：多级缓存
// 浏览器缓存 → Redis 缓存 → 数据库
```

```javascript
// 前端类比：旧数据先展示，后台偷偷更新
// 类似 SWR（stale-while-revalidate）策略
```

---

## 3. 三种缓存模式

### Cache Aside（最常用）

```
读：先读缓存 → 没有 → 读 DB → 写缓存
写：先写 DB → 删缓存（不是更新缓存！）
```

```javascript
// 写的策略：先更新 DB，再删除缓存
async function updateUser(id, data) {
    await db.updateUser(id, data);     // ① 更新数据库
    await redis.del(`user:${id}`);     // ② 删除缓存（下次读会重新写）
}
// 为什么不更新缓存？并发写会导致缓存和 DB 不一致
```

### Read Through

```
读操作统一通过缓存层，缓存没有就去 DB 加载（类似代理模式）
```

### Write Behind

```
写的时候只写缓存，延迟批量写入 DB（性能好但有丢数据风险）
```

| 模式 | 读性能 | 写性能 | 一致性 | 复杂度 |
|------|--------|--------|--------|--------|
| Cache Aside | 高 | 高 | 高 | 低 |
| Read Through | 高 | 中 | 高 | 中 |
| Write Behind | 高 | 极高 | 低 | 高 |

> **日常推荐**：Cache Aside 模式，简单可靠，够用了。

---

## 4. 淘汰策略（内存满了怎么办？）

Redis 内存有限，当内存满了按照配置的策略淘汰旧数据。

```bash
# redis.conf 配置
maxmemory 512mb
maxmemory-policy allkeys-lru   # 常用策略
```

| 策略 | 说明 | 像什么 |
|------|------|--------|
| `noeviction` | 不淘汰，写报错 | `new Map()` 满了抛异常 |
| `allkeys-lru` | 淘汰最近最少用的 | 浏览器 LRU 缓存 |
| `allkeys-lfu` | 淘汰使用频率最低的 | - |
| `volatile-ttl` | 淘汰快要过期的 | - |
| `volatile-lru` | 只在有过期时间的 key 中 LRU | - |

> **生产推荐**：`allkeys-lru`，大多数场景的最佳选择。

---

## 5. 缓存实践建议

```javascript
// ✅ 1. 缓存粒度控制
// 没必要缓存所有字段，只缓存热点数据
redis.setex(`user:${id}:profile`, 3600, JSON.stringify({
    name: user.name,
    avatar: user.avatar,
    // 不缓存密码、不缓存不常用的字段
}));

// ✅ 2. 统一缓存前缀
// 便于管理和排查
redis.setex(`cache:user:${id}`, 3600, data);
redis.setex(`cache:article:${id}`, 3600, data);

// ✅ 3. 监控缓存命中率
// 可以用 INFO 命令查看
// redis-cli INFO stats | grep hits
// hits / (hits + misses) = 命中率（通常 > 90% 为佳）
```
