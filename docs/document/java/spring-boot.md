---
date: 2026-06-29
category:
  - java
tag:
  - SpringBoot
  - 框架
  - 前端转Java
---

# Spring Boot 入门（对比 Express/Koa）

## 1. 从 Express 到 Spring Boot

Spring Boot ≈ Java 世界的 Express + 大量开箱即用的整合。

```
Express / Koa (Node.js)      →     Spring Boot (Java)
─────────────────────────────────────────────────────
app.get('/api/users')         →     @GetMapping("/api/users")
app.use(middleware)            →     @Component / Filter / Interceptor
req.body                       →     @RequestBody
req.params / req.query         →     @PathVariable / @RequestParam
res.json(data)                 →     @RestController + return
npm install express            →     pom.xml 加 spring-boot-starter-web
// 手动处理 JSON 序列化       →     自动 Jackson 序列化
nodemon                         →     DevTools (热重启)
dotenv                          →     application.yml / application.properties
```

---

## 2. 第一个 REST API

### Express 版本

```javascript
const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "小明", age: 25 },
    { id: 2, name: "小红", age: 23 }
];

// GET /api/users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// POST /api/users
app.post('/api/users', (req, res) => {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).json(user);
});

app.listen(3000);
```

### Spring Boot 版本

```java
// User.java - 数据模型
public class User {
    private Long id;
    private String name;
    private Integer age;

    // 构造器
    public User() {}

    public User(Long id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    // Getter / Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}
```

```java
// UserController.java - 控制器（≈ Express Router）
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")   // 统一前缀
public class UserController {

    private List<User> users = new ArrayList<>(List.of(
        new User(1L, "小明", 25),
        new User(2L, "小红", 23)
    ));

    // GET /api/users
    @GetMapping
    public List<User> getAllUsers() {
        return users;  // 自动转为 JSON（Jackson）
    }

    // GET /api/users/{id}
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return users.stream()
            .filter(u -> u.getId().equals(id))
            .findFirst()
            .orElse(null);  // 实际应该抛异常
    }

    // POST /api/users
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User newUser) {
        newUser.setId((long) (users.size() + 1));
        users.add(newUser);
        return newUser;
    }

    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        users.removeIf(u -> u.getId().equals(id));
    }
}
```

```java
// Application.java - 启动类（≈ app.listen()）
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

```yaml
# application.yml - 配置文件（≈ .env）
server:
  port: 8080           # 默认就是 8080

spring:
  application:
    name: demo-app
```

---

## 3. 注解速查

Spring Boot 大量使用注解（类似 JS 的装饰器 `@`）。

| 注解 | 作用 | 类似前端概念 |
|------|------|-------------|
| `@RestController` | 标记为 REST API 控制器 | Express Router |
| `@RequestMapping("/api")` | 统一路由前缀 | `router.prefix('/api')` |
| `@GetMapping("/users")` | GET 路由 | `router.get('/users')` |
| `@PostMapping` | POST 路由 | `router.post()` |
| `@PathVariable` | 取 URL 参数 (/users/{id}) | `req.params.id` |
| `@RequestParam` | 取查询参数 (?page=1) | `req.query.page` |
| `@RequestBody` | 取请求体 | `req.body` |
| `@Autowired` | 依赖注入 | 类似 DI 容器 |
| `@Component` | 声明 Spring 管理的 Bean | - |
| `@Service` | 业务层注解 | Service 层 |
| `@Repository` | 数据层注解 | DAO 层 |

---

## 4. 三层架构

Spring Boot 推荐的分层结构，类似前端的 MVC 模式。

```
src/main/java/com/example/demo/
├── DemoApplication.java           # 启动类
├── controller/                     # 控制器层（类似 Express Router）
│   └── UserController.java
├── service/                        # 业务逻辑层（类似 Service/Utils）
│   └── UserService.java
├── repository/                     # 数据访问层（类似 ORM）
│   └── UserRepository.java
└── model/                          # 数据模型（类似 TypeScript interface/type）
    └── User.java
```

```java
// Service 层（≈ 前端的 service 函数）
@Service
public class UserService {
    public List<User> getAllUsers() {
        // 业务逻辑...
        return users;
    }
}

// Controller 调用 Service
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;  // 注入 Service

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
```

> **前端理解**：
> - Controller ≈ Express 的 route handler
> - Service ≈ 抽离到 service 文件的业务逻辑
> - Repository ≈ Prisma / TypeORM 的 repository
> - Model ≈ TypeScript 的 interface
> - `@Autowired` ≈ 自动帮你 new 好并注入（DI 容器）

---

## 5. 常用 Starter 一览

```xml
<!-- pom.xml 添加依赖 ≈ npm install -->
<dependencies>
    <!-- Web API -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- 数据库 (≈ Prisma/Sequelize) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- MySQL 驱动 -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>

    <!-- 参数校验 (@Valid) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- 热重启 (≈ nodemon) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- 测试 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

---

## 6. Spring Boot vs Express 对照表

| 场景 | Express | Spring Boot |
|------|---------|-------------|
| 新建项目 | `npm init` + `npm i express` | Spring Initializr / start.spring.io |
| 监听端口 | `app.listen(3000)` | `server.port: 8080` 或 `application.yml` |
| 路由定义 | `app.get('/api', handler)` | `@GetMapping` 注解 |
| 请求体解析 | `express.json()` 中间件 | 内置，`@RequestBody` |
| JSON 响应 | `res.json(data)` | `return data` (自动序列化) |
| 参数校验 | Joi / Zod | `@Valid` + `jakarta.validation` |
| 全局异常 | `app.use((err, req, res, next) => {})` | `@ControllerAdvice` |
| 中间件 | `app.use(middleware)` | Filter / HandlerInterceptor |
| 配置管理 | dotenv | application.yml (内置) |
| 热重启 | nodemon | spring-boot-devtools |
| 测试 | Jest / Supertest | JUnit + MockMvc |
| 打包 | 无标准（pkg / docker） | `mvn package` → jar 文件 |
| 运行 | `node app.js` | `java -jar app.jar` |
