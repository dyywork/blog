---
date: 2026-06-29
category:
  - mysql
tag:
  - JOIN
  - 多表查询
  - 前端转后端
---

# 多表 JOIN（对比前端数据关联）

## 1. 为什么需要 JOIN？

```javascript
// 前端：分开存储关联数据
const users = [
    { id: 1, name: '小明' },
    { id: 2, name: '小红' },
];

const orders = [
    { id: 101, user_id: 1, amount: 100, product: '键盘' },
    { id: 102, user_id: 2, amount: 200, product: '鼠标' },
    { id: 103, user_id: 1, amount: 150, product: '显示器' },
];

// 前端关联方式：find 串联
function getUserOrders(userId) {
    return orders.filter(o => o.user_id === userId);
}

// 要显示"用户名 + 订单信息"：
const result = orders.map(order => {
    const user = users.find(u => u.id === order.user_id);
    return {
        用户名: user?.name,
        商品: order.product,
        金额: order.amount,
    };
});
```

```sql
-- MySQL：JOIN 一步完成
SELECT u.name AS 用户名, o.product AS 商品, o.amount AS 金额
FROM orders o
JOIN users u ON o.user_id = u.id;
```

> **核心思想**：JOIN ≈ 前端的 `find`/`filter` 跨数组关联数据

---

## 2. JOIN 类型总览

```
                    INNER JOIN
                    ┌─────────┐
                    │  交集   │
                    └─────────┘

      LEFT JOIN                 RIGHT JOIN
    ┌────────────┐           ┌────────────┐
    │  左表全部   │           │  右表全部   │
    │ + 右表匹配  │           │ + 左表匹配  │
    └────────────┘           └────────────┘
```

| JOIN 类型 | 结果 | 前端类比 |
|-----------|------|---------|
| `INNER JOIN` | 只返回匹配到的行 | `arr1.filter(a => arr2.some(b => a.id === b.user_id))` |
| `LEFT JOIN` | 左表全部 + 右表匹配（无匹配则 NULL） | `arr1.map(a => ({...a, ...arr2.find(b => a.id === b.user_id)}))` |
| `RIGHT JOIN` | 右表全部 + 左表匹配 | 和 LEFT 反过来，**不常用** |
| `FULL OUTER JOIN` | 全部行，没匹配的填 NULL | MySQL 不支持，用 `LEFT + RIGHT + UNION` 模拟 |

---

## 3. INNER JOIN — 内连接（交集）

```sql
-- 查询所有有订单的用户（只显示有订单的用户）
-- ≈ users.filter(u => orders.some(o => o.user_id === u.id))
SELECT DISTINCT u.*
FROM users u
JOIN orders o ON u.id = o.user_id;
```

```
表 users                 表 orders
┌────┬──────┐          ┌─────┬─────────┐
│ id │ name │          │ id  │ user_id │
├────┼──────┤          ├─────┼─────────┤
│ 1  │ 小明 │←────────→│ 101 │   1     │
│ 2  │ 小红 │←────────→│ 102 │   2     │
│ 3  │ 小刚 │          │ 103 │   1     │
└────┴──────┘          └─────┴─────────┘

结果（INNER JOIN）：
┌──────┬──────┬──────┐
│ name │ id   │amount│
├──────┼──────┼──────┤
│ 小明 │ 101  │ 100  │
│ 小明 │ 103  │ 150  │
│ 小红 │ 102  │ 200  │
└──────┴──────┴──────┘
（小刚没有订单，不显示）
```

---

## 4. LEFT JOIN — 左连接（保留左表全部）

```sql
-- 查询所有用户及其订单（没有订单的用户也显示）
-- ≈ users.map(u => ({
--     ...u,
--     orders: orders.filter(o => o.user_id === u.id)
-- }))
SELECT u.*, o.id AS order_id, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

```
结果（LEFT JOIN）：
┌──────┬──────────┬────────┐
│ name │ order_id │ amount │
├──────┼──────────┼────────┤
│ 小明 │ 101      │ 100    │
│ 小明 │ 103      │ 150    │
│ 小红 │ 102      │ 200    │
│ 小刚 │ NULL     │ NULL   │  ← 没有订单，但用户还在
└──────┴──────────┴────────┘
```

### 实用场景：找出「没有订单的用户」

```sql
-- 没买过东西的用户
SELECT u.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- 等于前端：users.filter(u =>
--     !orders.some(o => o.user_id === u.id)
-- )
```

---

## 5. 多表 JOIN

```sql
-- 三表关联：用户 → 订单 → 商品分类
SELECT
    u.name           AS 用户名,
    o.id             AS 订单号,
    p.name           AS 商品名,
    c.name           AS 分类名
FROM users u
JOIN orders o      ON u.id  = o.user_id
JOIN products p    ON o.product_id = p.id
JOIN categories c  ON p.category_id = c.id
WHERE u.city = '北京';
```

```javascript
// 前端需要多层 find
users
    .filter(u => u.city === '北京')
    .flatMap(u => orders
        .filter(o => o.user_id === u.id)
        .map(o => ({
            用户名: u.name,
            订单号: o.id,
            商品名: products.find(p => p.id === o.product_id)?.name,
            分类名: categories.find(c => c.id === products.find(p => p.id === o.product_id)?.category_id)?.name,
        }))
    );
```

> 看到差距了吧？SQL JOIN 写起来比前端链式找简单得多！

---

## 6. SELF JOIN — 自连接

```sql
-- 同一张表自己关联自己
-- 场景：员工表，每个员工有上级领导
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    manager_id INT   -- 上级的 id
);

INSERT INTO employees VALUES
    (1, '老板', NULL),
    (2, '经理', 1),
    (3, '前端组长', 2),
    (4, '小王', 3);

-- 查询每个员工及其上级
SELECT
    e.name AS 员工,
    m.name AS 上级
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- 结果：
-- | 员工   | 上级   |
-- |--------|--------|
-- | 老板   | NULL   |
-- | 经理   | 老板   |
-- | 前端组长 | 经理 |
-- | 小王   | 前端组长 |
```

---

## 7. JOIN 性能小贴士

```sql
-- ✅ 1. JOIN 的字段要有索引
-- 如果 o.user_id 没有索引，JOIN 会很慢
CREATE INDEX idx_user_id ON orders(user_id);

-- ✅ 2. 用小表驱动大表
-- MySQL 会自动优化，但原理上：
-- 先遍历小表，再到索引找大表

-- ✅ 3. 只 SELECT 需要的列，不用 SELECT *
-- ❌ SELECT * FROM users JOIN orders ...
-- ✅ SELECT u.name, o.amount FROM ...
```

---

## 速查表

| 场景 | SQL | JS 对应 |
|------|-----|---------|
| 关联两表 | `A JOIN B ON A.id = B.a_id` | `A.map(a => ({...a, ...B.find(b => b.a_id === a.id)}))` |
| 取交集 | `INNER JOIN` | `A.filter(a => B.some(b => ... ))` |
| 保留左表 | `LEFT JOIN` | `A.map(a => ({...a, ...B.find(...)}))` |
| 找没匹配的 | `LEFT JOIN + WHERE B.id IS NULL` | `A.filter(a => !B.some(...))` |
| 多表关联 | `A JOIN B JOIN C` | 嵌套 find |
| 表关联自身 | `SELF JOIN` | 递归/树形数据 |
