---
date: 2026-06-29
category:
  - java
tag:
  - Maven
  - 构建工具
  - 前端转Java
---

# Maven（对比 npm/pnpm）

## 为什么需要构建工具？

| 前端 | Java |
|------|------|
| npm/pnpm/yarn | Maven/Gradle |
| `package.json` | `pom.xml` |
| `npm install` | `mvn install` / Maven 自动下载 |
| `node_modules/` | `~/.m2/repository/` (本地仓库) |
| `npm scripts` | Maven lifecycle (phase) |
| `webpack/vite` 构建 | `mvn package` 构建 jar/war |
| `package-lock.json` | `pom.xml` + 版本锁定 |

---

## 1. Maven 的核心概念

### pom.xml 结构

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>

    <!-- 坐标：唯一标识一个项目 -->
    <groupId>com.example</groupId>      <!-- ≈ npm scope (@scope/name) -->
    <artifactId>my-app</artifactId>     <!-- ≈ npm package name -->
    <version>1.0.0</version>            <!-- ≈ npm version -->
    <packaging>jar</packaging>          <!-- jar / war / pom -->

    <!-- 项目信息 -->
    <name>My App</name>
    <description>一个示例应用</description>

    <!-- 属性：类似 npm scripts 里的变量 -->
    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

    <!-- 依赖：≈ package.json 的 dependencies -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.2.0</version>
        </dependency>
    </dependencies>
</project>
```

```json
// package.json 对比
{
  "name": "@example/my-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

---

## 2. 依赖管理

### 添加依赖

```xml
<!-- 在 mvnrepository.com 搜索后复制到 pom.xml -->
<dependencies>
    <!-- MySQL 驱动 -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.2.0</version>
    </dependency>

    <!-- Lombok（减少样板代码） -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.30</version>
        <scope>provided</scope>   <!-- ≈ devDependencies -->
    </dependency>

    <!-- 单元测试 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.0</version>
        <scope>test</scope>       <!-- ≈ devDependencies -->
    </dependency>
</dependencies>
```

### scope 对比 npm

| Maven scope | 说明 | npm 对应 |
|-------------|------|----------|
| `compile` (默认) | 编译+运行时都需要 | `dependencies` |
| `provided` | 编译时需要，运行时由容器提供 | `devDependencies` (部分) |
| `runtime` | 运行时需要，编译不需要 | - |
| `test` | 仅测试时需要 | `devDependencies` |
| `system` | 本地 jar 包 | - |

### 版本管理

```xml
<!-- 统一管理版本号 -->
<properties>
    <spring.version>6.1.0</spring.version>
    <jackson.version>2.16.0</jackson.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>${spring.version}</version>  <!-- 引用属性 -->
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>${jackson.version}</version>
    </dependency>
</dependencies>
```

---

## 3. 常用命令

```bash
# 清理编译产物（删除 target/ 目录）
mvn clean

# 编译
mvn compile

# 运行测试
mvn test

# 打包（jar / war）
mvn package

# 安装到本地 .m2 仓库（类似 npm link? 更像 npm pack）
mvn install

# 全部一起：clean → compile → test → package
mvn clean package

# 跳过测试
mvn package -DskipTests

# 强制更新快照依赖（类似 npm update）
mvn clean install -U
```

```bash
# npm 对应
npm install         # 第一次装依赖
npm run build       # 构建
npm test            # 测试
npm publish         # 发布（≈ mvn deploy）
```

---

## 4. 生命周期（Lifecycle）

Maven 的生命周期是**顺序执行**的，执行后面的会自动触发前面的。

```
常用 lifecycle phase:
validate → compile → test → package → verify → install → deploy

mvn package  = validate + compile + test + package
mvn install  = ... + install（装到本地仓库）
mvn deploy   = ... + deploy（发布到远程仓库）
```

> **前端理解**：类似 `npm run dev` 触发 `vite build` 的系列 hooks，但 Maven 的生命周期是标准化的、所有项目都遵循。

---

## 5. 插件（类似 npm 的构建工具）

```xml
<build>
    <plugins>
        <!-- 编译插件 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <source>17</source>
                <target>17</target>
            </configuration>
        </plugin>

        <!-- Spring Boot 打包插件 -->
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

> **前端理解**：插件 ≈ Webpack 的 loader/plugin 或 Vite 的插件，用于扩展构建能力。

---

## 6. 从 npm 迁移到 Maven 对照表

| 场景 | npm | Maven |
|------|-----|-------|
| 初始化项目 | `npm init` | `mvn archetype:generate` |
| 安装依赖 | `npm install express` | 编辑 pom.xml 加 dependency |
| 安装 dev 依赖 | `npm install -D jest` | scope = test |
| 本地安装 | `npm install` | `mvn dependency:resolve` |
| 构建 | `npm run build` | `mvn package` |
| 运行 | `node app.js` | `mvn exec:java` 或 IDE 运行 |
| 测试 | `npm test` | `mvn test` |
| 发布 | `npm publish` | `mvn deploy` |
| 版本管理 | `package.json` | `<version>` |
| 锁定版本 | `package-lock.json` | 没有直接对应（Maven 有依赖版本管理最佳实践） |
| 多模块 | npm workspaces / pnpm workspace | Maven 多模块 (`<modules>`) |

---

## 7. Maven 常用技巧

### 查看依赖树

```bash
# 查看所有依赖及传递依赖
mvn dependency:tree

# 输出类似：
# com.example:my-app:jar:1.0.0
# +- org.springframework.boot:spring-boot-starter-web:jar:3.2.0:compile
#    +- org.springframework.boot:spring-boot-starter:jar:3.2.0:compile
#       +- org.springframework.boot:spring-boot:jar:3.2.0:compile
#       +- org.springframework.boot:spring-boot-autoconfigure:jar:3.2.0:compile
```

### 排查依赖冲突

```bash
# 查看特定依赖的版本冲突
mvn dependency:tree -Dincludes=com.fasterxml.jackson
```

> **前端理解**：`mvn dependency:tree` ≈ `npm ls` 或 `pnpm why`，查看依赖关系。

---

## 8. 快速上手：创建新项目

```bash
# 方式1：用 Maven 原型创建
mvn archetype:generate \
    -DgroupId=com.example \
    -DartifactId=java-demo \
    -DarchetypeArtifactId=maven-archetype-quickstart \
    -DinteractiveMode=false

# 方式2：用 Spring Initializr（推荐，Web 界面）
# https://start.spring.io/
# 选择：Maven, Java 17, Spring Boot 3.x, 加上 Spring Web 依赖
# 下载 zip 即可

# 方式3：用 IntelliJ IDEA 新建项目
# File → New → Project → Maven → 填 groupId/artifactId
```
