---
date: 2026-06-29
category:
  - mysql
tag:
  - SQL基础
  - CRUD
  - 前端转后端
---

# SQL 基础（对比前端思维）

## 1. 从 JSON 到数据表

```javascript
// 前端：JS 数组存数据
const users = [
    { id: 1, name: "小明", age: 25, city: "北京" },
    { id: 2, name: "小红", age: 23, city: "上海" },
    { id: 3, name: "小刚", age: 28, city: "北京" },
];
```

```sql
-- MySQL：数据表存数据
CREATE TABLE users (
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age  INT,
    city VARCHAR(20)
);

INSERT INTO users (name, age, city) VALUES
    ('小明', 25, '北京'),
    ('小红', 23, '上海'),
    ('小刚', 28, '北京');
```

> JS 的数组 → MySQL 的表，JS 的对象 → MySQL 的行

---

## 2. SELECT — 查询（≈ JS filter/map）

```sql
-- 查询所有列（≈ console.table(users)）
SELECT * FROM users;

-- 查询指定列（≈ users.map(u => ({name: u.name, age: u.age}))）
SELECT name, age FROM users;

-- 查询加别名（≈ 重命名字段）
SELECT name AS 姓名, age AS 年龄 FROM users;

-- 去重查询（≈ [...new Set(users.map(u => u.city))]）
SELECT DISTINCT city FROM users;

-- 限制条数（≈ users.slice(0, 5)）
SELECT * FROM users LIMIT 5;

-- 分页（第 2 页，每页 10 条）
SELECT * FROM users LIMIT 10 OFFSET 10;
-- 简写：LIMIT 10, 10  (先 offset, 再 limit)
```

---

## 3. WHERE — 条件过滤（≈ JS filter）

```sql
-- 等值查询（≈ users.filter(u => u.city === '北京')）
SELECT * FROM users WHERE city = '北京';

-- 数值比较（≈ users.filter(u => u.age >= 25)）
SELECT * FROM users WHERE age >= 25;

-- 多条件 AND（≈ users.filter(u => u.city === '北京' && u.age >= 25)）
SELECT * FROM users WHERE city = '北京' AND age >= 25;

-- 多条件 OR（≈ users.filter(u => u.city === '北京' || u.city === '上海')）
SELECT * FROM users WHERE city = '北京' OR city = '上海';

-- IN（≈ ['北京', '上海'].includes(u.city)）
SELECT * FROM users WHERE city IN ('北京', '上海');

-- BETWEEN（≈ 25 <= age <= 30）
SELECT * FROM users WHERE age BETWEEN 25 AND 30;

-- NOT（≈ !condition）
SELECT * FROM users WHERE city NOT IN ('北京');

-- NULL 判断（和 JS 的 null 判断不一样！）
SELECT * FROM users WHERE age IS NULL;      -- ✅ 正确
SELECT * FROM users WHERE age = NULL;       -- ❌ 永远查不到！
```

---

## 4. LIKE — 模糊查询（≈ includes/startsWith）

```sql
-- % 匹配任意字符（≈ users.filter(u => u.name.includes('小'))）
SELECT * FROM users WHERE name LIKE '%小%';

-- 以某字开头（≈ u.name.startsWith('小')）
SELECT * FROM users WHERE name LIKE '小%';

-- 以某字结尾（≈ u.name.endsWith('明')）
SELECT * FROM users WHERE name LIKE '%明';

-- _ 匹配单个字符
SELECT * FROM users WHERE name LIKE '小_';   -- '小明', '小红'
```

---

## 5. INSERT — 新增（≈ push）

```sql
-- 插入一条（≈ users.push({name: '小芳', age: 22, city: '广州'})）
INSERT INTO users (name, age, city) VALUES ('小芳', 22, '广州');

-- 插入批量（≈ users.push(...newUsers)）
INSERT INTO users (name, age, city) VALUES
    ('小强', 26, '深圳'),
    ('小丽', 24, '杭州');

-- 插入后返回自增 ID（类似 auto_increment）
INSERT INTO users (name, age) VALUES ('小芳', 22);
SELECT LAST_INSERT_ID();  -- 获取刚插入的 ID
```

---

## 6. UPDATE — 修改（≈ 对象属性赋值）

```sql
-- ⚠️ 必须带 WHERE！否则全表更新！
UPDATE users SET age = 26 WHERE name = '小明';

-- 更新多个字段
UPDATE users SET age = 26, city = '深圳' WHERE id = 1;

-- 数值运算
UPDATE products SET price = price * 0.9 WHERE category = '电子';  -- 打9折
```

```javascript
// 前端对比
const user = users.find(u => u.id === 1);
if (user) {
    user.age = 26;
    user.city = '深圳';
}
```

> **致命陷阱**：忘记写 `WHERE` = 全表数据被覆盖！开发时建议先 `SELECT` 确认再 `UPDATE`。

---

## 7. DELETE — 删除

```sql
-- ⚠️ 必须带 WHERE！否则清空全表！
DELETE FROM users WHERE id = 1;

-- 删除全部（保留表结构，类似清空数组）
DELETE FROM users;

-- 快速清空（重置自增 ID）
TRUNCATE TABLE users;
```

```javascript
// 前端对比
const idx = users.findIndex(u => u.id === 1);
users.splice(idx, 1);
```

---

## 8. ORDER BY — 排序（≈ sort）

```sql
-- 升序（≈ users.toSorted((a,b) => a.age - b.age)）
SELECT * FROM users ORDER BY age ASC;  -- ASC 可省略

-- 降序（≈ users.toSorted((a,b) => b.age - a.age)）
SELECT * FROM users ORDER BY age DESC;

-- 多字段排序（先按城市，再按年龄降序）
SELECT * FROM users ORDER BY city ASC, age DESC;
```

---

## 9. 完整 CRUD 对照表

| 操作 | JavaScript | MySQL |
|------|-----------|-------|
| 查询全部 | `users` | `SELECT * FROM users` |
| 条件过滤 | `users.filter(u => u.age > 25)` | `SELECT * FROM users WHERE age > 25` |
| 取特定字段 | `users.map(u => u.name)` | `SELECT name FROM users` |
| 排序 | `users.toSorted(...)` | `ORDER BY age DESC` |
| 分页 | `users.slice(0, 10)` | `LIMIT 10 OFFSET 0` |
| 新增 | `users.push(newUser)` | `INSERT INTO users VALUES(...)` |
| 更新 | `user.age = 26` | `UPDATE users SET age=26 WHERE id=1` |
| 删除 | `arr.splice(idx, 1)` | `DELETE FROM users WHERE id=1` |
| 去重 | `[...new Set(arr)]` | `SELECT DISTINCT city` |
| 包含 | `arr.includes('北京')` | `WHERE city IN ('北京','上海')` |
| 模糊匹配 | `str.includes('小')` | `WHERE name LIKE '%小%'` |
