---
date: 2026-06-29
category:
  - mysql
tag:
  - 函数
  - 字符串
  - 日期
  - 前端转后端
---

# MySQL 常用函数（对比 JavaScript）

## 1. 字符串函数

```sql
-- CONCAT：拼接（≈ + 或模板字符串）
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;
```

```javascript
`${firstName} ${lastName}`
```

```sql
-- LENGTH：字节长度（注意：中文占3个字节！）
SELECT LENGTH('Hello');     -- 5
SELECT LENGTH('你好');      -- 6（UTF-8 下每个中文 3 字节）

-- CHAR_LENGTH：字符长度
SELECT CHAR_LENGTH('你好');  -- 2（字符数）
```

```javascript
'你好'.length  // 2
```

```sql
-- SUBSTRING：截取（≈ slice）
SELECT SUBSTRING('Hello World', 1, 5);   -- 'Hello'（SQL 索引从 1 开始！）
SELECT SUBSTRING('Hello', -3);           -- 'llo'（MySQL 支持负索引）
```

```javascript
'Hello World'.slice(0, 5)  // 'Hello'
```

```sql
-- REPLACE：替换（≈ replaceAll）
SELECT REPLACE('hello world', 'world', 'mysql');  -- 'hello mysql'
```

```javascript
'hello world'.replaceAll('world', 'mysql')
```

```sql
-- UPPER / LOWER：大小写转换
SELECT UPPER('hello');  -- 'HELLO'
SELECT LOWER('HELLO');  -- 'hello'
```

```javascript
'hello'.toUpperCase()
'HELLO'.toLowerCase()
```

```sql
-- TRIM：去空格（≈ trim）
SELECT TRIM('  hello  ');   -- 'hello'
SELECT LTRIM('  hello');    -- 'hello'（去左空格）
SELECT RTRIM('hello  ');    -- 'hello'（去右空格）
```

```javascript
'  hello  '.trim()
```

### 字符串函数对照表

| MySQL | JavaScript | 说明 |
|-------|-----------|------|
| `CONCAT(a, b)` | `a + b` | 拼接 |
| `LENGTH(str)` | `new Blob([str]).size` | 字节长度 |
| `CHAR_LENGTH(str)` | `str.length` | 字符长度 |
| `SUBSTRING(str, 1, 5)` | `str.slice(0, 5)` | 截取（SQL 从1开始！） |
| `REPLACE(str, a, b)` | `str.replaceAll(a, b)` | 替换 |
| `UPPER(str)` | `str.toUpperCase()` | 转大写 |
| `LOWER(str)` | `str.toLowerCase()` | 转小写 |
| `TRIM(str)` | `str.trim()` | 去空格 |
| `LOCATE('a', str)` | `str.indexOf('a')` | 查找位置 |
| `LEFT(str, 3)` | `str.slice(0, 3)` | 取左边 N 个 |
| `RIGHT(str, 3)` | `str.slice(-3)` | 取右边 N 个 |

> ⚠️ **SQL 索引从 1 开始**，不是从 0！这是新手最容易犯错的地方

---

## 2. 日期时间函数

```sql
-- 获取当前时间
SELECT NOW();        -- 2026-06-29 14:30:00
SELECT CURDATE();    -- 2026-06-29
SELECT CURTIME();    -- 14:30:00
```

```javascript
new Date()           // 当前时间
new Date().toISOString().split('T')[0]  // 当前日期
```

```sql
-- 提取日期部分
SELECT YEAR('2026-06-29');    -- 2026
SELECT MONTH('2026-06-29');   -- 6
SELECT DAY('2026-06-29');     -- 29
SELECT HOUR('14:30:00');      -- 14
SELECT MINUTE('14:30:00');    -- 30
SELECT WEEKDAY('2026-06-29'); -- 0=周一, 1=周二...
```

```javascript
const d = new Date('2026-06-29');
d.getFullYear();   // 2026
d.getMonth() + 1;  // 6（JS 从 0 开始！）
d.getDate();       // 29
```

> ⚠️ JS 的 `getMonth()` 从 0 开始，SQL 的 `MONTH()` 从 1 开始

```sql
-- 日期计算
SELECT DATE_ADD('2026-06-29', INTERVAL 7 DAY);    -- 2026-07-06（加7天）
SELECT DATE_SUB('2026-06-29', INTERVAL 1 MONTH);  -- 2026-05-29（减1月）
SELECT DATEDIFF('2026-07-01', '2026-06-29');      -- 2（相差天数）
SELECT TIMESTAMPDIFF(YEAR, '2000-01-01', NOW());  -- 26（年龄）
```

```javascript
const d = new Date('2026-06-29');
d.setDate(d.getDate() + 7);       // 加7天
d.setMonth(d.getMonth() - 1);     // 减1月
const diff = (d2 - d1) / 86400000; // 相差天数
```

```sql
-- 日期格式化
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d');         -- 2026-06-29
SELECT DATE_FORMAT(NOW(), '%Y年%m月%d日');      -- 2026年06月29日
SELECT DATE_FORMAT(NOW(), '%H:%i:%s');         -- 14:30:00
```

```javascript
// JS 需要自己格式化或用 day.js
dayjs().format('YYYY-MM-DD');
```

### 日期函数对照表

| MySQL | JavaScript | 说明 |
|-------|-----------|------|
| `NOW()` | `new Date()` | 当前时间 |
| `CURDATE()` | `dayjs().format('YYYY-MM-DD')` | 当前日期 |
| `YEAR(date)` | `d.getFullYear()` | 取年 |
| `MONTH(date)` | `d.getMonth() + 1` | 取月（SQL从1，JS从0） |
| `DAY(date)` | `d.getDate()` | 取日 |
| `DATE_ADD(d, INTERVAL n DAY)` | `d.setDate(d.getDate() + n)` | 加天数 |
| `DATEDIFF(a, b)` | `(a - b) / 86400000` | 日期差 |
| `DATE_FORMAT(d, '%Y-%m-%d')` | `dayjs().format('YYYY-MM-DD')` | 格式化 |

---

## 3. 数值函数

```sql
SELECT ROUND(3.14159, 2);    -- 3.14（四舍五入）
SELECT CEILING(3.14);        -- 4（向上取整 ≈ Math.ceil）
SELECT FLOOR(3.14);          -- 3（向下取整 ≈ Math.floor）
SELECT ABS(-10);             -- 10（绝对值）
SELECT MOD(10, 3);           -- 1（取模 ≈ %）
SELECT RAND();               -- 0~1 随机数 ≈ Math.random()
```

---

## 4. 条件函数

```sql
-- IF：简单条件（≈ 三元运算符）
SELECT name, IF(score >= 60, '及格', '不及格') AS result FROM students;
```

```javascript
score >= 60 ? '及格' : '不及格'
```

```sql
-- IFNULL：处理 NULL（≈ ??）
SELECT name, IFNULL(phone, '未填写') AS phone FROM users;
```

```javascript
user.phone ?? '未填写'
```

```sql
-- COALESCE：返回第一个非 NULL 值（≈ a ?? b ?? c）
SELECT COALESCE(phone, email, '无联系方式') FROM users;
```

```javascript
user.phone ?? user.email ?? '无联系方式'
```

```sql
-- NULLIF：如果相等则返回 NULL
SELECT NULLIF(a, b);
-- 如果 a = b 就返回 NULL，否则返回 a
-- 常用于避免除零错误：
SELECT 100 / NULLIF(quantity, 0) FROM products;
```

---

## 5. 类型转换

```sql
-- CAST（≈ Number() / String()）
SELECT CAST('123' AS SIGNED);        -- 123（字符串转数字）
SELECT CAST(123 AS CHAR);            -- '123'（数字转字符串）
SELECT CAST('2026-06-29' AS DATE);  -- 2026-06-29（字符串转日期）
```

```javascript
Number('123')
String(123)
new Date('2026-06-29')
```

---

## 实践：常用查询模式

```sql
-- 最近7天注册的用户
SELECT * FROM users
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);

-- 本月订单统计
SELECT
    DATE_FORMAT(created_at, '%Y-%m-%d') AS day,
    COUNT(*) AS orders,
    SUM(amount) AS total
FROM orders
WHERE MONTH(created_at) = MONTH(NOW())
  AND YEAR(created_at) = YEAR(NOW())
GROUP BY day
ORDER BY day;

-- 手机号脱敏（138****1234）
SELECT CONCAT(
    LEFT(phone, 3),
    '****',
    RIGHT(phone, 4)
) AS masked_phone FROM users;

-- 计算年龄
SELECT
    name,
    TIMESTAMPDIFF(YEAR, birthday, NOW()) AS age
FROM users;
```
