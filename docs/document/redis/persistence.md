---
date: 2026-06-29
category:
  - redis
tag:
  - 持久化
  - RDB
  - AOF
  - 主从
---

# 持久化 & 主从架构

## 一、Redis 为什么快？

```
所有数据都在内存中
每个命令单线程执行（无锁竞争）
高效的数据结构（跳表、压缩列表）
IO 多路复用（类似 Node.js 的事件循环）
```

> **前端理解**：Redis 是内存数据库 ≈ JS 变量存在内存中，MySQL 存在磁盘上。所以 Redis 读写在**微秒级**，MySQL 在**毫秒级**。

---

## 二、持久化——内存数据如何不丢？

Redis 数据在内存，服务器重启会丢失。持久化就是把内存数据保存到磁盘。

### 1. RDB（快照）

```
原理：定期把全部数据拍个快照存到 dump.rdb 文件
```

```bash
# redis.conf 配置
save 900 1          # 900 秒内至少 1 个 key 修改，触发快照
save 300 10         # 300 秒内至少 10 个 key 修改，触发快照
save 60 10000       # 60 秒内至少 10000 个 key 修改，触发快照

# 手动触发
redis-cli SAVE      # 同步保存（阻塞）
redis-cli BGSAVE    # 后台保存（推荐，像 JS 的 setTimeout）
```

| 优点 | 缺点 |
|------|------|
| 文件小，适合备份 | 可能丢数据（2 次快照之间的数据） |
| 恢复快（直接加载） | 大数据库保存时卡顿（fork 进程） |
| 适合灾备 | - |

### 2. AOF（追加文件）

```
原理：每次写命令都记录下来，重启时重放命令恢复数据
类似前端操作日志：记录每一步操作，崩溃后重新执行
```

```bash
# redis.conf 配置
appendonly yes                    # 开启 AOF
appendfsync always                # 每次写都刷盘（最安全，最慢）
appendfsync everysec              # 每秒刷一次（推荐）
appendfsync no                    # 交给操作系统（最快，最不安全）

# 文件重写（合并冗余命令）
auto-aof-rewrite-percentage 100   # 文件增长 100% 触发重写
auto-aof-rewrite-min-size 64mb    # 至少 64MB 才触发
```

```javascript
// AOF 原理类比
// 这条命令：
SET user:1:name "小明"
SET user:1:age "25"

// 重写后合并为一行（节约空间）
HMSET user:1 name "小明" age "25"
```

| 优点 | 缺点 |
|------|------|
| 数据完整（最多丢 1 秒数据） | 文件比 RDB 大 |
| 可读的日志文件 | 恢复比 RDB 慢 |

### 3. RDB + AOF 同时用（推荐）

```bash
# 同时开启
save 900 1
appendonly yes
appendfsync everysec
```

> **加载顺序**：重启时优先用 AOF（数据更完整），没有 AOF 就用 RDB

---

## 三、主从复制（读写分离）

### 架构

```
┌───────────┐（写）
│  主节点 M  │  → 写入/修改/删除
│           │
└─────┬─────┘
      │ 同步
  ┌───┴───┬───┐
  │       │   │
┌─▼──┐ ┌─▼──┐ ┌─▼──┐（读）
│ S1  │ │ S2  │ │ S3  │  → 查询/读操作
└────┘ └────┘ └────┘
```

### 配置

```bash
# 从节点 redis.conf
replicaof 127.0.0.1 6379   # 主节点的 IP 和端口
# 或者命令行
redis-cli> REPLICAOF 127.0.0.1 6379

# 主节点配置（可选）
masterauth yourpassword      # 如果主节点有密码
```

```javascript
// Node.js 读写分离
const Redis = require('ioredis');

// 主节点（写）
const master = new Redis({ host: 'master-host', port: 6379 });

// 从节点（读）
const slave = new Redis({ host: 'slave-host', port: 6379 });

// 写操作走主库
async function createUser(data) {
    await master.set(`user:${data.id}`, JSON.stringify(data));
}

// 读操作走从库
async function getUser(id) {
    return await slave.get(`user:${id}`);
}
```

### 主从同步原理

```
从节点启动 → 发 SYNC 给主节点
主节点 BGSAVE 生成 RDB → 发送给从节点
从节点加载 RDB → 追上主节点的后续操作
之后主节点持续同步增量命令
```

> **前端理解**：主从 ≈ CDN + 源站。源站（主）负责更新，CDN 节点（从）负责读。主挂了可以选一个从升级为主。

---

## 四、哨兵模式（高可用）

### 问题：主节点挂了怎么办？

```
主节点宕机 → 手动切从为主 → 改应用配置 → 重启应用
这个过程太慢了，需要自动化
```

### 哨兵（Sentinel）解决

```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ 哨兵 1   │  │ 哨兵 2   │  │ 哨兵 3   │  ← 多个哨兵互相沟通
└────┬────┘  └────┬────┘  └────┬────┘
     └──────┬──────┘
            │ 监控
      ┌─────┴─────┐
      │  主节点 M   │
      │            │
      └─────┬─────┘
       ┌────┴────┐
       │         │
     ┌─▼──┐   ┌─▼──┐
     │ S1 │   │ S2 │
     └────┘   └────┘
```

**哨兵自动做的事情**：
1. 每隔 1 秒 ping 主节点
2. 主节点挂了，哨兵们投票
3. 多数哨兵同意后，从从节点中选一个当新主
4. 把应用客户端切换到新主

```bash
# 哨兵配置 sentinel.conf
sentinel monitor mymaster 127.0.0.1 6379 2  # 2 个哨兵同意才算
sentinel down-after-milliseconds 5000        # 5 秒没响应判定为挂
sentinel failover-timeout 60000             # 故障转移超时
```

---

## 五、Redis 安装与配置

```bash
# macOS 安装
brew install redis

# 启动
brew services start redis
# 或
redis-server /usr/local/etc/redis.conf

# 连接
redis-cli
redis-cli ping    # 返回 PONG 表示连接成功

# 带密码连接
redis-cli -h 127.0.0.1 -p 6379 -a yourpassword

# 常用配置
redis-cli> CONFIG GET requirepass   # 查看密码
redis-cli> CONFIG SET requirepass "123456"  # 设置密码
```

```bash
# redis.conf 常用配置
port 6379              # 端口
daemonize yes          # 后台运行
requirepass 123456     # 密码
maxmemory 512mb        # 最大内存
maxmemory-policy allkeys-lru  # 淘汰策略
bind 0.0.0.0           # 允许远程连接（生产环境注意安全）
```

---

## 速查表

| 概念 | 类比前端 |
|------|---------|
| RDB 快照 | Git 定期 commit |
| AOF 日志 | 操作录屏（可回放） |
| 主从复制 | CDN + 源站 |
| 哨兵 | 监控 + 自动故障转移 |
| 内存存储 | 存在变量里（快！） |
| 持久化 | localStorage.getItem/setItem |
| 单线程 | JavaScript 事件循环（避免锁问题） |
