---
date: 2026-06-29
category:
  - java
tag:
  - 项目结构
  - 编译
  - 构建
  - JVM
---

# Java 文件后缀全解析

## 一图概览

```
                      Java 项目文件生态
                ┌────────────────────────────┐
                │  源代码 (.java)              │
                │      ↓ javac 编译             │
                │  字节码 (.class)              │
                │      ↓ 打包                   │
                │  ┌─────┴──────┐              │
                │  │ .jar       │ .war         │
                │  └─────┬──────┘              │
                │        ↓                      │
                │  Java -jar  /  Tomcat 启动    │
                └────────────────────────────┘
                           +
                ┌────────────────────────────┐
                │  构建配置                   │
                │  pom.xml (Maven)           │
                │  build.gradle (Gradle)     │
                │  application.yml           │
                └────────────────────────────┘
```

---

## 1. `.java` — 源代码文件

```java
// Hello.java — 一个 .java 文件包含一个 public 类
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

| 要点 | 说明 |
|------|------|
| 命名规则 | `public class` 名称必须和文件名一致 |
| 编译命令 | `javac Hello.java` → 生成 `Hello.class` |
| 运行命令 | `java Hello`（不需要 `.class` 后缀） |
| 一个文件几个类 | 只能有一个 `public class`，可以有多个非 public 类 |

> **前端理解**：`.java` ≈ `.ts` / `.js` 源文件，需要编译后才能运行。

---

## 2. `.class` — 编译后的字节码

```bash
# 编译过程（类似 tsc / babel）
javac Hello.java

# 生成 Hello.class（二进制字节码）
```

```
┌─────────────────────────────────────────┐
│            Java 源码 → 运行              │
│                                         │
│  Hello.java  ──javac──→  Hello.class     │
│  (.java 源码)         (.class 字节码)    │
│                             │            │
│                             ↓ jvm       │
│                         运行结果          │
└─────────────────────────────────────────┘
```

| 要点 | 说明 |
|------|------|
| 内容 | JVM 字节码（二进制，不是文本） |
| 运行 | `java Hello` → JVM 加载 `Hello.class` |
| 反编译 | `javap -c Hello.class` 可反编译查看字节码 |
| 特点 | 跨平台（一次编译，到处运行） |

> **前端理解**：`.class` ≈ `.js`（编译产物）。`javac` 编译 ≈ `tsc` / `babel` 编译。

---

## 3. `.jar` — Java 项目打成的包（≈ npm 包）

JAR = Java ARchive，本质是一个 **ZIP 格式** 的压缩包。

```bash
# 查看 jar 内容（类似查看 zip）
jar tf my-app.jar

# 解压
jar xf my-app.jar

# 结构示例
my-app.jar
├── META-INF/
│   └── MANIFEST.MF      # 清单文件（入口类、版本等）
├── com/
│   └── example/
│       ├── Main.class
│       ├── User.class
│       └── UserService.class
└── application.yml       # 配置文件（解压后可见）
```

```xml
<!-- Maven 打包（在 pom.xml 目录执行） -->
<!-- 生成 target/my-app-1.0.0.jar -->
```

```bash
# 运行 jar
java -jar my-app-1.0.0.jar

# 如果 MANIFEST.MF 中没有 Main-Class 声明，需要手动指定入口
java -cp my-app-1.0.0.jar com.example.Main
```

### MANIFEST.MF 内容

```
Manifest-Version: 1.0
Main-Class: com.example.MainApplication    # 程序入口
Class-Path: lib/dependency1.jar lib/dependency2.jar  # 依赖
```

> **前端理解**：`.jar` ≈ `npm pack` 产出的 `.tgz` 包，或 webpack 打包后的 `dist/` 文件夹压缩。

---

## 4. `.war` — Web 应用包（≈ 前端构建后的 dist）

WAR = Web Application Archive，专门给 Web 容器（Tomcat、Jetty）用的。

```bash
# Maven 打 war 包
# 在 pom.xml 中设置 <packaging>war</packaging> 即可
```

```
my-app.war
├── META-INF/
├── WEB-INF/
│   ├── web.xml                # Web 应用配置（Servlet 配置）
│   ├── classes/               # 编译后的 .class 文件
│   │   └── com/example/*.class
│   └── lib/                   # 依赖的 jar 包
│       ├── spring-core.jar
│       └── mysql-connector.jar
├── index.html                 # 前端静态资源
├── css/
├── js/
└── images/
```

| 特性 | JAR | WAR |
|------|-----|-----|
| 用途 | 普通 Java 应用 / 库 | Web 应用（部署到 Tomcat） |
| 内置服务器 | ❌ 自己启动 main | ✅ 由 Tomcat/Jetty 管理 |
| 前端资源 | ❌ 不包含 | ✅ 包含 HTML/CSS/JS |
| 运行方式 | `java -jar` | 丢到 Tomcat 的 `webapps/` 目录 |
| 现代趋势 | Spring Boot 用 JAR（内嵌 Tomcat） | 传统方式 |

> **前端理解**：`.war` ≈ 前端构建产物 `dist/` 整个文件夹，但还包含了后端代码和依赖。

---

## 5. `pom.xml` — Maven 构建配置（≈ package.json）

```xml
<project>
    <!-- 项目坐标（≈ name + version） -->
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>    <!-- jar / war / pom -->

    <!-- 依赖管理（≈ dependencies） -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.2.0</version>
        </dependency>
    </dependencies>

    <!-- 构建插件（≈ devDependencies / 构建工具） -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

| 前端文件 | Maven 对应 |
|----------|-----------|
| `package.json` | `pom.xml` |
| `package-lock.json` | （无直接对应，用版本管理） |
| `node_modules/` | `~/.m2/repository/`（本地仓库） |
| `npm install` | `mvn dependency:resolve` |
| `npm run build` | `mvn package` |

---

## 6. `build.gradle` — Gradle 构建配置

```groovy
// Gradle 用 Groovy/Kotlin DSL，比 Maven XML 更简洁
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
}

group = 'com.example'
version = '1.0.0'

repositories {
    mavenCentral()      // 仓库（≈ npm registry）
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'com.mysql:mysql-connector-j'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

| 对比 | Maven | Gradle |
|------|-------|--------|
| 配置语言 | XML | Groovy / Kotlin DSL |
| 构建速度 | 慢 | 快（增量编译 + 缓存） |
| 学习成本 | 低（XML 易懂） | 中（需要学 DSL） |
| 市场份额 | 老项目为主 | 新项目为主 |

> **前端理解**：Maven ≈ npm（稳定、成熟），Gradle ≈ pnpm（快、现代化）。

---

## 7. `.properties` — 属性配置文件

```properties
# application.properties (Spring Boot)
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/my_app
spring.datasource.username=root
spring.datasource.password=123456
```

```yaml
# 同等的 application.yml（更推荐，层级清晰）
server:
  port: 8080
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/my_app
    username: root
    password: 123456
```

| 格式 | 特点 | 前端类比 |
|------|------|---------|
| `.properties` | 纯键值对，无层级 | 类似 `.env` |
| `.yml` / `.yaml` | 层级结构，可读性好 | 类似 `tsconfig.json` 但不用 {} |
| `.xml` | 标签式，功能强大但啰嗦 | 类似 `package-lock.json`（自动生成） |

---

## 8. IDE 相关文件

```yaml
# .iml — IntelliJ IDEA 模块文件（自动生成）
# 类似前端的 .vscode/settings.json
# 不要提交到 Git！
```

```xml
<!-- .classpath — Eclipse 类路径文件 -->
<!-- 类似前端的 .editorconfig / tsconfig.json 的路径配置 -->
```

| 文件 | IDE | 说明 |
|------|-----|------|
| `.iml` | IntelliJ IDEA | 模块配置（自动生成） |
| `.classpath` | Eclipse | 类路径配置 |
| `.project` | Eclipse | 项目配置 |
| `.idea/` | IntelliJ IDEA | IDE 配置目录（不要提交） |
| `.vscode/` | VS Code | 前端熟悉，Java 也可用 |

> **.gitignore中要忽略的**：`.idea/`、`*.iml`、`.classpath`、`.project`、`.settings/`、`target/`（构建产物）、`*.class`

---

## 后缀速查表

| 后缀 | 类型 | 运行/使用方式 | 前端类比 |
|------|------|-------------|---------|
| `.java` | 源代码 | `javac` 编译 | `.ts` / `.jsx` |
| `.class` | 字节码 | 由 JVM 加载 | `.js`（编译产物） |
| `.jar` | 应用/库包 | `java -jar` | `.tgz` npm 包 |
| `.war` | Web 应用 | 丢 Tomcat | `dist/` 构建产物 |
| `.pom.xml` | Maven 配置 | Maven 构建 | `package.json` |
| `.gradle` | Gradle 配置 | Gradle 构建 | `pnpm-workspace.yaml` |
| `.properties` | 属性配置 | 程序读取 | `.env` |
| `.yml` / `.yaml` | YAML 配置 | 程序读取 | 层级配置文件 |
| `.xml` | 通用标记语言 | 配置/数据 | `package-lock.json` |
| `.iml` | IDEA 模块 | IDE 自动生成 | `.vscode/settings.json` |
| `.classpath` | Eclipse 配置 | IDE 自动生成 | `.vscode/launch.json` |
| `.mvn` | Maven Wrapper | 无需安装 Maven | 类似 `.nvmrc` |
| `.jsp` | 动态网页 | Tomcat 解析 | `ejs` / `pug` 模板 |
