---
date: 2026-06-29
category:
  - mysql
  - java
tag:
  - JDBC
  - MyBatis
  - 全栈
  - 前端转后端
---

# Java 操作 MySQL（JDBC / MyBatis 入门）

## 1. JDBC — 基础连接（类似 mysql2）

```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.2.0</version>
</dependency>
```

```java
import java.sql.*;

public class JdbcDemo {
    public static void main(String[] args) {
        // 1. 加载驱动（MySQL 8+ 可以省略）
        // Class.forName("com.mysql.cj.jdbc.Driver");

        // 2. 建立连接
        String url = "jdbc:mysql://localhost:3306/my_app?useSSL=false&serverTimezone=Asia/Shanghai";
        String user = "root";
        String password = "123456";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {

            // 3. 查询
            String sql = "SELECT * FROM users WHERE age > ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, 18);  // 参数化查询（防 SQL 注入）

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id"));
                System.out.println("Name: " + rs.getString("name"));
                System.out.println("Age: " + rs.getInt("age"));
                System.out.println("---");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

```javascript
// Node.js 对比（回忆 mysql2）
const [rows] = await pool.execute(
    'SELECT * FROM users WHERE age > ?',
    [18]
);
```

**JDBC vs mysql2 对照**：

| 操作 | Java JDBC | Node.js mysql2 |
|------|-----------|----------------|
| 加载驱动 | `Class.forName(...)` | `require('mysql2')` |
| 连接 | `DriverManager.getConnection(url, u, p)` | `mysql.createPool({...})` |
| 参数化 | `stmt.setInt(1, 18)` | `[18]` 数组传参 |
| 执行查询 | `stmt.executeQuery()` → `ResultSet` | `pool.execute(sql, params)` |
| 遍历结果 | `while(rs.next()) { rs.getXxx() }` | `rows.map(r => ...)` |
| 关闭连接 | `try-with-resources` 自动关闭 | 连接池自动管理 |

---

## 2. 使用连接池（HikariCP）

直接 JDBC 每次请求都创建连接太慢，需要用连接池（类似 Node.js 的 mysql2 连接池）。

```xml
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.1.0</version>
</dependency>
```

```java
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

// 配置连接池（类似 mysql2.createPool）
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://localhost:3306/my_app");
config.setUsername("root");
config.setPassword("123456");
config.setMaximumPoolSize(10);      // 最大连接数
config.setMinimumIdle(5);           // 最小空闲
config.setConnectionTimeout(30000); // 超时时间 30s
config.setIdleTimeout(600000);      // 空闲超时 10min

HikariDataSource dataSource = new HikariDataSource(config);

// 使用连接池
try (Connection conn = dataSource.getConnection();
     PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?")) {

    stmt.setInt(1, 1);
    ResultSet rs = stmt.executeQuery();
    if (rs.next()) {
        System.out.println(rs.getString("name"));
    }
}
```

---

## 3. Spring Boot + JDBC Template（推荐）

Spring Boot 提供了 `JdbcTemplate`，比原生 JDBC 好用得多。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>
```

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/my_app?useSSL=false
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10
```

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 查询所有
    public List<User> findAll() {
        return jdbcTemplate.query(
            "SELECT * FROM users",
            new BeanPropertyRowMapper<>(User.class)
        );
    }

    // 条件查询
    public User findById(Long id) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?",
            new BeanPropertyRowMapper<>(User.class),
            id
        );
    }

    // 新增
    public int save(User user) {
        return jdbcTemplate.update(
            "INSERT INTO users (name, age, city) VALUES (?, ?, ?)",
            user.getName(), user.getAge(), user.getCity()
        );
    }

    // 更新
    public int update(User user) {
        return jdbcTemplate.update(
            "UPDATE users SET name = ?, age = ?, city = ? WHERE id = ?",
            user.getName(), user.getAge(), user.getCity(), user.getId()
        );
    }

    // 删除
    public int deleteById(Long id) {
        return jdbcTemplate.update(
            "DELETE FROM users WHERE id = ?",
            id
        );
    }
}
```

```javascript
// Node.js Express + mysql2 对比
async function findAll() {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;
}
```

> JdbcTemplate 帮你处理了 Connection 获取、Statement 创建、ResultSet 映射、异常处理等重复工作。

---

## 4. MyBatis — 最流行的 Java ORM

MyBatis ≈ Java 世界的 Prisma / TypeORM，但写 SQL 更灵活。

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

```yaml
# application.yml
mybatis:
  mapper-locations: classpath:mapper/*.xml  # XML 映射文件位置
  type-aliases-package: com.example.demo.model
  configuration:
    map-underscore-to-camel-case: true      # user_name → userName
```

### 方式 A：注解方式（简单查询）

```java
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM users WHERE id = #{id}")
    User findById(Long id);

    @Select("SELECT * FROM users WHERE city = #{city}")
    List<User> findByCity(String city);

    @Insert("INSERT INTO users (name, age, city) VALUES (#{name}, #{age}, #{city})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    @Update("UPDATE users SET name = #{name}, age = #{age} WHERE id = #{id}")
    int update(User user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteById(Long id);
}
```

### 方式 B：XML 方式（复杂查询）

```xml
<!-- src/main/resources/mapper/UserMapper.xml -->
<mapper namespace="com.example.demo.mapper.UserMapper">
    <!-- 多条件查询 -->
    <select id="searchUsers" resultType="User">
        SELECT * FROM users
        <where>
            <if test="name != null and name != ''">
                AND name LIKE CONCAT('%', #{name}, '%')
            </if>
            <if test="city != null">
                AND city = #{city}
            </if>
            <if test="minAge != null">
                AND age >= #{minAge}
            </if>
        </where>
        ORDER BY id DESC
    </select>

    <!-- 批量插入 -->
    <insert id="batchInsert">
        INSERT INTO users (name, age, city) VALUES
        <foreach collection="list" item="user" separator=",">
            (#{user.name}, #{user.age}, #{user.city})
        </foreach>
    </insert>
</mapper>
```

```java
// 对应的 Mapper 接口
@Mapper
public interface UserMapper {
    List<User> searchUsers(@Param("name") String name,
                           @Param("city") String city,
                           @Param("minAge") Integer minAge);

    int batchInsert(List<User> users);
}
```

> **前端理解**：MyBatis ≈ Prisma 的灵活模式 + 手写 SQL 的能力。注解 ≈ Prisma schema 简单查询，XML ≈ 复杂查询的 query builder。

---

## 5. 三层架构中的 DAO 层

```
Controller → Service → Mapper (MyBatis) → Database

对比前端：
Route → Service → ORM (Prisma) → Database
```

```java
// Controller（≈ Express Route）
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> list(@RequestParam(required = false) String city) {
        return userService.findUsers(city);
    }
}

// Service（≈ 前端 service 层）
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public List<User> findUsers(String city) {
        if (city != null && !city.isEmpty()) {
            return userMapper.findByCity(city);
        }
        return userMapper.findAll();
    }
}
```

---

## 6. JDBC vs JdbcTemplate vs MyBatis 对比

| 方案 | 代码量 | 灵活性 | 学习成本 | 类似前端 |
|------|--------|--------|---------|---------|
| JDBC | 多 | 最高 | 低 | `mysql2` 手写 SQL |
| JdbcTemplate | 中 | 高 | 低 | `knex` SQL 构建器 |
| MyBatis | 少 | 中 | 中 | `Prisma` 灵活模式 |
| JPA (Hibernate) | 极少 | 低 | 高 | `TypeORM` 自动映射 |

> **推荐**：新项目用 MyBatis，小项目用 JdbcTemplate，JDBC 理解原理即可。
