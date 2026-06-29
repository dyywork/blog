---
date: 2026-06-29
category:
  - mysql
tag:
  - 学习路线
  - 数据库
  - 前端转后端
---

# MySQL 学习路线 — 前端开发者视角

## 为什么前端要学数据库？

| 场景 | 以前（纯前端） | 加上数据库 |
|------|---------------|-----------|
| 数据存储 | LocalStorage / JSON 文件 | MySQL 持久化 |
| 接口数据 | 写死 mock 数据 | 真实 CRUD |
| 全栈能力 | 调后端接口 | 自己写接口+查数据 |
| 面试 | 只有前端知识 | 全栈竞争力 |

---

## 学习路线总览

| 阶段 | 主题 | 前端类比 | 预期时间 |
|------|------|----------|----------|
| 1 | SQL 基础（CRUD） | `array.push/filter/find` → SQL | 1 天 |
| 2 | 查询进阶 | `sort/filter/groupBy` → SQL 查询 | 1 天 |
| 3 | 多表 JOIN | 前端数据关联 → SQL 连表 | 1 天 |
| 4 | 常用函数 | JS 内置方法 → SQL 函数 | 1 天 |
| 5 | 索引 & 事务 | 性能优化 → 数据库级优化 | 1 天 |
| 6 | 表设计 | JSON Schema / TS 类型 → 库表设计 | 1 天 |
| 7 | Node.js 操作 MySQL | - | 1 天 |

---

## 核心概念一览

```
前端概念 → MySQL 对应
─────────────────────
JSON 对象           → 表的行 (Row)
JSON 数组           → 表的列 (Column)
对象属性 (key)      → 字段名 (Column)
数组 filter         → WHERE 条件
数组 sort           → ORDER BY
数组 groupBy        → GROUP BY
数组 find           → LIMIT 1
对象关联引用         → JOIN + 外键
localStorage        → 数据库持久化
TypeScript 类型     → 字段数据类型
```

> 接下来的文章会逐一深入，每篇都保持「前端对照」的视角。
