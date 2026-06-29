---
date: 2026-06-29
category:
  - java
tag:
  - 学习路线
  - 前端转Java
---

# Java 学习路线 — 前端开发者视角

## 为什么学 Java？

作为一名前端开发者，学习 Java 能带来：

- **类型系统**：从 JS 的动态类型到 Java 的静态类型，建立更严谨的编程思维
- **后端能力**：用 Spring Boot 构建 REST API，替代 Node.js/Express
- **生态认知**：Maven/Gradle、ORM、IoC 容器等企业级开发范式
- **职业扩展**：全栈/后端岗位机会

---

## 学习路线总览

| 阶段 | 主题 | 对比前端 | 预期时间 |
|------|------|----------|----------|
| 1 | 基础语法 | JS 语法 → Java 语法 | 2 天 |
| 2 | 面向对象 | JS Class/原型 → Java OOP | 2 天 |
| 3 | 集合框架 | JS Array/Map/Set → Java Collections | 1 天 |
| 4 | Lambda & Stream | JS 箭头函数/数组方法 → Java Stream | 1 天 |
| 5 | 异常与 I/O | try-catch → Java Exception/IO | 1 天 |
| 6 | Maven 构建 | npm/pnpm → Maven/Gradle | 1 天 |
| 7 | Spring Boot | Express/Koa → Spring Boot | 3 天 |
| 8 | 数据库操作 | Prisma/TypeORM → MyBatis/JPA | 2 天 |
| 9 | 实战项目 | - | 5 天 |

---

## 快速对照表

```
JS / TS                    → Java
─────────────────────────────────────
let / const                → int / String / var (类型在前)
function() {} / arrow fn   → public void method() {}
const obj = {}             → class + new
array.map/filter/reduce    → stream().map/filter/reduce
Promise / async-await      → CompletableFuture
try-catch-finally          → try-catch-finally (基本一样)
npm install                → Maven dependency
Express Router             → @Controller / @RestController
Nodemon (热重启)            → Spring DevTools
```

> 接下来的文章会逐一深入每个主题。建议按顺序阅读，但可以根据基础跳过熟悉的部分。
