---
date: 2026-06-29
category:
  - java
tag:
  - 面向对象
  - OOP
  - 前端转Java
---

# Java 面向对象编程（对比 JavaScript）

## 1. Class 定义对比

```java
// Java
public class Person {
    // 字段 (Field)
    private String name;
    private int age;

    // 构造器 (Constructor)
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 方法 (Method)
    public void sayHello() {
        System.out.println("你好，我是" + name);
    }

    // Getter / Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

// 使用
Person p = new Person("小明", 25);
p.sayHello();
```

```javascript
// JavaScript (ES6+)
class Person {
    // 构造器
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // 方法
    sayHello() {
        console.log(`你好，我是${this.name}`);
    }

    // Getter / Setter
    get name() { return this.name; }
    set name(val) { this.name = val; }
}

// 使用
const p = new Person("小明", 25);
p.sayHello();
```

> **关键差异**：
> - Java 字段需要声明类型（`private String name`），JS 不需要
> - Java 有访问修饰符 `private`/`public`/`protected`，JS 用 `#` 表示私有（ES2022）
> - Java 方法名和字段名不能同名（getter/setter 是独立方法），JS 可以用 `get`/`set` 关键字
> - Java 需要写很多样板代码（IDE 如 IntelliJ 可以自动生成）

---

## 2. 访问修饰符

| 修饰符 | 同类 | 同包 | 子类 | 全局 |
|--------|------|------|------|------|
| `private` | ✅ | ❌ | ❌ | ❌ |
| default (不写) | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

```java
public class Example {
    private int a;    // 仅本类
    int b;            // 本包可见
    protected int c;  // 包 + 子类
    public int d;     // 全部可见
}
```

> **前端理解**：Java 的 `private` ≈ JS 的 `#` 字段，`public` ≈ JS 默认。TS 的 `private`/`public` 只是编译时检查，Java 是 JVM 级别强制。

---

## 3. 继承

```java
// 父类
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void makeSound() {
        System.out.println("动物发出声音");
    }
}

// 子类：Java 用 extends，单继承
public class Dog extends Animal {
    public Dog(String name) {
        super(name);  // 调用父类构造器
    }

    @Override  // 注解：重写父类方法
    public void makeSound() {
        System.out.println(name + "说：汪汪！");
    }

    public void fetch() {
        System.out.println(name + "在接飞盘");
    }
}

// 使用
Dog dog = new Dog("旺财");
dog.makeSound();  // 旺财说：汪汪！
dog.fetch();      // 旺财在接飞盘
```

```javascript
// JavaScript
class Animal {
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        console.log("动物发出声音");
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    makeSound() {
        console.log(`${this.name}说：汪汪！`);
    }
    fetch() {
        console.log(`${this.name}在接飞盘`);
    }
}
```

> **关键差异**：
> - Java **单继承**（一个类只能 extends 一个父类）。JS 也只能 extends 一个，但可以通过 Mixin 模拟多继承
> - Java 必须显式调用 `super()`（如果父类没有无参构造器）
> - Java 用 `@Override` 注解标记重写（可选但推荐）
> - Java 所有类默认继承 `Object` 类（类似 JS 原型链终点是 `Object.prototype`）

---

## 4. 接口 (Interface)

```java
// Java 接口：定义契约（类似 TS 的 interface）
public interface Flyable {
    void fly();    // 接口方法默认 public abstract
}

public interface Swimmable {
    void swim();
}

// 一个类可以实现多个接口（弥补单继承的局限）
public class Duck extends Animal implements Flyable, Swimmable {
    public Duck(String name) {
        super(name);
    }

    @Override
    public void fly() {
        System.out.println(name + "在飞");
    }

    @Override
    public void swim() {
        System.out.println(name + "在游泳");
    }
}
```

```typescript
// TypeScript 的 interface（JS 没有）
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class Duck extends Animal implements Flyable, Swimmable {
    fly() { console.log(`${this.name}在飞`); }
    swim() { console.log(`${this.name}在游泳`); }
}
```

> **前端理解**：Java 的 `interface` 更像 TS 的 `interface`，而不是 JS 的概念。Java 接口只定义方法签名，不包含实现（Java 8+ 允许 `default` 方法）。

---

## 5. 抽象类 (Abstract Class)

```java
// 抽象类：不能实例化，可以包含实现
public abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    // 抽象方法：子类必须实现
    public abstract double getArea();

    // 普通方法：子类继承
    public void display() {
        System.out.println(color + "形状，面积：" + getArea());
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}
```

> **前端理解**：JS 没有 `abstract` 关键字。可以通过 `new.target` 模拟禁止实例化，或者在方法中 `throw new Error('必须实现')`。Java 的抽象类 ≈ 介于 interface 和普通 class 之间的东西。

---

## 6. 静态成员

```java
public class MathUtils {
    public static final double PI = 3.14159;  // 静态常量

    public static int add(int a, int b) {
        return a + b;
    }

    // 静态内部类
    public static class Config {
        public static final String VERSION = "1.0";
    }
}

// 使用：直接通过类名访问
MathUtils.add(1, 2);
MathUtils.PI;
MathUtils.Config.VERSION;
```

```javascript
// JavaScript
class MathUtils {
    static PI = 3.14159;
    static add(a, b) { return a + b; }
}

MathUtils.add(1, 2);
```

---

## 7. 枚举 (Enum)

```java
// Java 枚举是真正的类型
public enum Status {
    PENDING,     // 待处理
    PROCESSING,  // 处理中
    COMPLETED,   // 已完成
    FAILED       // 失败
}

// 使用
Status s = Status.PENDING;

switch (s) {
    case PENDING -> System.out.println("待处理");
    case COMPLETED -> System.out.println("已完成");
    default -> System.out.println("其他");
}
```

```javascript
// JavaScript 没有原生枚举，常用 Object.freeze 模拟
const Status = Object.freeze({
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
});
```

> **前端理解**：Java 的 `enum` 比 JS 模拟的枚举强很多——它可以是类型安全的、可以带字段和方法、可以用在 `switch` 中。

---

## 总结对比

| 概念 | Java | JavaScript |
|------|------|------------|
| 类定义 | `public class Foo {}` | `class Foo {}` |
| 构造器 | 名同类名 | `constructor()` |
| 私有字段 | `private` 关键字 | `#` 前缀 (ES2022) |
| 继承 | `extends` (单继承) | `extends` (单继承) |
| 多实现 | `implements A, B` | ❌ (Mixin 模式) |
| 接口 | `interface` | TS only |
| 抽象类 | `abstract class` | ❌ |
| 枚举 | `enum` | `Object.freeze` 模拟 |
| 静态 | `static` | `static` |
| final/const | `final` | `const` |
