---
date: 2026-06-29
category:
  - redis
tag:
  - 学习路线
  - 缓存
  - 前端转后端
---

# Redis 学习路线 — 前端开发者视角

## 为什么前端要学 Redis？

| 场景 | 之前怎么做 | 有了 Redis |
|------|-----------|------------|
| 接口缓存 | 自己写 Map/WeakMap 缓存 | Redis 自带过期、LRU 淘汰 |
| Session 登录态 | localStorage / JWT | Redis 集中存 Session，多服务器共享 |
| 消息通知 | WebSocket / 轮询 | Redis Pub/Sub |
| 排行榜 | JS sort 排序 | Redis Zset 有序集合直接搞定 |
| 计数器 | 请求后端接口查数据库 | Redis INCR 原子自增 |
| 限流 | 手动计数 | Redis 过期时间做滑动窗口 |

---

## 学习路线总览

| 阶段 | 主题 | 前端类比 | 预期时间 |
|------|------|----------|----------|
| 1 | 五种基础数据类型 | JS String / Map / Set / Array | 1 天 |
| 2 | 常用命令 & 过期策略 | 类似 JS Map API + setTimeout | 1 天 |
| 3 | 缓存实战 | 前端缓存策略 → 服务端缓存 | 1 天 |
| 4 | Session 与登录态 | localStorage → Redis 集中管理 | 1 天 |
| 5 | 发布订阅 | JS EventEmitter / WebSocket | 1 天 |
| 6 | 持久化与集群 | — | 1 天 |
| 7 | Node.js 操作 Redis | ioredis 实战 | 1 天 |

---

## 核心概念一览

```
前端概念 → Redis 对应
──────────────────────
const arr = []              → Redis List（双向链表）
const map = new Map()        → Redis Hash（键值对）
const set = new Set()        → Redis Set（去重集合）
（JS 无内置有序集合）         → Redis Zset（有序集合）
keyof T                      → Redis Key（都是字符串键）
setTimeout(fn, 1000)         → Redis TTL（过期时间）
EventEmitter.on('event')     → Redis Pub/Sub
localStorage                 → Redis 内存数据库
```

> **一句话理解**：Redis 像一个**全球共享的、可设置过期时间的** JavaScript Map，加上额外的数据结构能力。
