---
date: 2026-06-29
category:
  - redis
  - java
tag:
  - Jedis
  - Lettuce
  - Spring Data Redis
  - 全栈
  - 前端转后端
---

# Java 操作 Redis（Jedis / Spring Data Redis）

## 1. 客户端选择

| 客户端 | 特点 | 类似前端 |
|--------|------|---------|
| **Jedis** | 轻量，直连 Redis（非线程安全需连接池） | `ioredis` 基础用法 |
| **Lettuce** | 异步+同步，线程安全，基于 Netty | `ioredis` 高级用法 |
| **Spring Data Redis** | Spring Boot 整合，封装度高 | ORM 封装层 |

> **推荐**：Spring Boot 项目直接用 `Spring Data Redis`，底层默认用 Lettuce。

---

## 2. Jedis 基础用法

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>5.1.0</version>
</dependency>
```

```java
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

// 连接池配置（类似 ioredis.createPool）
JedisPool pool = new JedisPool("localhost", 6379);

// 基础操作
try (Jedis jedis = pool.getResource()) {

    // String
    jedis.set("name", "小明");
    String name = jedis.get("name");         // "小明"
    jedis.setex("code", 60, "9527");         // 60秒过期
    jedis.incr("count");                      // 原子+1

    // List
    jedis.rpush("queue", "任务A", "任务B");
    String task = jedis.lpop("queue");       // "任务A"
    java.util.List<String> all = jedis.lrange("queue", 0, -1);

    // Hash
    jedis.hset("user:1", "name", "小明");
    jedis.hset("user:1", "age", "25");
    String userName = jedis.hget("user:1", "name");  // "小明"
    java.util.Map<String, String> user = jedis.hgetAll("user:1");

    // Set
    jedis.sadd("tags", "Java", "Redis");
    boolean has = jedis.sismember("tags", "Redis");  // true

    // Zset（排行榜）
    jedis.zadd("leaderboard", 100, "小明");
    jedis.zadd("leaderboard", 80, "小红");
    java.util.Set<String> top = jedis.zrevrange("leaderboard", 0, 2);

    // 过期
    jedis.expire("name", 60);
    long ttl = jedis.ttl("name");             // 剩余秒数
    boolean exists = jedis.exists("name");     // 是否存在
}
```

```javascript
// Node.js ioredis 对比
await redis.set('name', '小明');
await redis.get('name');
await redis.setex('code', 60, '9527');
```

---

## 3. Spring Data Redis（推荐）

Spring Boot 整合后操作 Redis 非常方便。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- JSON 序列化 -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

```yaml
# application.yml
spring:
  data:
    redis:
      host: localhost
      port: 6379
      password:       # 如果没有密码留空
      timeout: 3000   # 连接超时 3s
      lettuce:
        pool:
          max-active: 16   # 最大连接数
          max-idle: 8      # 最大空闲
          min-idle: 4      # 最小空闲
```

### 注入并使用 RedisTemplate

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class RedisService {

    @Autowired
    private StringRedisTemplate redisTemplate;
    // StringRedisTemplate ≈ 所有 key/value 都是 String 类型
    // RedisTemplate<Object, Object> 可以存对象，需要配置序列化

    // String
    public void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public void setex(String key, String value, long seconds) {
        redisTemplate.opsForValue().set(key, value, seconds, TimeUnit.SECONDS);
    }

    public String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // 原子递增
    public Long incr(String key) {
        return redisTemplate.opsForValue().increment(key);
    }

    // List
    public void rpush(String key, String... values) {
        redisTemplate.opsForList().rightPushAll(key, values);
    }

    public String lpop(String key) {
        return redisTemplate.opsForList().leftPop(key);
    }

    // Hash
    public void hset(String key, String field, String value) {
        redisTemplate.opsForHash().put(key, field, value);
    }

    public String hget(String key, String field) {
        Object val = redisTemplate.opsForHash().get(key, field);
        return val != null ? val.toString() : null;
    }

    public java.util.Map<Object, Object> hgetAll(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    // Set
    public void sadd(String key, String... members) {
        redisTemplate.opsForSet().add(key, members);
    }

    public Boolean sismember(String key, String member) {
        return redisTemplate.opsForSet().isMember(key, member);
    }

    // Zset（排行榜）
    public void zadd(String key, String member, double score) {
        redisTemplate.opsForZSet().add(key, member, score);
    }

    public java.util.Set<String> zrevrange(String key, long start, long end) {
        return redisTemplate.opsForZSet().reverseRange(key, start, end);
    }

    // 过期操作
    public Boolean expire(String key, long seconds) {
        return redisTemplate.expire(key, seconds, TimeUnit.SECONDS);
    }

    public Long ttl(String key) {
        return redisTemplate.getExpire(key);
    }

    public Boolean exists(String key) {
        return redisTemplate.hasKey(key);
    }

    public void del(String key) {
        redisTemplate.delete(key);
    }
}
```

---

## 4. 注解缓存（最简方式）

Spring Boot 提供了声明式缓存注解，一行代码搞定缓存逻辑。

```java
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // @Cacheable：查询时先查缓存，没有则执行方法并缓存结果
    @Cacheable(value = "users", key = "#id")
    public User getUserById(Long id) {
        // 只有第一次会执行到这里，后续直接从 Redis 取
        return userMapper.findById(id);
    }

    // @CachePut：更新缓存（方法总是执行，结果写入缓存）
    @CachePut(value = "users", key = "#user.id")
    public User updateUser(User user) {
        userMapper.update(user);
        return user;
    }

    // @CacheEvict：删除缓存
    @CacheEvict(value = "users", key = "#id")
    public void deleteUser(Long id) {
        userMapper.deleteById(id);
    }

    // 所有缓存一起清空（allEntries）
    @CacheEvict(value = "users", allEntries = true)
    public void clearAllCache() {}
}
```

```java
// 启用缓存（在启动类加注解）
@SpringBootApplication
@EnableCaching
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

```javascript
// Node.js 对比：需要手动实现 Cache Aside
async function getUserById(id) {
    const cached = await redis.get(`user:${id}`);
    if (cached) return JSON.parse(cached);
    const user = await db.findUser(id);
    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
    return user;
}
```

> Spring 注解缓存 ≈ 前端的「装饰器」或「高阶函数」：**声明式缓存**，不用写重复的缓存逻辑代码。

---

## 5. Session 共享

```java
// Spring Boot Session 存 Redis（一行配置即可）
```

```xml
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

```yaml
# application.yml（加这一句就够了）
spring:
  session:
    store-type: redis
```

这样所有 `HttpSession` 数据自动存到 Redis，多个服务器共享登录状态。

```java
@RestController
@RequestMapping("/api")
public class UserController {

    @PostMapping("/login")
    public String login(HttpSession session, @RequestBody LoginRequest req) {
        // Session 自动存到 Redis
        session.setAttribute("userId", req.getUserId());
        session.setAttribute("role", "admin");
        return "登录成功";
    }

    @GetMapping("/profile")
    public String profile(HttpSession session) {
        // 多台服务器都能读到
        String userId = (String) session.getAttribute("userId");
        return userId != null ? "已登录: " + userId : "未登录";
    }
}
```

---

## 6. Jedis vs Spring Data Redis 对比

| 场景 | Java (Jedis) | Java (Spring Data Redis) | Node.js (ioredis) |
|------|-------------|-------------------------|-------------------|
| 连接 | `new JedisPool()` | `application.yml` 配置 | `new Redis()` |
| 存字符串 | `jedis.set(k, v)` | `redisTemplate.opsForValue().set(k, v)` | `redis.set(k, v)` |
| 取字符串 | `jedis.get(k)` | `redisTemplate.opsForValue().get(k)` | `redis.get(k)` |
| 过期 | `jedis.setex(k, s, v)` | `redisTemplate.opsForValue().set(k, v, s, SECONDS)` | `redis.setex(k, s, v)` |
| 队列 | `jedis.rpush/lpop` | `opsForList().rightPush/leftPop` | `redis.rpush/lpop` |
| Hash | `jedis.hset/hget` | `opsForHash().put/get` | `redis.hset/hget` |
| 缓存注解 | 无 | `@Cacheable` | 无 |
| Session 共享 | 手动实现 | `spring-session-data-redis` | express-session + RedisStore |
| 线程安全 | 需连接池 | 线程安全 | 单线程异步 |
