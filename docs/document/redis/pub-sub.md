---
date: 2026-06-29
category:
  - redis
tag:
  - 发布订阅
  - PubSub
  - 消息
  - 前端转后端
---

# 发布订阅（对比 JS EventEmitter / WebSocket）

## 1. Pub/Sub 模式理解

```javascript
// 前端已经熟悉的 EventEmitter（Node.js）或 addEventListener
const EventEmitter = require('events');
const emitter = new EventEmitter();

// 订阅
emitter.on('user:login', (data) => {
    console.log('用户登录:', data);
});

// 发布
emitter.emit('user:login', { userId: 1, time: Date.now() });
```

```redis
# Redis Pub/Sub：一摸一样的模式，只是跨进程/跨服务器
# 订阅（SUBSCRIBE）
SUBSCRIBE user:login              # 订阅用户登录事件

# 发布（PUBLISH）
PUBLISH user:login "用户1登录了"  # 发布消息给所有订阅者
```

> **区别**：EventEmitter 是进程内的，Redis Pub/Sub 是跨进程/跨服务器的。

---

## 2. 基础用法

```bash
# 终端 1：订阅频道
redis-cli> SUBSCRIBE news:tech
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "news:tech"
3) (integer) 1

# 终端 2：发布消息
redis-cli> PUBLISH news:tech "Redis 7.0 发布了"
(integer) 1     # 1 个订阅者收到了

# 终端 1 自动收到
1) "message"
2) "news:tech"
3) "Redis 7.0 发布了"
```

### 模式订阅（类似正则匹配）

```redis
# 用 PSUBSCRIBE 支持通配符
PSUBSCRIBE news:*              # 订阅所有 news: 开头的频道

# 发布
PUBLISH news:sports "体育新闻"
PUBLISH news:music "音乐新闻"
# 上面的消息都会收到
```

---

## 3. Node.js 实现

```javascript
const Redis = require('ioredis');

// 订阅者（可以是一个单独的服务）
const subscriber = new Redis();

subscriber.subscribe('order:created', 'order:paid', (err, count) => {
    console.log(`已订阅 ${count} 个频道`);
});

subscriber.on('message', (channel, message) => {
    const data = JSON.parse(message);
    console.log(`收到新消息 [${channel}]:`, data);

    switch (channel) {
        case 'order:created':
            // 处理新订单：库存更新、发送通知
            handleNewOrder(data);
            break;
        case 'order:paid':
            // 处理支付成功：发送邮件、开权限
            handlePaymentSuccess(data);
            break;
    }
});

// 发布者（另一个服务或同一服务）
const publisher = new Redis();

app.post('/api/orders', async (req, res) => {
    const order = await db.createOrder(req.body);

    // 发布事件 (不关心谁处理、何时处理)
    await publisher.publish('order:created', JSON.stringify({
        orderId: order.id,
        userId: order.userId,
        amount: order.amount,
    }));

    res.json(order);
});
```

---

## 4. Pub/Sub 场景 vs List 队列场景

Redis Pub/Sub 和 List 都能做消息传递，但有重要区别：

| 特性 | Pub/Sub | List (BRPOP) |
|------|---------|--------------|
| 消息存储 | ❌ 不存，发了就没了 | ✅ 存在 List 里 |
| 订阅者不在线 | ❌ 消息丢失 | ✅ 回来后还能消费 |
| 消息持久化 | ❌ | ✅ 支持 |
| 一消息多消费者 | ✅ 广播给所有订阅者 | ❌ 一人取走 |
| 消费确认 | ❌ 触发即认为已送达 | ✅ 显式 POP |
| 性能 | 极高 | 高 |

```redis
# Pub/Sub适合：广播通知
# - 用户上线通知所有好友
# - 配置变更通知所有服务器
# - 实时消息推送

# List 适合：任务队列
# - 邮件发送任务（执行失败了可以重试）
# - 图片处理任务（可以持久化不丢）
```

> **前端理解**：Pub/Sub ≈ EventEmitter（不存事件）；List ≈ 消息队列（事件持久化，可重试）

---

## 5. 实时通知实战

```javascript
// 场景：用户下单后，系统要做 N 件事
// 1. 扣库存（库存服务）
// 2. 发送确认邮件（邮件服务）
// 3. 推送订单通知（Push 服务）
// 4. 给客服通知（WebSocket 服务）

// 主服务：只负责下单，发布事件
app.post('/api/orders', async (req, res) => {
    const order = await createOrder(req.body);
    // 发布事件，其他服务自己订阅处理
    await redis.publish('events', JSON.stringify({
        type: 'order:created',
        data: order,
    }));
    res.json({ success: true, orderId: order.id });
});

// 邮件服务：独立进程，只订阅邮件相关事件
const mailSub = new Redis();
mailSub.subscribe('events');
mailSub.on('message', (ch, msg) => {
    const event = JSON.parse(msg);
    if (event.type === 'order:created') {
        await sendEmail(event.data.userId, '您的订单已确认');
    }
});

// WebSocket 服务：向客户端推送通知
const wsSub = new Redis();
wsSub.subscribe('events');
wsSub.on('message', (ch, msg) => {
    const event = JSON.parse(msg);
    if (event.type === 'order:created') {
        wsServer.to(`user:${event.data.userId}`).emit('notification', {
            title: '下单成功',
            orderId: event.data.orderId,
        });
    }
});
```

> **微服务通信**：Pub/Sub 让服务之间**解耦**——主服务只管发布事件，各个子服务独立订阅处理。

---

## 6. 配置中心（Config Center）

```redis
# 场景：修改配置后让所有服务器实时生效

# 配置服务：配置更新后发布通知
PUBLISH config:updated "{\"key\":\"max_upload_size\",\"value\":\"100MB\"}"

# 所有业务服务器订阅配置变更
SUBSCRIBE config:updated
# 收到后更新本地配置，无需重启
```

```javascript
// Node.js 实现配置热更新
const configSub = new Redis();
configSub.subscribe('config:updated');

configSub.on('message', (channel, message) => {
    const { key, value } = JSON.parse(message);
    config.set(key, value);         // 更新内存中的配置
    console.log(`配置已更新: ${key} = ${value}`);
});
```

> **前端理解**：有点像 Redux 的 dispatch → reducer，配置变更通过 Pub/Sub 同步到所有实例。

---

## 7. List vs Pub/Sub 选型指南

```
需要消息持久化？→ 选 List（任务队列）
需要广播给多个消费者？→ 选 Pub/Sub
需要消费确认？→ 选 List（完成后再 POP）
需要更低延迟？→ 选 Pub/Sub
需要处理大量积压消息？→ 选 List
```

| 场景 | 方案 | 原因 |
|------|------|------|
| 注册后发送欢迎邮件 | List | 邮件不能丢，可重试 |
| 用户上线通知好友 | Pub/Sub | 广播，离线无需补发 |
| 图片处理的异步任务 | List | 持久化，可做重试队列 |
| 配置变更通知 | Pub/Sub | 实时，丢了下次变更也能补 |
| 聊天室消息 | Pub/Sub | 实时广播，可配合 List 持久化 |
