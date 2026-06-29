---
date: 2026-06-29
category:
  - java
tag:
  - 异常处理
  - I/O
  - 前端转Java
---

# 异常处理 & I/O（对比 JavaScript）

## 一、异常处理

### 1. try-catch-finally

```java
try {
    // 可能出问题的代码
    int result = 10 / 0;
    System.out.println("这行不会执行");
} catch (ArithmeticException e) {
    // 捕获特定异常
    System.out.println("除数不能为0: " + e.getMessage());
} catch (Exception e) {
    // 捕获通用异常（范围从窄到宽）
    System.out.println("其他异常: " + e.getMessage());
} finally {
    // 始终执行（类似 JS 的 finally）
    System.out.println("清理资源");
}
```

```javascript
// JavaScript（基本一样）
try {
    const result = 10 / 0;
} catch (e) {
    console.log(e.message);
} finally {
    console.log("清理资源");
}
```

> **语法基本一致**，但 Java 的异常机制比 JS 复杂得多。

---

### 2. 受检异常 vs 非受检异常

这是 Java **最独特**（也最让新手困惑）的设计。

| 类型 | 说明 | 必须处理？ | 常见例子 |
|------|------|-----------|----------|
| **受检异常** (Checked Exception) | 编译器强制处理 | ✅ 必须 try-catch 或 throws | `IOException`, `SQLException` |
| **非受检异常** (RuntimeException) | 运行时可能发生 | ❌ 不强制 | `NullPointerException`, `ArrayIndexOutOfBoundsException` |
| **Error** | JVM 严重错误 | ❌ 无法处理 | `OutOfMemoryError`, `StackOverflowError` |

```java
// 受检异常：编译器强制你处理（不处理编译报错）
import java.io.*;

public class ReadFile {
    public void readFile(String path) {
        // ❌ 编译错误！FileReader 构造器抛 FileNotFoundException（受检异常）
        FileReader reader = new FileReader(path);
    }
}

// ✅ 方案1：try-catch 处理
public void readFileSafe(String path) {
    try {
        FileReader reader = new FileReader(path);
        System.out.println("文件打开成功");
    } catch (FileNotFoundException e) {
        System.out.println("文件不存在: " + path);
    }
}

// ✅ 方案2：throws 抛给调用者
public void readFileThrows(String path) throws FileNotFoundException {
    FileReader reader = new FileReader(path);
}
```

```javascript
// JavaScript 没有受检/非受检之分
// 任何异常都可以 throw 或 try-catch
function readFile(path) {
    // 不会强制处理
    const reader = new FileReader(path);
}
```

> **前端理解**：受检异常 ≈ TS 在函数签名中声明了异常类型，编译器强制你处理。JS 没有这个机制，所有异常都是「运行时才发现」。

---

### 3. 自定义异常

```java
// 自定义异常（继承 Exception 或 RuntimeException）
public class BusinessException extends RuntimeException {
    private int errorCode;

    public BusinessException(int errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }
}

// 使用
public void validateAge(int age) {
    if (age < 0) {
        throw new BusinessException(400, "年龄不能为负数");
    }
    if (age > 150) {
        throw new BusinessException(400, "年龄不合法");
    }
}

try {
    validateAge(-1);
} catch (BusinessException e) {
    System.out.println("错误码: " + e.getErrorCode());  // 400
    System.out.println("信息: " + e.getMessage());       // 年龄不能为负数
}
```

---

### 4. try-with-resources（Java 7+）

自动关闭实现了 `AutoCloseable` 的资源（文件、数据库连接等）。

```java
// ❌ 传统方式：需要手动关闭
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("test.txt"));
    String line = reader.readLine();
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (reader != null) {
        reader.close();  // 又可能抛异常
    }
}

// ✅ try-with-resources：自动关闭
try (BufferedReader reader = new BufferedReader(new FileReader("test.txt"))) {
    String line = reader.readLine();
    System.out.println(line);
} catch (IOException e) {
    System.out.println("读取失败: " + e.getMessage());
}
// reader 自动 close()，不需要 finally
```

> **前端理解**：类似于 Python 的 `with` 语句，或者 MDN 的 `using` 声明（Stage 3）。

---

## 二、I/O 操作

### 1. 读取文件

```java
import java.nio.file.*;
import java.io.*;
import java.util.List;

// ✅ 方式1：Files.readAllLines（最简单，推荐）
List<String> lines = Files.readAllLines(Paths.get("test.txt"));
lines.forEach(System.out::println);

// ✅ 方式2：Files.lines (Stream 风格)
try (Stream<String> stream = Files.lines(Paths.get("test.txt"))) {
    stream.filter(line -> line.contains("ERROR"))
          .forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}

// ✅ 方式3：读取全部内容为字符串
String content = Files.readString(Paths.get("test.txt"));
```

```javascript
// Node.js
const fs = require('fs');
const content = fs.readFileSync('test.txt', 'utf-8');
const lines = content.split('\n');
```

### 2. 写入文件

```java
// 写入
Files.writeString(Paths.get("output.txt"), "Hello, Java!");

// 写入多行
List<String> data = List.of("Line 1", "Line 2", "Line 3");
Files.write(Paths.get("output.txt"), data);

// 追加写入
Files.writeString(Paths.get("output.txt"), "Append content",
    StandardOpenOption.APPEND);
```

```javascript
// Node.js
fs.writeFileSync('output.txt', 'Hello, Node.js!');
fs.appendFileSync('output.txt', 'Append content');
```

### 3. 缓冲读取（大文件）

```java
// 大文件逐行读取（不一次性加载到内存）
try (BufferedReader reader = Files.newBufferedReader(Paths.get("bigfile.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        // 处理每一行
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

```javascript
// Node.js
const readline = require('readline');
// 使用 stream 逐行处理
```

---

## 三、文件与路径操作

```java
import java.nio.file.*;

// 检查文件
Path path = Paths.get("test.txt");
boolean exists = Files.exists(path);
boolean isFile = Files.isRegularFile(path);
boolean isDir = Files.isDirectory(path);
long fileSize = Files.size(path);          // 文件大小（字节）

// 创建目录
Files.createDirectories(Paths.get("a/b/c"));  // 创建多级目录

// 复制/移动/删除
Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
Files.move(source, target);
Files.delete(path);
Files.deleteIfExists(path);

// 列出目录
try (Stream<Path> files = Files.list(Paths.get("."))) {
    files.filter(Files::isRegularFile)
         .forEach(System.out::println);
}

// 遍历目录树
Files.walk(Paths.get("src"))
     .filter(Files::isRegularFile)
     .filter(p -> p.toString().endsWith(".java"))
     .forEach(System.out::println);
```

---

## 快速速查

| 场景 | Java | Node.js |
|------|------|---------|
| 读文件 | `Files.readString(path)` | `fs.readFileSync(path, 'utf-8')` |
| 写文件 | `Files.writeString(path, content)` | `fs.writeFileSync(path, content)` |
| 逐行读 | `Files.readAllLines(path)` | `content.split('\n')` |
| 追加写 | `Files.writeString(path, s, APPEND)` | `fs.appendFileSync(path, s)` |
| 检查存在 | `Files.exists(path)` | `fs.existsSync(path)` |
| 删除 | `Files.delete(path)` | `fs.unlinkSync(path)` |
| 创建目录 | `Files.createDirectories(path)` | `fs.mkdirSync(path, {recursive: true})` |
| 复制 | `Files.copy(src, dst)` | `fs.cpSync(src, dst)` |
| 遍历目录 | `Files.walk(path)` | `fs.readdirSync(path, {recursive: true})` |
