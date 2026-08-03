---
date: 2026-08-03
category:
  - java
tag:
  - SpringBoot
  - 后端分层
  - MyBatis-Plus
  - 前端转Java
---

# 写 User 服务代码：文件创建顺序与职责（以 admin-system 为例）

> 以 `admin-system` 项目为例，梳理"做一个用户的增删改查 + 分配角色"功能时，要创建哪些文件、按什么顺序创建、每个文件干什么。

## 0. 先理解这个项目的分层架构

这个后端项目的包结构（在 `src/main/java/com/admin/system/` 下）：

```
com/admin/system/
├── controller/     # 第 4 层：接口层（≈ Express 的 route handler）
├── service/        # 第 3 层：业务逻辑层（≈ 前端抽出来的 service 文件）
├── mapper/         # 第 2 层：数据访问层（≈ Prisma/TypeORM 的 repository）
├── entity/         # 第 1 层：实体类（≈ 数据库表对应的 TypeScript interface）
├── dto/  vo/  impl/   # 已建目录但目前是空的（本项目的简化约定下暂未使用）
└── security/       # Spring Security 登录认证相关
```

`resources/mapper/` 下还有可选的 **XML 文件**（写复杂 SQL 用），以及一个公共模块 `admin-common` 提供了 `R<T>`（统一响应体）和 `BizException`（业务异常）。

**一句话类比（前端视角）：**

| 后端 | 前端 |
|------|------|
| `Entity` | TypeScript 的 interface（描述数据长什么样） |
| `Mapper` | Prisma / TypeORM 的 repository（操作数据库） |
| `Service` | 抽出来的 service 函数文件（业务逻辑） |
| `Controller` | Express 的 route handler（接收请求、返回响应） |
| `R<T>` 统一响应 | 前端封装的 `{ code, msg, data }` axios 拦截器 |

---

## 1. 创建顺序总览

依赖方向是 `Controller → Service → Mapper → Entity`，所以**自底向上创建**，每建完一层代码就能编译通过：

```
第 1 步  建表 SQL            sys_user.sql（先有表，实体才能映射）
第 2 步  Entity             entity/SysUser.java
第 3 步  Mapper             mapper/SysUserMapper.java（复杂 SQL 时加 XML）
第 4 步  Service            service/UserService.java
第 5 步  Controller         controller/UserController.java
第 6 步  权限 + 菜单        数据库 sys_menu 表加权限点，配 @PreAuthorize
```

> 顺序反过来（先建 Controller）也能写，但**编译会一直报错**（找不到 Service/Mapper/Entity），不利于边写边验证。

---

## 2. 每一步做什么

### 第 1 步：数据库表（SQL）

表结构定了，后面所有代码都以它为准。字段名用下划线风格：`create_time`、`dept_id`。

### 第 2 步：Entity —— 实体的"脸面"

**作用**：一个类 = 一张表，类的字段 = 表的列。MyBatis-Plus 用它做表和 Java 对象之间的映射。

**要点**：
- `@Data`（Lombok）：自动生成 getter/setter ≈ TypeScript 的 interface
- `@TableName("sys_user")`：指定对应的表名
- `@TableId(type = IdType.AUTO)`：主键，自增
- `@TableLogic`：逻辑删除字段（删除时实际是 UPDATE 置 deleted=1）
- `@TableField(fill = FieldFill.INSERT)`：插入时自动填充（create_time、create_by）
- `@Schema`：Swagger 文档说明

```java
@Data
@TableName("sys_user")
public class SysUser {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String status;          // 0正常 1停用
    @TableLogic
    private String deleted;         // 逻辑删除标志
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
```

### 第 3 步：Mapper —— 数据访问层

**作用**：操作数据库的接口。继承 `BaseMapper<SysUser>` 后，增删改查方法（`insert` / `deleteById` / `updateById` / `selectById` / `selectPage` / `selectCount`…）**全部免费获得**，不用自己写。

**两种写 SQL 的方式**：
1. 接口里用注解（简单 SQL）：`@Select` / `@Insert` / `@Delete`
2. XML 文件（复杂 SQL，如多表 join）：`resources/mapper/SysUserMapper.xml`

```java
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {

    // 注解写简单 SQL
    @Select("SELECT role_id FROM sys_user_role WHERE user_id = #{userId}")
    List<Long> selectRoleIdsByUserId(Long userId);

    @Delete("DELETE FROM sys_user_role WHERE user_id = #{userId}")
    int deleteUserRoleByUserId(Long userId);
}
```

### 第 4 步：Service —— 业务逻辑层

**作用**：写真正的业务逻辑（校验、组合、事务、清缓存）。Controller 不写业务，只调 Service。

**重点（本项目的约定）**：
- 是**具体的 `@Service` 类**，不是"接口 + Impl 实现"模式 —— 这就是 `impl/` 目录为空的原因，写新功能别去建 `UserServiceImpl`
- `@RequiredArgsConstructor` + `private final`：构造器注入（推荐，避免 @Autowired 警告）
- 写操作加 `@Transactional`：方法里任一步失败，整体回滚
- 抛 `BizException`：会被全局异常处理器转成统一错误响应

```java
@Service
@RequiredArgsConstructor
public class UserService {

    private final SysUserMapper userMapper;        // 注入 Mapper
    private final StringRedisTemplate redisTemplate;

    @Transactional
    public void addUser(SysUser user) {
        Long count = userMapper.selectCount(
            new LambdaQueryWrapper<SysUser>().eq(SysUser::getUsername, user.getUsername())
        );
        if (count > 0) {
            throw new BizException("用户名已存在");   // 业务校验失败抛异常
        }
        userMapper.insert(user);
    }

    @Transactional
    public void updateUserRoles(Long userId, List<Long> roleIds) {
        userMapper.deleteUserRoleByUserId(userId);   // 先删旧的
        for (Long roleId : roleIds) {                // 再插新的（全量替换）
            userMapper.insertUserRole(userId, roleId);
        }
        redisTemplate.delete("user_perms:" + userId);  // 清权限缓存
    }
}
```

**MyBatis-Plus 的 `LambdaQueryWrapper`** 是写查询条件的利器（比手拼 SQL 安全），类似前端的条件对象：

```java
new LambdaQueryWrapper<SysUser>()
    .like(username != null, SysUser::getUsername, username)   // 模糊 LIKE
    .eq(status != null, SysUser::getStatus, status)           // 精确 =
    .orderByAsc(SysUser::getId)                                // 排序
```

### 第 5 步：Controller —— 接口层

**作用**：接收 HTTP 请求、调用 Service、返回 `R<T>` 统一响应。**相当于 Express 的 route handler**。

**要点**：
- `@RestController` + `@RequestMapping("/api/system/user")`：路由前缀
- `@GetMapping` / `@PostMapping` / `@PutMapping` / `@DeleteMapping`：CRUD 动词映射
- `@RequestBody`（取 body）、`@PathVariable`（取路径参数 /users/{id}）、`@RequestParam`（取 ?page=1）
- 返回 `R.success(data)`：统一包一层 `{ code: 200, msg, data }`
- `@PreAuthorize("@pms.hasPermission('system:user:list')")`：接口级权限控制
- `@Operation` / `@Parameter`：Swagger 文档

```java
@Tag(name = "用户管理")
@RestController
@RequestMapping("/api/system/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/list")
    @PreAuthorize("@pms.hasPermission('system:user:list')")
    public R<Map<String, Object>> list(@RequestParam(defaultValue = "1") int pageNum,
                                       @RequestParam(defaultValue = "10") int pageSize) {
        IPage<SysUser> page = userService.selectUserPage(pageNum, pageSize, null, null);
        return R.success(Map.of("rows", page.getRecords(), "total", page.getTotal()));
    }

    @PostMapping
    @PreAuthorize("@pms.hasPermission('system:user:add')")
    public R<Void> add(@RequestBody SysUser user) {
        userService.addUser(user);
        return R.success();
    }
}
```

### 第 6 步：权限点配置（数据层面）

`@PreAuthorize("@pms.hasPermission('system:user:list')")` 不是写好就能用的，需要在数据库 `sys_menu` 表里插入对应的菜单/权限记录，用户分配了对应角色才能访问。这一步是纯 SQL 数据操作，前端没对应的东西，知道即可。

---

## 3. 完整请求流转（一个请求进来之后）

```
前端 axios 请求
   ↓  /api/system/user/list
Controller 接收请求、取参数、校验权限（@PreAuthorize）
   ↓
Service 处理业务逻辑（校验用户名唯一、拼查询条件、管事务）
   ↓
Mapper 执行 SQL（MyBatis-Plus 自动 SQL 或注解/XML 自定义 SQL）
   ↓
数据库
   ↓  ↑ 结果封装成 SysUser 对象返回
Service → Controller → R.success(data)
   ↓
前端拿到 { code: 200, msg: "操作成功", data: { rows: [...], total: 18 } }
```

---

## 4. 新手最容易踩的坑

1. **别按前端习惯建 "UserServiceImpl"** —— 本项目 Service 就是普通类，`impl/` 目录是空的（简化约定）。
2. **写操作忘记 `@Transactional`** —— 多表修改（如先删角色再插角色）中途报错会留下脏数据。
3. **实体字段和表列名对不上** —— MyBatis-Plus 默认把驼峰 `createTime` 映射到下划线 `create_time`，但**手动起的表别名/列名必须和实体属性一致**，否则查出来全是 null。
4. **逻辑删除字段** —— `@TableLogic` 标记后，`deleteById` 实际是 UPDATE，不是 DELETE，联表查询条件里经常要 `deleted = '0'`。
5. **密码不能走 `updateUser` 更新** —— 参考源码，更新时先 `setPassword(null)`，否则会把已有密码覆盖成 null。

## 5. 对照一个真实文件清单

写"用户管理"功能时，实际创建/使用的文件（都在 `com/admin/system/` 下）：

| 顺序 | 文件 | 一句话职责 |
|------|------|-----------|
| 1 | `entity/SysUser.java` | 用户表映射类 |
| 2 | `mapper/SysUserMapper.java` | 用户 + 用户角色关系表的 SQL 接口 |
| 2' | `resources/mapper/SysUserMapper.xml` | 复杂联表查询 SQL（可选） |
| 3 | `service/UserService.java` | 用户 CRUD、角色分配、清缓存、事务 |
| 4 | `controller/UserController.java` | 用户相关 REST 接口 + 权限控制 |
| 5 | `sys_menu` 表数据 | 权限点（system:user:xxx） |
