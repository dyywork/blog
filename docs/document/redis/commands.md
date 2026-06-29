---
date: 2026-06-29
category:
  - redis
tag:
  - 命令
  - 过期
  - 事务
  - 前端转后端
---

# 常用命令 & 机制（对比 JS API）

## 1. 过期时间（TTL）— ≈ setTimeout 自动删除

```redis
# 设置 key 的同时指定过期时间
SET code "9527" EX 300        # 300 秒后自动删除

# 单独设置过期
SET code "9527"
EXPIRE code 300               # 300 秒后过期

# 查看剩余时间
TTL code                     # → 267（还有 267 秒）
TTL code                     # → -1 表示永不过期
TTL code                     # → -2 表示 key 已不存在

# 移除过期时间
PERSIST code

# 设置过期时间（毫秒）
SET code "9527" PX 300000    # 300 秒（毫秒为单位）

# 更精准：过期时间戳
EXPIREAT code 1800000000     # 在指定时间戳过期
```

```javascript
// JS 类比（手动实现）
const cache = new Map();

function setWithTTL(key, value, seconds) {
    cache.set(key, value);
    setTimeout(() => cache.delete(key), seconds * 1000);
}
```

**实战场景**：
- 验证码：5 分钟过期
- Session：30 分钟无操作自动过期
- 限流：1 秒内只允许 10 次请求（用 TTL 做滑动窗口）
- 缓存：热点数据 1 小时失效

---

## 2. Key 命名规范与操作

```redis
# 命名惯例：对象类型:ID:字段
# 像 URL 路径一样组织

SET user:1:name "小明"         # 用户 ID 1 的名字
SET article:42:title "标题"    # 文章 ID 42 的标题

# 键空间操作（≈ Object.keys / Map.keys）
KEYS *                         # 查看所有 key（生产环境禁用！会卡死）
KEYS user:*                    # 查所有 user 前缀的 key

# 改用 SCAN（安全版本，分批遍历）
SCAN 0 MATCH user:* COUNT 100  # 分批扫描，不阻塞 Redis

# 判断 key 是否存在
EXISTS user:1:name             # → 1（存在）
EXISTS notexist                # → 0（不存在）

# 删除
DEL user:1:name

# 查看类型
TYPE user:1:name               # → string
TYPE user:1                    # → hash

# 查看剩余过期时间
TTL user:1:name
```

> ⚠️ **生产环境禁止用 KEYS \***：会遍历所有 key，如果 key 数量很大（百万级）会阻塞 Redis 几秒钟！

---

## 3. 事务（对比 JS Promise.all + 回滚）

```redis
# Redis 事务：命令按顺序执行，不会被其他客户端打断
MULTI                         # 开始事务（类似 START TRANSACTION）
SET stock:1 10
DECR stock:1                  # 减少库存
EXEC                          # 执行（类似 COMMIT）

# 放弃事务
DISCARD                       # 类似 ROLLBACK

# 带条件的事务（乐观锁，类似前端 CAS 乐观更新）
WATCH stock:1                 # 监视 key
GET stock:1                   # 检查库存
# ... 如果 stock:1 被别的客户端改了，EXEC 会失败
MULTI
DECR stock:1
EXEC
# 如果执行期间 stock:1 被修改，EXEC 返回 nil（失败）
```

```javascript
// JS 类比
// 普通事务 ≈ Promise.all（按顺序、互不打扰）
await Promise.all([cmd1, cmd2, cmd3]);

// WATCH ≈ 乐观锁（git push 前发现冲突）
async function decrStock(id) {
    const version = await getVersion(id);
    // 如果别人改了 version，下面的 update 会失败
    await update({ id, version: version + 1 });
}
```

**对比 MySQL 事务**：

| 特性 | MySQL | Redis |
|------|-------|-------|
| 原子性 | ✅ 全做或全不做 | ❌ 某条失败，前面不自动回滚 |
| 隔离性 | 多种隔离级别 | 串行执行命令 |
| 回滚 | ROLLBACK | DISCARD 仅放弃未执行的 |
| 复杂度 | 高 | 简单 |

> **Redis 事务的特性**：命令排着队按顺序执行，中间不插队。但不像 MySQL 那样某条失败就自动回滚。

---

## 4. Pipeline — 批量发送（≈ Promise.all 批量请求）

```redis
# 普通模式：发 3 条命令需要 3 次网络往返
SET a 1
GET a
INCR a

# Pipeline：一次性发送，一次性接收结果
# （N 条命令只需要 1 次网络往返）
```

```javascript
// Node.js Pipeline 示例
const pipeline = redis.pipeline();
pipeline.set('a', 1);
pipeline.get('a');
pipeline.incr('a');
const results = await pipeline.exec();
// results → [[null, 'OK'], [null, '1'], [null, '2']]
```

> **前端理解**：Pipeline ≈ HTTP/2 的多路复用，一次连接发多个请求，减少网络开销。批量操作性能提升 5~10 倍。

---

## 5. 分布式锁（前端没有的机制）

```redis
# 用 SETNX + 过期时间实现分布式锁
# SETNX = SET if Not eXists

# 加锁
SETNX lock:order:123 "server-A"   # 成功返回 1，失败返回 0
EXPIRE lock:order:123 10          # 避免死锁：10 秒自动释放

# Redis 2.8+ 一行搞定（加锁 + 过期原子操作）
SET lock:order:123 "server-A" NX EX 10

# 解锁
if GET lock:order:123 == "server-A"
    DEL lock:order:123
```

```javascript
// JS 类比：用唯一 key 加锁
// 多人同时操作同一条数据时，只有第一个人能拿到锁
```

**场景**：秒杀库存、定时任务防重复执行、分布式系统资源互斥

---

## 6. 消息队列（List 实现）

```redis
# 生产者（≈ postMessage）
LPUSH msg:queue "任务1"        # 发消息

# 消费者（≈ 轮询接收）
BRPOP msg:queue 0             # 阻塞直到有消息（0 = 永远等待）
BRPOP msg:queue 30            # 阻塞最多 30 秒

# 多个消费者：一条消息只能被一个消费者取走
# 天然实现任务分发
```

```javascript
// JS 类比
// 生产者
messageQueue.push('任务1');

// 消费者（阻塞式等待）
while (true) {
    const task = await waitForTask();  // 类似 BRPOP
    process(task);
}
```

---

## 命令速查表

| 场景 | 命令 | 说明 |
|------|------|------|
| 设置 | `SET key val [EX/NX/XX]` | 存值，可设过期、仅在不存在时设 |
| 读取 | `GET key` | 取值 |
| 删除 | `DEL key` | 删键 |
| 过期 | `EXPIRE key sec` | 设秒级过期 |
| 过期 | `TTL key` | 查剩余秒数 |
| 判断 | `EXISTS key` | 是否存在 |
| 类型 | `TYPE key` | 值类型 |
| 事务 | `MULTI / EXEC` | 开启/执行事务 |
| 批量 | Pipeline | 一次性发送多条（客户端功能） |
| 锁 | `SET NX EX` | 原子性分布式锁 |
| 遍历 | `SCAN cursor` | 安全遍历所有 key |
