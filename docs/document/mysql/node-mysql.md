---
date: 2026-06-29
category:
  - mysql
tag:
  - Node.js
  - mysql2
  - 全栈
  - 前端转后端
---

# Node.js 操作 MySQL（mysql2 实战）

## 1. 安装与连接

```bash
npm install mysql2
```

```javascript
const mysql = require('mysql2/promise');  // 使用 Promise 版本（推荐）

// 连接配置（类似前端请求的 baseURL + 鉴权）
const pool = mysql.createPool({
    host: 'localhost',      // 数据库主机
    port: 3306,             // MySQL 默认端口
    user: 'root',           // 用户名
    password: '123456',     // 密码
    database: 'my_app',     // 数据库名
    waitForConnections: true,
    connectionLimit: 10,    // 连接池大小
    queueLimit: 0,
});

// 测试连接
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('数据库连接成功 ✅');
        connection.release();
    } catch (err) {
        console.error('数据库连接失败 ❌', err);
    }
}
```

> **为什么用连接池？** 每次请求都创建新连接太慢，连接池维护一批连接复用（类似 HTTP 连接池）。

---

## 2. 基础 CRUD

```javascript
// 查询（SELECT）
async function getUsers() {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;  // rows 是数组
}

// 条件查询（参数化查询！防 SQL 注入）
async function getUserById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE id = ?',  // ? 是占位符
        [id]
    );
    return rows[0];  // 单条记录
}

// 新增（INSERT）
async function createUser(name, age, city) {
    const [result] = await pool.execute(
        'INSERT INTO users (name, age, city) VALUES (?, ?, ?)',
        [name, age, city]
    );
    return result.insertId;  // 返回自增 ID
}

// 更新（UPDATE）
async function updateUser(id, updates) {
    const [result] = await pool.execute(
        'UPDATE users SET name = ?, age = ? WHERE id = ?',
        [updates.name, updates.age, id]
    );
    return result.affectedRows;  // 受影响的条数
}

// 删除（DELETE）
async function deleteUser(id) {
    const [result] = await pool.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
    );
    return result.affectedRows;
}
```

---

## 3. 参数化查询（防 SQL 注入）

```javascript
// ❌ 错误：字符串拼接 — SQL 注入风险！
const sql = `SELECT * FROM users WHERE name = '${name}'`;
// 如果 name 是 "小明' OR '1'='1"，全表数据泄露！

// ✅ 正确：参数化查询
const [rows] = await pool.execute(
    'SELECT * FROM users WHERE name = ?',
    [name]  // 自动转义，安全！
);

// 多个参数
const [rows] = await pool.execute(
    'SELECT * FROM users WHERE age > ? AND city = ?',
    [18, '北京']
);
```

> **黄金法则**：永远不要拼接 SQL 字符串！永远用 `?` 占位符！

---

## 4. 事务处理

```javascript
// 银行转账事务（对应前面学的 MySQL 事务）
async function transfer(fromId, toId, amount) {
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        // 扣钱
        const [deduct] = await conn.execute(
            'UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?',
            [amount, fromId, amount]
        );

        if (deduct.affectedRows === 0) {
            throw new Error('余额不足');
        }

        // 加钱
        await conn.execute(
            'UPDATE accounts SET balance = balance + ? WHERE id = ?',
            [amount, toId]
        );

        await conn.commit();
        console.log('转账成功 ✅');
    } catch (err) {
        await conn.rollback();
        console.error('转账失败，已回滚 ❌', err.message);
        throw err;
    } finally {
        conn.release();  // 释放连接回连接池
    }
}
```

---

## 5. Express + MySQL 完整示例

```javascript
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// 连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_app',
    connectionLimit: 10,
});

// 列表查询
app.get('/api/users', async (req, res) => {
    try {
        const { city, page = 1, pageSize = 10 } = req.query;
        let sql = 'SELECT * FROM users WHERE 1=1';
        const params = [];

        if (city) {
            sql += ' AND city = ?';
            params.push(city);
        }

        sql += ' LIMIT ? OFFSET ?';
        params.push(Number(pageSize), (page - 1) * Number(pageSize));

        const [rows] = await pool.execute(sql, params);
        res.json({ data: rows, page, pageSize });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 单条查询
app.get('/api/users/:id', async (req, res) => {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE id = ?',
        [req.params.id]
    );
    if (rows.length === 0) {
        return res.status(404).json({ error: '用户不存在' });
    }
    res.json(rows[0]);
});

// 新增
app.post('/api/users', async (req, res) => {
    const { name, age, city } = req.body;

    if (!name) {
        return res.status(400).json({ error: '名称必填' });
    }

    const [result] = await pool.execute(
        'INSERT INTO users (name, age, city) VALUES (?, ?, ?)',
        [name, age, city]
    );

    res.status(201).json({
        id: result.insertId,
        name,
        age,
        city,
    });
});

// 更新
app.put('/api/users/:id', async (req, res) => {
    const { name, age, city } = req.body;
    const [result] = await pool.execute(
        'UPDATE users SET name = ?, age = ?, city = ? WHERE id = ?',
        [name, age, city, req.params.id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ error: '用户不存在' });
    }
    res.json({ message: '更新成功' });
});

// 删除
app.delete('/api/users/:id', async (req, res) => {
    const [result] = await pool.execute(
        'DELETE FROM users WHERE id = ?',
        [req.params.id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ error: '用户不存在' });
    }
    res.json({ message: '删除成功' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 6. ORM 简介（更前端的操作方式）

除了直接写 SQL，也可以用 ORM（对象关系映射），操作方式更接近 JavaScript。

```javascript
// Prisma（推荐，TS 友好）
const user = await prisma.user.create({
    data: { name: '小明', age: 25 },
});

const users = await prisma.user.findMany({
    where: { city: '北京' },
    orderBy: { age: 'desc' },
});

// Sequelize（老牌 ORM）
const User = sequelize.define('User', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
});
const user = await User.create({ name: '小明', age: 25 });
```

| ORM | 特点 | 类似前端 |
|-----|------|---------|
| **Prisma** | TS 优先，类型安全，自动迁移 | TypeScript |
| **TypeORM** | 装饰器语法，类似 Java JPA | Angular / NestJS |
| **Sequelize** | 老牌，文档多 | Express |
| **Knex** | SQL 构建器，不是完整 ORM | 轻量级 |

> **学习建议**：先用 `mysql2` 手写 SQL 理解数据库操作，再学 ORM 提升效率。
