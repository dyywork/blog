---
date: 2026-06-29
category:
  - redis
tag:
  - Session
  - 分布式
  - 登录
  - 前端转后端
---

# Session 与分布式应用（对比前端 localStorage）

## 1. 为什么需要集中管理 Session？

```javascript
// ❌ 前端存登录态的做法
localStorage.setItem('token', 'jwt_token_xxx');
// 每次请求带 token，服务器验证签名
```

```javascript
// ❌ 单机 Session（只能一台服务器用）
// 服务器 A 存的 Session，在服务器 B 查不到！
app.use(session({
    secret: 'secret',
    // session 默认存内存里
}));

// 用户登录去了服务器 A，下一个请求打到服务器 B
// B 没有这个 Session → 用户被踢出登录！
```

```
用户请求 → Nginx 负载均衡
             ├── 服务器 A（有 Session ❌ 下次请求可能打到 B）
             ├── 服务器 B（没有 Session）
             └── 服务器 C（没有 Session）
```

**解决方案**：Session 从各服务器内存中抽出来，集中放到 Redis。

```
用户请求 → Nginx 负载均衡
             ├── 服务器 A → Redis（统一读 Session ✅）
             ├── 服务器 B → Redis（统一读 Session ✅）
             └── 服务器 C → Redis（统一读 Session ✅）
```

---

## 2. Node.js + Redis Session 实现

### Express Session 配置

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;

app.use(session({
    store: new RedisStore({ client: redis }),  // Session 存 Redis
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000,   // 30 分钟过期
        httpOnly: true,           // 不能通过 JS 访问
        secure: false,            // HTTPS 时才设为 true
        sameSite: 'lax',
    },
}));

// 登录成功后
app.post('/api/login', async (req, res) => {
    const user = await db.findUser(req.body.username);
    // ✅ Session 自动存到 Redis
    req.session.userId = user.id;
    req.session.role = user.role;

    res.json({ message: '登录成功' });
});

// 使用 Session
app.get('/api/profile', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: '未登录' });
    }
    const user = await db.findUser(req.session.userId);
    res.json(user);
});

// 登出
app.post('/api/logout', (req, res) => {
    req.session.destroy();  // Redis 中的 Session 自动删除
    res.json({ message: '登出成功' });
});
```

### 直接在 Redis 中操作 Session

```javascript
// 如果不用 express-session，也可以手动操作
// 登录
async function login(req, res) {
    const user = await db.findUser(req.body.username);
    const sessionId = generateUUID();   // 生成唯一 Session ID

    // 存到 Redis，30 分钟过期
    await redis.setex(`session:${sessionId}`, 1800, JSON.stringify({
        userId: user.id,
        role: user.role,
        loginAt: Date.now(),
    }));

    // 把 Session ID 通过 Cookie 发给前端
    res.cookie('session_id', sessionId, {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
    });
    res.json({ message: '登录成功' });
}

// 验证
async function authMiddleware(req, res, next) {
    const sessionId = req.cookies.session_id;
    if (!sessionId) return res.status(401).json({ error: '未登录' });

    const session = await redis.get(`session:${sessionId}`);
    if (!session) return res.status(401).json({ error: 'Session 已过期' });

    req.user = JSON.parse(session);
    next();
}
```

---

## 3. Session vs JWT 对比

```javascript
// JWT：无状态，数据在 token 里
const token = jwt.sign({ userId: 1 }, 'secret', { expiresIn: '7d' });
// ✅ 不需要 Redis 存储
// ❌ 无法主动让某用户登出（改密码才失效）

// Session：有状态，数据在 Redis 里
// ❌ 需要 Redis 存储
// ✅ 服务器可以主动登出某用户（删 Redis key）
```

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| Session + Redis | 主动登出、控制精细 | 需要 Redis、多一次网络 | 后台管理、金融系统 |
| JWT | 无状态、跨域友好 | 无法主动登出、体积大 | 移动端、SSO、开放 API |

> 一般建议：内部系统用 Session，对外 API 用 JWT。也可以结合使用。

---

## 4. 分布式限流

```javascript
// 场景：限制每个 IP 每分钟最多请求 100 次

async function rateLimit(req, res, next) {
    const ip = req.ip;
    const key = `ratelimit:${ip}`;

    // 用 INCR 原子递增
    const count = await redis.incr(key);

    // 第一次请求，设置过期时间
    if (count === 1) {
        await redis.expire(key, 60);  // 60 秒后自动重置
    }

    if (count > 100) {
        return res.status(429).json({ error: '请求过于频繁' });
    }

    // 返回剩余次数给前端（可选）
    res.setHeader('X-RateLimit-Remaining', 100 - count);
    next();
}

// 使用
app.use('/api', rateLimit);
```

```javascript
// 前端类比：lodash throttle
_.throttle(fn, 1000);   // 每秒执行一次
// Redis 限流是在「全局」层面，所有用户/服务器共享
```

---

## 5. 分布式锁应用

```javascript
// 场景：定时任务只在一个服务器执行
async function runScheduledTask() {
    const locked = await redis.set('cron:task', 'running', 'NX', 'EX', 60);

    if (!locked) {
        console.log('其他服务器已执行，跳过');
        return;
    }

    try {
        // 执行定时任务
        await sendDailyReport();
        await cleanExpiredData();
        console.log('定时任务完成 ✅');
    } finally {
        // 任务完成删除锁（为了安全，用 Lua 原子操作）
        await redis.eval(`
            if redis.call("GET", KEYS[1]) == ARGV[1] then
                redis.call("DEL", KEYS[1])
            end
        `, 1, 'cron:task', 'running');
    }
}
```

### 秒杀去重

```javascript
// 防止同一用户重复下单
async function createOrder(userId, productId) {
    const lockKey = `lock:order:${userId}:${productId}`;
    const locked = await redis.set(lockKey, '1', 'NX', 'EX', 30);

    if (!locked) {
        throw new Error('请勿重复下单');
    }

    // 执行下单逻辑...
    await db.createOrder(userId, productId);
    // 注意：下面的 Lua 脚本用于安全释放锁

    // 释放锁（Lua 保证原子性）
    const script = `
        if redis.call("GET", KEYS[1]) == ARGV[1] then
            return redis.call("DEL", KEYS[1])
        else
            return 0
        end
    `;
    await redis.eval(script, 1, lockKey, '1');
}
```

> **前端理解**：分布式锁 ≈ 前端请求去重 + 函数防抖的「全局版本」

---

## 6. Session VS 前端存储对比

| 场景 | localStorage | JWT | Session + Redis |
|------|-------------|-----|----------------|
| 存储位置 | 浏览器 | 浏览器 + 签名 | 服务器内存/Redis |
| 跨域 | ❌ 受限 | ✅ 方便 | 需配置 |
| 主动登出 | ❌ 无法 | ❌ 无法（除非黑名单） | ✅ 删 Redis key |
| 多服务器 | ✅ 不受影响 | ✅ 无状态 | ✅ 统一 Redis |
| 安全性 | 低（XSS 可读） | 中 | 高（httpOnly） |
| 分布式支持 | ✅ 天然 | ✅ 天然 | ✅ 集中 Redis |
| 典型场景 | 主题偏好 | 移动端 API | 网站登录 |
