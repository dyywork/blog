---
date: 2026-06-29
category:
  - redis
tag:
  - 基础
  - 数据结构
  - 前端转后端
---

# 五种基础数据类型（对比 JS 数据结构）

## Redis 数据结构总览

```
┌────────────────────────────────────────────────────────┐
│                    Redis 数据类型                         │
├──────────┬──────────────────┬──────────────────────────┤
│ 类型     │ 底层结构          │ 前端类比                  │
├──────────┼──────────────────┼──────────────────────────┤
│ String   │ 动态字符串        │ string + number           │
│ List     │ 双向链表/压缩列表  │ Array（push/pop）        │
│ Hash     │ 哈希表            │ Map<string, string>      │
│ Set      │ 哈希表            │ Set                      │
│ Zset     │ 跳表 + 哈希表     │ 有序 Set（自动排序）      │
└──────────┴──────────────────┴──────────────────────────┘
```

---

## 1. String — 字符串（最基础）

```redis
# 存/取（≈ map.set / map.get）
SET name "小明"              # 存入
GET name                     # → "小明"

# 数值操作（原子性！没有并发问题）
SET count 0
INCR count                   # → 1（原子 +1）
INCRBY count 5              # → 6（原子 +5）
DECR count                   # → 5（原子 -1）

# 设置过期时间（≈ setTimeout + 自动删除）
SET code "1234" EX 60        # 60秒后自动删除
SETEX code 60 "1234"        # 同上，另一种写法
TTL code                     # 查看剩余秒数
```

```javascript
// JS 类比
const redis = new Map();
redis.set('name', '小明');
redis.get('name');          // '小明'

// 但 JS 没有原生的过期机制和原子递增
// Redis 是单线程处理命令，天然原子
```

**适用场景**：缓存 HTML、存 Session、计数器、验证码、分布式锁

---

## 2. List — 列表（≈ JS Array 的双向链表版）

```redis
# 右入/左出（队列 FIFO）
RPUSH queue "任务1"          # 右边入队
RPUSH queue "任务2"
LPOP queue                   # 左边出队 → "任务1"

# 左入/右出（栈 LIFO）
LPUSH stack "A"              # 左边入栈
LPUSH stack "B"
RPOP stack                   # 右边出栈 → "B"

# 范围查询（≈ arr.slice）
LRANGE list 0 -1            # 全部元素
LRANGE list 0 2             # 前3个

# 长度
LLEN list                    # ≈ arr.length
```

```javascript
// JS 类比
const queue = [];
queue.push('任务1');          // RPUSH
queue.push('任务2');
queue.shift();                // LPOP → '任务1'

const stack = [];
stack.unshift('A');           // LPUSH
stack.unshift('B');
stack.pop();                  // RPOP → 'B'
```

**适用场景**：消息队列、最新消息列表（取前 N 条）、时间线

---

## 3. Hash — 哈希（≈ JS Map）

```redis
# 存储对象（比 String 存 JSON 更灵活）
HSET user:1 name "小明" age "25" city "北京"
HGET user:1 name             # → "小明"
HGETALL user:1                # → {name: "小明", age: "25", city: "北京"}

# 批量操作
HMSET user:2 name "小红" age "23"
HMGET user:2 name age        # → ["小红", "23"]

# 递增某个字段
HINCRBY user:1 age 1        # 年龄 +1

# 获取所有字段或值
HKEYS user:1                  # → ["name", "age", "city"]
HVALS user:1                 # → ["小明", "25", "北京"]
```

```javascript
// JS 类比
const user1 = new Map();
user1.set('name', '小明');
user1.set('age', '25');
user1.get('name');           // '小明'
```

**适用场景**：存储用户信息/商品信息/配置等对象数据（比 String 存取部分字段更高效）

---

## 4. Set — 集合（≈ JS Set）

```redis
# 添加/移除
SADD tags "前端" "后端" "数据库"
SREM tags "后端"

# 判断是否存在（≈ set.has）
SISMEMBER tags "前端"        # → 1（存在）
SISMEMBER tags "后端"        # → 0（已移除）

# 集合操作
SMEMBERS tags                 # → ["前端", "数据库"]
SCARD tags                   # → 2（元素个数）

# 集合运算（Redis 特产）
SADD setA "a" "b" "c"
SADD setB "b" "c" "d"

SINTER setA setB             # 交集 → ["b", "c"]
SUNION setA setB             # 并集 → ["a", "b", "c", "d"]
SDIFF setA setB              # 差集 → ["a"]
```

```javascript
// JS 类比
const tags = new Set(['前端', '后端', '数据库']);
tags.delete('后端');
tags.has('前端');             // true
```

**适用场景**：标签系统、共同好友（交集）、每日签到（去重）

---

## 5. Zset — 有序集合（JS 没有直接对应，Redis 独有）

```redis
# 加分的成员（score 自动排序）
ZADD leaderboard 100 "小明"    # 100 分
ZADD leaderboard 80 "小红"     # 80 分
ZADD leaderboard 95 "小刚"     # 95 分

# 查看排名（升序：从低到高）
ZRANGE leaderboard 0 -1 WITHSCORES
# → ["小红", 80, "小刚", 95, "小明", 100]

# 查看排名（降序：谁分数最高排第一）
ZREVRANGE leaderboard 0 -1 WITHSCORES
# → ["小明", 100, "小刚", 95, "小红", 80]

# 获取分数
ZSCORE leaderboard "小明"     # → 100

# 增加分数
ZINCRBY leaderboard 10 "小明" # 小明 +10 分 → 110

# 排名（从 0 开始）
ZRANK leaderboard "小明"      # 排名第几（升序排位）
ZREVRANK leaderboard "小明"   # 排名第几（降序排位 ≈ 排行榜）
```

```javascript
// JS 没有内置有序集合，实现类似功能需要：
const leaderboard = [
    { name: '小明', score: 100 },
    { name: '小红', score: 80 },
    { name: '小刚', score: 95 },
];
leaderboard.sort((a, b) => b.score - a.score);
// 每次都要全排序，Redis Zset 是 O(log N)
```

**适用场景**：排行榜、延时队列（用时间戳做 score）、点赞排序、商品评分

---

## 速查表

| 操作 | Redis | JS 类比 | 复杂度 |
|------|-------|---------|--------|
| 存单个值 | `SET key val` | `map.set(key, val)` | O(1) |
| 取单个值 | `GET key` | `map.get(key)` | O(1) |
| 队列入队 | `RPUSH list el` | `arr.push(el)` | O(1) |
| 队列出队 | `LPOP list` | `arr.shift()` | O(1) |
| 存对象 | `HSET obj key val` | `map.set(key, val)` | O(1) |
| 集合添加 | `SADD set el` | `set.add(el)` | O(1) |
| 集合判断 | `SISMEMBER set el` | `set.has(el)` | O(1) |
| 有序集合加 | `ZADD zset score mem` | 无原生 | O(log N) |
| 排行榜 | `ZREVRANGE zset 0 9` | `sort + slice` | O(log N+M) |
| 设置过期 | `EXPIRE key 60` | 无原生 | O(1) |
