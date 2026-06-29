---
date: 2026-06-29
category:
  - mysql
tag:
  - 索引
  - 事务
  - 性能优化
  - 前端转后端
---

# 索引 & 事务（对比前端思维）

## 一、索引（Index）

### 1. 什么是索引？

```sql
-- 没有索引时，查询会逐行扫描（≈ for 循环找）
SELECT * FROM users WHERE name = '小明';
-- 如果 users 有 100 万行，就要比较 100 万次
```

**索引 ≈ 书的目录**：通过目录直接翻到指定页，不用从头翻到尾。

**前端类比**：

```javascript
// ❌ 没有索引：线性查找 O(n)
users.find(u => u.name === '小明');       // 100万条要查100万次

// ✅ 有索引：类似 Map 查找 O(1)
const userMap = new Map(users.map(u => [u.name, u]));
userMap.get('小明');                       // 直接命中
```

> 索引就是把数据库的列变成这种「快速查找结构」

---

### 2. 创建索引

```sql
-- 单列索引（最常用）
CREATE INDEX idx_name ON users(name);

-- 唯一索引（保证值唯一，类似 Set）
CREATE UNIQUE INDEX idx_email ON users(email);

-- 联合索引（多列组合，注意字段顺序！）
CREATE INDEX idx_city_age ON users(city, age);

-- 查看表的索引
SHOW INDEX FROM users;

-- 删除索引
DROP INDEX idx_name ON users;
```

### 3. 什么时候该建索引？

```sql
-- ✅ 经常出现在 WHERE 条件的列
SELECT * FROM users WHERE email = 'xxx@xxx.com';  -- email 要建索引

-- ✅ JOIN 的关联字段
SELECT * FROM orders o
JOIN users u ON o.user_id = u.id;   -- o.user_id 和 u.id 要建索引

-- ✅ 经常 GROUP BY / ORDER BY 的列
SELECT city, COUNT(*) FROM users GROUP BY city;

-- ❌ 不需要索引的情况：
-- 性别字段（只有男/女，区分度太低）
-- 频繁更新的大表（更新索引有开销）
-- 数据量小的表（< 100 行，全表扫描更快）
```

### 4. EXPLAIN — 检查查询性能

```sql
-- 在查询前加 EXPLAIN，查看是否用了索引
EXPLAIN SELECT * FROM users WHERE name = '小明';
```

```
结果关键列：
| type | possible_keys | key    | rows  |
|------|---------------|--------|-------|
| ref  | idx_name      | idx_name | 1     |

- type = ALL：全表扫描，没走索引 ⚠️
- type = ref：走了索引 ✅
- key：实际使用的索引名
- rows：扫描的行数（越小越好）
```

---

## 二、事务（Transaction）

### 1. 为什么需要事务？

```sql
-- 银行转账：小明给小红转 100 元
-- 需要两步操作：
UPDATE accounts SET balance = balance - 100 WHERE name = '小明';
UPDATE accounts SET balance = balance + 100 WHERE name = '小红';
```

```javascript
// 前端对比：批量保存
// 如果第一步成功、第二步失败 → 数据就不一致了！
// 需要「要么全做，要么全不做」
```

**事务保证**：两条 SQL 要么都成功，要么都回滚。

---

### 2. 事务的基本操作

```sql
-- 开启事务
START TRANSACTION;

-- 扣小明的钱
UPDATE accounts SET balance = balance - 100 WHERE name = '小明';

-- 加小红的钱（如果这步出错，上面扣的会回滚）
UPDATE accounts SET balance = balance + 100 WHERE name = '小红';

-- 都成功 → 提交
COMMIT;

-- 如果出错 → 回滚
ROLLBACK;
```

```javascript
// 前端类比：try-catch 批量操作
try {
    // 开始事务
    db.beginTransaction();

    await db.update('小明', { balance: balance - 100 });
    await db.update('小红', { balance: balance + 100 });

    // 全部成功 → 提交
    db.commit();
} catch (error) {
    // 有失败 → 回滚到之前的状态
    db.rollback();
}
```

---

### 3. ACID 四大特性

| 特性 | 含义 | 前端类比 |
|------|------|---------|
| **A**tomicity 原子性 | 事务不可分割，全做或全不做 | `try { A; B; } catch { rollback }` |
| **C**onsistency 一致性 | 事务前后数据状态一致 | 数据校验不通过就不提交 |
| **I**solation 隔离性 | 并发事务互不干扰 | 类似 `锁` 或 `Atomic` 操作 |
| **D**urability 持久性 | 提交后数据永久保存 | `localStorage.setItem` 写入磁盘 |

---

### 4. 事务隔离级别

多个事务并发时可能出现的问题：

| 问题 | 说明 | 前端类比 |
|------|------|---------|
| 脏读 | 读到另一个事务未提交的数据 | 读到还没保存的草稿 |
| 不可重复读 | 同一查询两次结果不同 | 先读 `a=1`，别人改了后读 `a=2` |
| 幻读 | 同一条件两次行数不同 | 先查出 5 条，别人插入后变成 6 条 |

```sql
-- MySQL 4 种隔离级别（从低到高）
-- 1. READ UNCOMMITTED（读未提交）—— 啥问题都可能
-- 2. READ COMMITTED（读已提交）  —— 避免脏读
-- 3. REPEATABLE READ（可重复读）—— 避免脏读+不可重复读（MySQL 默认）
-- 4. SERIALIZABLE（串行化）     —— 全避免但性能最差

-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 设置隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

> 日常开发用默认的 `REPEATABLE READ` 就够了。

---

### 5. 乐观锁 vs 悲观锁

```sql
-- 场景：商品秒杀，库存只剩 1 件，两个人同时下单

-- ❌ 不加锁的问题（并发覆盖）
UPDATE products SET stock = stock - 1 WHERE id = 1;
-- 两个请求同时执行，stock 可能变成 -1


-- ✅ 方案1：悲观锁（for update）
START TRANSACTION;
SELECT stock FROM products WHERE id = 1 FOR UPDATE;
-- 检查 stock > 0 ...
UPDATE products SET stock = stock - 1 WHERE id = 1;
COMMIT;
-- 其他事务必须等这个事务提交才能查


-- ✅ 方案2：乐观锁（version 字段）
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE id = 1 AND version = 5;
-- 检查受影响行数，如果为 0 说明 version 变了（被别人改了），重试
```

```javascript
// 前端类比：乐观锁 ≈ git 提交冲突
// 你改之前 version=5，提交时发现 version=6（别人先改了）
// 需要 pull 最新代码再改
```

---

## 三、锁（Lock）

### 表锁 vs 行锁

```sql
-- InnoDB 默认行锁（只锁涉及的行）
UPDATE users SET name = 'new' WHERE id = 1;  -- 只锁 id=1 的行

-- 如果没有走索引，行锁会升级为表锁 ⚠️
UPDATE users SET name = 'new' WHERE name = '小明';
-- 如果 name 没索引，会锁整张表！
```

> **回忆**：为什么 JOIN 的字段要建索引？一是有性能，二是避免表锁升级。

---

## 四、最佳实践

```sql
-- ✅ 1. 小事务原则：事务要短，不要在前端接口里开长事务
START TRANSACTION;
UPDATE ... WHERE ...;
COMMIT;  -- 尽快提交

-- ❌ 不要在一个事务里查一堆数据再做业务逻辑（会锁很久）

-- ✅ 2. 索引不是越多越好（影响写入性能）
-- 一般单表索引不超过 5 个

-- ✅ 3. 用 EXPLAIN 检查慢查询
EXPLAIN SELECT * FROM orders WHERE amount > 1000;
-- 看到 type=ALL 就要考虑建索引

-- ✅ 4. COUNT(*) 用 MyISAM 引擎更快
-- 但 InnoDB 支持事务，大部分场景用 InnoDB
```
