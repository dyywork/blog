---
date: 2026-06-29
category:
  - mysql
tag:
  - 表设计
  - 数据类型
  - 范式
  - 前端转后端
---

# 表设计与数据类型（对比 TypeScript/JSON）

## 1. 数据类型对照

### 数值类型

```sql
INT            -- 整数（-21亿~21亿）≈ JS Number 整数部分
BIGINT         -- 大整数 ≈ BigInt
DECIMAL(10,2)  -- 精确小数（金额用！）≈ toFixed(2) 但更精确
FLOAT / DOUBLE -- 浮点数（精度有损失）
TINYINT        -- 小整数（0~255），常用作布尔值
```

```typescript
// TypeScript 对比
type User = {
    id: number;        // INT
    age: number;       // TINYINT
    salary: number;    // DECIMAL(10,2)
    score: number;     // FLOAT
};
```

**选择建议**：
| 场景 | 类型 | 原因 |
|------|------|------|
| 用户 ID | `INT` / `BIGINT` | 够用且有自增 |
| 年龄 | `TINYINT` | 0~255，1字节 |
| 金额 | `DECIMAL(10,2)` | 精确小数，不会出现 0.1+0.2≠0.3 |
| 数量 | `INT` | 一般够用 |
| 布尔值 | `TINYINT(1)` | MySQL 没有真正的 BOOLEAN |

### 字符串类型

```sql
CHAR(n)          -- 定长字符串（性能好），如：手机号、身份证
VARCHAR(n)       -- 变长字符串（最常用），如：名字、地址
TEXT             -- 长文本（最大 65KB），如：文章内容
LONGTEXT         -- 超长文本（最大 4GB），如：博客正文
```

```typescript
type User = {
    phone: string;       // CHAR(11) — 手机号长度固定
    name: string;        // VARCHAR(50)
    bio: string;         // TEXT
    article: string;     // LONGTEXT
};
```

**选择建议**：
| 场景 | 类型 | 原因 |
|------|------|------|
| 手机号/身份证 | `CHAR(11)` / `CHAR(18)` | 长度固定，CHAR 更快 |
| 用户名/邮箱 | `VARCHAR(50)` / `VARCHAR(100)` | 长度可变 |
| 文章/评论 | `TEXT` | 超长文本 |
| 大文本 | `LONGTEXT` | 最大 4GB |

### 日期时间类型

```sql
DATE       -- 日期 '2026-06-29'
TIME       -- 时间 '14:30:00'
DATETIME   -- 日期+时间 '2026-06-29 14:30:00'
TIMESTAMP  -- 时间戳（1970-2038 年）
YEAR       -- 年份
```

```typescript
type User = {
    birthday: string;           // DATE
    created_at: string;         // DATETIME（建议用 DATETIME）
    updated_at: string;         // DATETIME
};
```

**选择建议**：
| 场景 | 类型 | 原因 |
|------|------|------|
| 生日 | `DATE` | 只需要日期 |
| 创建时间 | `DATETIME` | 范围大，不受 2038 限制 |
| 最后登录 | `TIMESTAMP` | 自动更新，带时区 |
| 年份 | `YEAR` | 只要年份 |

---

## 2. 表设计原则（范式化）

### 第一范式：字段不可再分

```sql
-- ❌ 错误：一个字段存多个值
CREATE TABLE users (
    id INT PRIMARY KEY,
    phones VARCHAR(100)  -- "13800138000,13900139000" 不可再分
);

-- ✅ 正确：拆成多行或多表
CREATE TABLE user_phones (
    id INT PRIMARY KEY,
    user_id INT,
    phone VARCHAR(11)
);
```

### 第二范式：消除部分依赖

```sql
-- ❌ 错误：订单表里有商品分类（和订单无关）
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    product_id INT,
    category_name VARCHAR(50)  -- 这个只依赖 product_id，不是订单
);

-- ✅ 正确：拆成商品表
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    category_id INT
);
```

### 第三范式：不依赖非主键列

```sql
-- ❌ 错误：用户表包含城市人口（不依赖用户）
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(20),
    city_population INT  -- 这个和用户无关
);

-- ✅ 正确：城市单独一张表
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    city_id INT
);
CREATE TABLE cities (
    id INT PRIMARY KEY,
    name VARCHAR(20),
    population INT
);
```

> **前端理解**：范式化 ≈ 前端不要重复存冗余数据，一个数据只在一个地方维护。类似「单一数据源」原则。

---

## 3. 常用字段设计模板

```sql
-- 通用用户表
CREATE TABLE users (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(50) NOT NULL UNIQUE,      -- 用户名
    email      VARCHAR(100) NOT NULL UNIQUE,      -- 邮箱（唯一）
    phone      CHAR(11),                          -- 手机号
    password   VARCHAR(255) NOT NULL,             -- 加密后的密码
    avatar     VARCHAR(500),                      -- 头像 URL
    status     TINYINT DEFAULT 1,                 -- 状态：1=启用 0=禁用
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 创建时间
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- 更新时间
      ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),                      -- 常用查询建索引
    INDEX idx_created_at (created_at)
);

-- 通用文章/内容表
CREATE TABLE articles (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT NOT NULL,                     -- 作者
    title       VARCHAR(200) NOT NULL,
    content     LONGTEXT,
    summary     VARCHAR(500),                     -- 摘要
    cover_image VARCHAR(500),                     -- 封面图
    category_id INT,
    view_count  INT DEFAULT 0,
    status      ENUM('draft', 'published', 'deleted') DEFAULT 'draft',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

---

## 4. 约束类型

```sql
CREATE TABLE example (
    id       INT PRIMARY KEY,                    -- 主键：唯一且非空
    email    VARCHAR(100) UNIQUE,                -- 唯一约束
    name     VARCHAR(50) NOT NULL,               -- 非空
    age      INT DEFAULT 0,                      -- 默认值
    status  ENUM('active','inactive'),           -- 枚举
    user_id  INT,
    FOREIGN KEY (user_id) REFERENCES users(id)   -- 外键约束
      ON DELETE CASCADE                          -- 用户删除，相关记录也删除
);
```

| 约束 | 作用 | 前端类比 |
|------|------|---------|
| `PRIMARY KEY` | 唯一标识一行 | `id: string` + unique |
| `UNIQUE` | 值不能重复 | `Set` / `unique` 校验 |
| `NOT NULL` | 不能为空 | 必填字段校验 |
| `DEFAULT` | 默认值 | 默认参数 |
| `FOREIGN KEY` | 关联其他表 | 引用类型约束 |
| `ENUM` | 限定可选值 | 联合类型 `\|` |

---

## 5. 命名规范

```sql
-- 表名：复数、小写、下划线
users, orders, order_items

-- 字段：小写、下划线
user_id, created_at, is_active

-- 索引：idx_表名_字段名
idx_users_email, idx_orders_user_id

-- 外键：和关联表主键名一致
users.id → orders.user_id
```

---

## 6. 从 JSON 到表设计练习

```javascript
// 前端：一个博客文章的数据结构
const article = {
    id: 'a1b2c3',
    title: 'MySQL 入门',
    content: '太长略...',
    tags: ['数据库', '后端'],
    author: {
        id: 'u001',
        name: '小明',
        email: 'xm@example.com',
    },
    comments: [
        { id: 'c1', text: '好文！', user: '小红', createdAt: '2026-06-29' },
    ],
    createdAt: '2026-06-28',
};
```

```sql
-- MySQL：拆成 4 张表
CREATE TABLE authors (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articles (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    author_id  INT NOT NULL,
    title      VARCHAR(200) NOT NULL,
    content    LONGTEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE tags (
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE article_tags (
    article_id INT,
    tag_id     INT,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

CREATE TABLE comments (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    article_id INT NOT NULL,
    user_name  VARCHAR(50),
    text       TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id)
);
```

> **关键思路**：JSON 里的嵌套对象 → 拆成多张表 + 外键关联；数组 → 单独的表（一对多/多对多）
