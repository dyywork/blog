---
date: 2026-06-29
category:
  - mysql
tag:
  - 查询
  - 聚合
  - GROUP BY
  - 前端转后端
---

# 查询进阶（对比 JS reduce/groupBy）

## 1. 聚合函数（≈ JS reduce）

```javascript
// 前端：统计订单数据
const orders = [
    { id: 1, customer: '小明', amount: 100, status: 'completed' },
    { id: 2, customer: '小红', amount: 200, status: 'completed' },
    { id: 3, customer: '小刚', amount: 150, status: 'pending' },
];

const total = orders.reduce((s, o) => s + o.amount, 0);           // 总金额
const count = orders.length;                                        // 订单数
const avg = total / count;                                          // 平均金额
const max = Math.max(...orders.map(o => o.amount));                 // 最大金额
const min = Math.min(...orders.map(o => o.amount));                 // 最小金额
```

```sql
-- MySQL：内置聚合函数
SELECT
    COUNT(*)          AS 订单数,    -- 行数
    SUM(amount)       AS 总金额,    -- 求和
    AVG(amount)       AS 平均金额,  -- 平均值
    MAX(amount)       AS 最大金额,  -- 最大值
    MIN(amount)       AS 最小金额   -- 最小值
FROM orders;
```

### 常用聚合函数

| 函数 | 作用 | JS 对应 |
|------|------|---------|
| `COUNT(*)` | 计数行数 | `arr.length` |
| `COUNT(column)` | 统计非 NULL 值数量 | `arr.filter(x => x != null).length` |
| `SUM(col)` | 求和 | `arr.reduce((s,x)=> s + x, 0)` |
| `AVG(col)` | 平均值 | `arr.reduce((s,x)=> s + x, 0) / arr.length` |
| `MAX(col)` | 最大值 | `Math.max(...arr)` |
| `MIN(col)` | 最小值 | `Math.min(...arr)` |

---

## 2. GROUP BY — 分组（≈ JS groupBy / reduce 分组）

```javascript
// 前端：按状态分组统计
const byStatus = Object.groupBy(orders, o => o.status);
// {
//     completed: [订单1, 订单2],
//     pending: [订单3]
// }

// 统计每种状态的订单数
const stats = Object.entries(byStatus).map(([status, list]) => ({
    status,
    count: list.length,
    total: list.reduce((s, o) => s + o.amount, 0),
}));
// [{status:'completed', count:2, total:300}, {status:'pending', count:1, total:150}]
```

```sql
-- MySQL：GROUP BY 一步到位
SELECT
    status,
    COUNT(*)       AS 订单数,
    SUM(amount)    AS 总金额,
    AVG(amount)    AS 平均金额
FROM orders
GROUP BY status;

-- 结果：
-- | status    | 订单数 | 总金额 | 平均金额 |
-- |-----------|--------|--------|----------|
-- | completed | 2      | 300    | 150      |
-- | pending   | 1      | 150    | 150      |
```

### 实用分组例子

```sql
-- 按城市统计用户数
SELECT city, COUNT(*) AS user_count
FROM users
GROUP BY city
ORDER BY user_count DESC;

-- 按年份统计订单总额
SELECT YEAR(created_at) AS year, SUM(amount) AS total
FROM orders
GROUP BY YEAR(created_at)
ORDER BY year;

-- 多字段分组：按城市和状态统计
SELECT city, status, COUNT(*) AS cnt
FROM orders
GROUP BY city, status;
```

---

## 3. HAVING — 分组后过滤（≈ 分组后再 filter）

```sql
-- WHERE：分组前过滤（≈ 先 filter）
-- HAVING：分组后过滤（≈ 分组后再 filter）

-- ✅ WHERE：只统计已完成的订单
SELECT customer, SUM(amount) AS total
FROM orders
WHERE status = 'completed'       -- 先过滤行
GROUP BY customer;

-- ✅ HAVING：只显示总消费 > 200 的客户
SELECT customer, SUM(amount) AS total
FROM orders
GROUP BY customer
HAVING total > 200;              -- 分组后再过滤

-- 组合使用
SELECT customer, SUM(amount) AS total
FROM orders
WHERE status = 'completed'       -- ① 先过滤已完成的
GROUP BY customer                -- ② 按客户分组
HAVING total > 300               -- ③ 只保留总消费 > 300 的
ORDER BY total DESC              -- ④ 降序排列
LIMIT 5;                         -- ⑤ 取前 5 名
```

```javascript
// JS 完整对比
orders
    .filter(o => o.status === 'completed')          // WHERE
    .reduce((acc, o) => {                           // GROUP BY
        acc[o.customer] = (acc[o.customer] || 0) + o.amount;
        return acc;
    }, {})
    .filter(([customer, total]) => total > 300)      // HAVING
    .sort((a, b) => b[1] - a[1])                     // ORDER BY
    .slice(0, 5);                                    // LIMIT
```

> **WHERE vs HAVING 记忆**：WHERE 写在 GROUP BY 前面，HAVING 写在后面。WHERE 过滤原始行，HAVING 过滤分组结果。

---

## 4. 子查询（≈ 嵌套调用）

```sql
-- 查询高于平均价格的商品
-- ≈ products.filter(p => p.price > avgPrice)
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- 查询有过订单的客户（IN 子查询）
-- ≈ users.filter(u => orderUserIds.includes(u.id))
SELECT * FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- EXISTS 子查询（性能更好）
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id
);
```

---

## 5. UNION — 合并查询结果

```sql
-- 合并两个查询的结果（类似 JS 数组拼接）
-- 注意：列数必须一致！

-- 查询所有联系人（从用户表和供应商表合并）
SELECT name, phone, 'user' AS type FROM users
UNION
SELECT name, phone, 'supplier' AS type FROM suppliers;

-- UNION 自动去重，UNION ALL 保留重复
```

---

## 6. CASE WHEN — 条件分支（≈ 三元/if-else）

```sql
-- 类似前端：status === 'completed' ? '已完成' : '待处理'
SELECT
    name,
    CASE
        WHEN score >= 90 THEN '优秀'
        WHEN score >= 60 THEN '及格'
        ELSE '不及格'
    END AS level
FROM students;

-- 统计各分数段人数
SELECT
    CASE
        WHEN score >= 90 THEN '优秀'
        WHEN score >= 60 THEN '及格'
        ELSE '不及格'
    END AS level,
    COUNT(*) AS count
FROM students
GROUP BY level;
```

---

## 执行顺序记忆

SQL 查询的逻辑执行顺序（不是书写顺序）：

```
书写顺序：SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
执行顺序：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

```
① FROM       → 从哪张表
② WHERE      → 过滤行
③ GROUP BY   → 分组
④ HAVING     → 过滤分组
⑤ SELECT     → 选出列
⑥ ORDER BY   → 排序
⑦ LIMIT      → 取前 N 条
```
