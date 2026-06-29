---
date: 2026-06-29
category:
  - java
tag:
  - 语法基础
  - 类型系统
  - 前端转Java
---

# Java 基础语法（对比 JavaScript）

## 1. Hello World

```java
// Java: 一切皆类
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```javascript
// JavaScript: 直接运行
console.log("Hello, World!");
```

**关键差异**：
- Java 必须有 `class` 包裹，JS 可以直接写
- Java 入口必须是 `public static void main(String[] args)`
- Java 用 `System.out.println()`，JS 用 `console.log()`
- Java 文件名必须和 public class 名称一致

---

## 2. 变量声明与类型

### 基本类型对比

| Java 类型 | 说明 | JS 对应 | 内存 |
|-----------|------|---------|------|
| `int` | 32 位整数 | `Number` (整数) | 栈 |
| `long` | 64 位整数 | `BigInt` | 栈 |
| `double` | 64 位浮点数 | `Number` | 栈 |
| `boolean` | 布尔值 | `Boolean` | 栈 |
| `char` | 单个字符 | `String[0]` | 栈 |
| `String` | 字符串(对象) | `String` | 堆 |

### 声明方式

```java
// Java: 类型在前，名称在后
int age = 25;
String name = "小明";
double price = 19.99;
boolean isActive = true;
final double PI = 3.14;  // const 等效

// Java 10+ 可以用 var 自动推断类型
var message = "hello";   // 编译器推断为 String
```

```javascript
// JavaScript: 灵活声明
let age = 25;
const name = "小明";
var price = 19.99;       // 不推荐
```

> **前端理解**：Java 的类型写在变量名前，类似 TypeScript 的类型注解 `let age: number = 25`，但 Java 是编译时强制检查，没有 `any` 逃生舱。

---

## 3. 控制流

```java
// if-else (和 JS 几乎一样)
if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}

// switch (Java 14+ 支持箭头语法)
switch (day) {
    case 1, 2, 3, 4, 5 -> System.out.println("工作日");
    case 6, 7 -> System.out.println("周末");
    default -> System.out.println("无效");
}

// for 循环
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// 增强 for-each（类似 JS for...of）
String[] names = {"A", "B", "C"};
for (String name : names) {
    System.out.println(name);
}

// while (和 JS 完全一样)
while (count < 10) {
    count++;
}
```

---

## 4. 数组

```java
// Java 数组：长度固定，类型统一
int[] numbers = new int[5];           // [0, 0, 0, 0, 0]
int[] scores = {90, 85, 95};          // 初始化
String[] names = {"Alice", "Bob"};

names.length;         // 2 (属性，不是方法)
names[0];             // "Alice"

// JS 数组：长度可变，类型可以混用
const arr = [1, "hello", true];
arr.length;           // 3
arr.push(4);          // Java 数组不支持 push！
```

> **注意**：Java 数组不是动态的，要动态集合用 `ArrayList`（见后文）。

---

## 5. 方法定义

```java
// Java: 访问修饰符 + 返回类型 + 方法名 + 参数
public class Calculator {
    // 静态方法（类似 JS 的 static）
    public static int add(int a, int b) {
        return a + b;
    }

    // 实例方法
    public String greet(String name) {
        return "Hello, " + name;
    }

    // void 表示无返回值
    public void log(String message) {
        System.out.println(message);
    }
}

// 调用
int sum = Calculator.add(1, 2);
```

```javascript
// JavaScript
function add(a, b) {
    return a + b;
}

class Calculator {
    static add(a, b) { return a + b; }
    greet(name) { return `Hello, ${name}`; }
}
```

---

## 6. 字符串操作

```java
String str = "Hello, Java!";

str.length();                    // 12 (方法，不是属性)
str.charAt(0);                   // 'H'
str.substring(0, 5);             // "Hello"
str.contains("Java");            // true
str.replace("Java", "World");   // "Hello, World!"
str.split(", ");                 // ["Hello", "Java!"]
str.toUpperCase();               // "HELLO, JAVA!"
str.trim();                      // 去空格
"hello %s, age %d".formatted(name, age);  // 字符串模板
```

> **对比 JS**：Java 的 `String.length()` 是方法，JS 的 `.length` 是属性。Java 用 `+` 拼接字符串会有性能问题（不可变），大量拼接用 `StringBuilder`。

---

## 7. null 与 Optional

```java
// Java 的 null ≈ JS 的 null
String name = null;

// 但 Java 没有「undefined」的概念
// 访问 null 的方法会抛 NullPointerException (NPE)
name.length();  // ❌ NullPointerException

// Java 8+ 用 Optional 避免 NPE
Optional<String> optional = Optional.ofNullable(name);
optional.ifPresent(System.out::println);   // 有值才打印
String result = optional.orElse("默认值");  // 提供默认值
```

```javascript
// JavaScript 既有 null 也有 undefined
let name = null;
let age;       // undefined
name?.length;  // 可选链操作符，安全访问
```

---

## 快速速查

| 场景 | Java | JavaScript |
|------|------|------------|
| 声明变量 | `int x = 1;` | `let x = 1;` |
| 常量 | `final int X = 1;` | `const X = 1;` |
| 打印 | `System.out.println()` | `console.log()` |
| 模板字符串 | `"hello %s".formatted(name)` | `` hello ${name} `` |
| 数组长度 | `.length` (属性) | `.length` (属性) |
| 字符串长度 | `.length()` (方法) | `.length` (属性) |
| forEach | `for (T item : list)` | `for (const item of arr)` |
| 三目运算 | `a > b ? a : b` | `a > b ? a : b` |
| 相等判断 | `equals()` | `===` |
