---
date: 2026-06-29
category:
  - redis
tag:
  - Node.js
  - ioredis
  - 全栈
  - 前端转后端
---

# Node.js 操作 Redis（ioredis 实战）

## 1. 安装与连接

```bash
npm install ioredis
```

```javascript
const Redis = require('ioredis');

// 连接 Redis（默认 localhost:6379）
const redis = new Redis();

// 指定配置
const redis = new Redis({
    host: 'localhost',
    port: 6379,
    password: '123456',
    db: 0,                    // 数据库编号（默认 0~15）
    retryStrategy: (times) => {
        // 断线重连策略
        return Math.min(times * 50, 2000);  // 最多等 2 秒
    },
});

// 连接字符串方式
const redis = new Redis('redis://:password@localhost:6379/0');

// 测试连接
redis.ping().then(res => {
    console.log('Redis 连接', res === 'PONG' ? '✅' : '❌');
});
```

---

## 2. 基础 CRUD

```javascript
// Redis 命令直接映射为 JS 方法调用

// String
await redis.set('name', '小明');
const name = await redis.get('name');       // '小明'
await redis.del('name');

// 设置过期（两种方式）
await redis.set('code', '9527', 'EX', 60);
await redis.setex('code', 60, '9527');      // 同上一行

// 原子递增
const count = await redis.incr('visitor');   // 1
const count5 = await redis.incrby('visitor', 5);  // 6

// List
await redis.rpush('queue', '任务A', '任务B');
const task = await redis.lpop('queue');     // '任务A'
const all = await redis.lrange('queue', 0, -1);  // ['任务B']

// Hash
await redis.hset('user:1', 'name', '小明', 'age', 25);
const name = await redis.hget('user:1', 'name');  // '小明'
const all = await redis.hgetall('user:1');
// { name: '小明', age: '25' }

// Set
await redis.sadd('tags', '前端', '后端', 'Redis');
const has = await redis.sismember('tags', 'Redis');  // 1
const all = await redis.smembers('tags');

// Zset
await redis.zadd('leaderboard', 100, '小明', 80, '小红');
const top = await redis.zrevrange('leaderboard', 0, 2, 'WITHSCORES');
// ['小明', '100', '小红', '80']

// 其他
await redis.exists('name');     // 是否存在
await redis.expire('name', 60); // 设过期
await redis.ttl('name');        // 查剩余时间
await redis.type('name');       // 类型
```

---

## 3. 封装 Redis 工具类

```javascript
// utils/redisCache.js
class RedisCache {
    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD,
            retryStrategy: (times) => Math.min(times * 100, 3000),
        });
    }

    // 获取缓存（自动 JSON 解析）
    async get(key) {
        const data = await this.redis.get(key);
        if (!data) return null;
        try { return JSON.parse(data); }
        catch { return data; }  // 非 JSON 直接返回
    }

    // 设置缓存（自动 JSON 序列化）
    async set(key, value, ttl = 3600) {
        const data = JSON.stringify(value);
        if (ttl > 0) {
            await this.redis.setex(key, ttl, data);
        } else {
            await this.redis.set(key, data);
        }
    }

    // 删除缓存
    async del(key) {
        await this.redis.del(key);
    }

    // 带缓存的查询（封装 Cache Aside 模式）
    async getOrSet(key, fetchFn, ttl = 3600) {
        const cached = await this.get(key);
        if (cached !== null) {
            console.log(`[缓存命中] ${key}`);
            return cached;
        }

        console.log(`[缓存未命中] ${key}，查询数据`);
        const data = await fetchFn();
        await this.set(key, data, ttl);
        return data;
    }

    // 清理指定模式的所有 key
    async clearPattern(pattern) {
        const stream = this.redis.scanStream({ match: pattern });
        for await (const keys of stream) {
            if (keys.length > 0) {
                await this.redis.del(...keys);
            }
        }
    }
}

module.exports = new RedisCache();
```

### 使用示例

```javascript
const cache = require('./utils/redisCache');

// 读取用户（自动缓存 1 小时）
const user = await cache.getOrSet(
    `user:${id}`,
    () => db.findUser(id),
    3600
);

// 更新用户（先更新 DB 再删缓存）
await db.updateUser(id, data);
await cache.del(`user:${id}`);

// 热点数据缓存 5 分钟
const news = await cache.getOrSet(
    'hot:news',
    () => db.findHotNews(),
    300
);
```

---

## 4. Session 中间件实战

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');

const redisClient = new Redis();

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,  // 1 天
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    },
}));

// 登录
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.verifyLogin(username, password);

    if (!user) {
        return res.status(401).json({ error: '用户名或密码错误' });
    }

    // Session 自动存到 Redis
    req.session.userId = user.id;
    req.session.role = user.role;
    res.json({ message: '登录成功' });
});

// 验证登录（中间件）
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: '请先登录' });
    }
    next();
}

// 需登录的接口
app.get('/api/profile', requireAuth, async (req, res) => {
    const user = await db.findUser(req.session.userId);
    res.json(user);
});
```

---

## 5. 限流中间件

```javascript
// 限流中间件：每 IP 每分钟最多 60 次
async function rateLimiter(req, res, next) {
    const key = `ratelimit:${req.ip}`;
    const current = await redis.incr(key);

    if (current === 1) {
        await redis.expire(key, 60);
    }

    if (current > 60) {
        return res.status(429).json({
            error: '请求过于频繁',
            retryAfter: await redis.ttl(key),
        });
    }

    res.setHeader('X-RateLimit-Remaining', 60 - current);
    next();
}

app.use('/api', rateLimiter);
```

---

## 6. 防重复提交

```javascript
// 幂等性：基于 Redis 的去重

app.post('/api/orders', async (req, res) => {
    const idempotentKey = req.headers['idempotent-key'];
    if (!idempotentKey) {
        return res.status(400).json({ error: '缺少幂等键' });
    }

    // SETNX：key 存在则失败（防止重复提交）
    const key = `idempotent:${idempotentKey}`;
    const created = await redis.set(key, 'processing', 'NX', 'EX', 60);

    if (!created) {
        const status = await redis.get(key);
        return res.status(409).json({
            error: '请求已提交',
            status,
        });
    }

    try {
        const order = await createOrder(req.body);
        await redis.set(key, 'completed');
        res.json(order);
    } catch (err) {
        await redis.del(key);  // 失败后允许重试
        throw err;
    }
});
```

---

## 7. 安装与运行

```bash
# 安装 Redis
brew install redis

# 启动
brew services start redis
# 或 redis-server /usr/local/etc/redis.conf

# 验证
redis-cli ping
# PONG

# Node.js 连接测试
node -e "
const Redis = require('ioredis');
const r = new Redis();
r.ping().then(console.log).catch(console.error);
"
# PONG
```

---

## ioredis API 速查

| Redis 命令 | ioredis 方法 | 说明 |
|-----------|-------------|------|
| SET | `set(key, val)` | 存字符串 |
| GET | `get(key)` | 取字符串 |
| SETEX | `setex(key, sec, val)` | 存 + 过期 |
| DEL | `del(key)` | 删除 |
| INCR | `incr(key)` | 递增 |
| EXPIRE | `expire(key, sec)` | 设过期 |
| TTL | `ttl(key)` | 查剩余时间 |
| HSET | `hset(key, field, val)` | 存 Hash 字段 |
| HGET | `hget(key, field)` | 取 Hash 字段 |
| HGETALL | `hgetall(key)` | 取所有 Hash |
| LPUSH | `lpush(key, val)` | 左入 |
| RPUSH | `rpush(key, val)` | 右入 |
| LPOP | `lpop(key)` | 左出 |
| LRANGE | `lrange(key, start, stop)` | 范围查询 |
| SADD | `sadd(key, member)` | Set 添加 |
| SMEMBERS | `smembers(key)` | Set 全部 |
| ZADD | `zadd(key, score, member)` | Zset 添加 |
| ZREVRANGE | `zrevrange(key, start, stop)` | 排行榜 |
| PUBLISH | `publish(channel, msg)` | 发布 |
| SUBSCRIBE | `subscribe(channel)` | 订阅 |
| PIPELINE | `pipeline().set().get().exec()` | 批量命令 |
| MULTI | `multi().set().get().exec()` | 事务 |
