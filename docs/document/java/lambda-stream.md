---
date: 2026-06-29
category:
  - java
tag:
  - Lambda
  - Stream
  - 函数式编程
  - 前端转Java
---

# Lambda & Stream API（对比 JavaScript 数组方法）

## 为什么说这是前端的「舒适区」？

Java Stream API 和 JS 数组方法（`map`/`filter`/`reduce`）的思想**几乎完全一致**。如果熟悉 JS 的函数式编程，这部分会非常容易上手。

---

## 1. Lambda 表达式（≈ JS 箭头函数）

```java
// Java Lambda 语法
// (参数) -> { 方法体 }

// 单行可以省略 {} 和 return
(参数) -> 表达式

// 示例
(int x, int y) -> x + y           // 两个参数
(String name) -> System.out.println(name)  // 一个参数，无返回值
() -> Math.random()                // 无参数
x -> x * 2                         // 单个参数可省略 ()
```

```javascript
// JavaScript 箭头函数
(x, y) => x + y
name => console.log(name)
() => Math.random()
x => x * 2
```

> **区别**：Java 用 `->`，JS 用 `=>`。Java 的 Lambda 实际上是函数式接口的实例（`@FunctionalInterface`）。

### 函数式接口一览

```java
// 几个内置的函数式接口（类似 JS 回调的类型签名）
@FunctionalInterface
public interface Consumer<T> {    // (T) → void
    void accept(T t);
}

@FunctionalInterface
public interface Function<T, R> {  // (T) → R
    R apply(T t);
}

@FunctionalInterface
public interface Predicate<T> {    // (T) → boolean
    boolean test(T t);
}

@FunctionalInterface
public interface Supplier<T> {     // () → T
    T get();
}
```

```typescript
// TypeScript 版本
type Consumer<T> = (t: T) => void;
type Function<T,R> = (t: T) => R;
type Predicate<T> = (t: T) => boolean;
type Supplier<T> = () => T;
```

---

## 2. Stream 入门 — 最核心的三个方法

```java
import java.util.List;
import java.util.stream.Collectors;

List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

// filter ≈ JS filter
List<Integer> even = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
// 结果: [2, 4, 6]

// map ≈ JS map
List<String> mapped = numbers.stream()
    .map(n -> "Number: " + n)
    .collect(Collectors.toList());
// 结果: ["Number: 1", "Number: 2", ...]

// reduce ≈ JS reduce
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);
// 结果: 21
```

```javascript
// JavaScript
const numbers = [1, 2, 3, 4, 5, 6];

const even = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]

const mapped = numbers.map(n => `Number: ${n}`);
// ["Number: 1", "Number: 2", ...]

const sum = numbers.reduce((a, b) => a + b, 0);
// 21
```

---

## 3. 完整操作对照

### 准备数据

```java
// Java 实体类
public class Student {
    private String name;
    private int age;
    private String grade;
    private int score;

    // 构造器、getter/setter 省略
    // 实际用 IDEA 的 @Data 注解(Lombok) 或 record
}

// 数据
List<Student> students = List.of(
    new Student("小明", 18, "A", 92),
    new Student("小红", 17, "B", 85),
    new Student("小刚", 19, "A", 78),
    new Student("小丽", 18, "A", 95),
    new Student("小华", 17, "B", 65)
);
```

### 过滤 + 映射（filter-map 链式调用）

```java
// Java：找出A班成绩≥80的学生，只取名字
List<String> topAStudents = students.stream()
    .filter(s -> "A".equals(s.getGrade()))       // Stream<Student>
    .filter(s -> s.getScore() >= 80)              // Stream<Student>
    .map(Student::getName)                         // Stream<String>
    .collect(Collectors.toList());                 // List<String>
// 结果: ["小明", "小丽"]
```

```javascript
// JavaScript
const topAStudents = students
    .filter(s => s.grade === "A")
    .filter(s => s.score >= 80)
    .map(s => s.name);
// ["小明", "小丽"]
```

### 排序

```java
// Java
List<Student> sorted = students.stream()
    .sorted(Comparator.comparing(Student::getScore))      // 升序
    .collect(Collectors.toList());

List<Student> sortedDesc = students.stream()
    .sorted(Comparator.comparing(Student::getScore).reversed())  // 降序
    .collect(Collectors.toList());

// 多字段排序：先按班级，再按分数降序
List<Student> multiSort = students.stream()
    .sorted(Comparator
        .comparing(Student::getGrade)
        .thenComparing(Comparator.comparing(Student::getScore).reversed())
    ).collect(Collectors.toList());
```

```javascript
// JavaScript
students.toSorted((a, b) => a.score - b.score);
students.toSorted((a, b) => b.score - a.score);
students.toSorted((a, b) => {
    if (a.grade !== b.grade) return a.grade.localeCompare(b.grade);
    return b.score - a.score;
});
```

### 分组

```java
// Java：按班级分组 (≈ JS groupBy)
Map<String, List<Student>> byGrade = students.stream()
    .collect(Collectors.groupingBy(Student::getGrade));

// 按班级分组，每个组只存名字
Map<String, List<String>> namesByGrade = students.stream()
    .collect(Collectors.groupingBy(
        Student::getGrade,
        Collectors.mapping(Student::getName, Collectors.toList())
    ));
```

```javascript
// JavaScript
const byGrade = Object.groupBy(students, s => s.grade);
// 或 reduce:
students.reduce((acc, s) => {
    (acc[s.grade] ??= []).push(s.name);
    return acc;
}, {});
```

### 统计

```java
// Java
// 基础统计
long count = students.stream().count();
int sum = students.stream().mapToInt(Student::getScore).sum();
double avg = students.stream().mapToInt(Student::getScore).average().orElse(0);
int max = students.stream().mapToInt(Student::getScore).max().orElse(0);

// 一键统计
IntSummaryStatistics stats = students.stream()
    .mapToInt(Student::getScore)
    .summaryStatistics();
stats.getSum();
stats.getAverage();
stats.getMax();
stats.getMin();
stats.getCount();
```

```javascript
// JavaScript
const count = students.length;
const scores = students.map(s => s.score);
const sum = scores.reduce((a, b) => a + b, 0);
const avg = sum / scores.length;
const max = Math.max(...scores);
```

### 扁平化

```java
// Java：flatMap ≈ JS flatMap
List<List<Integer>> nested = List.of(
    List.of(1, 2), List.of(3, 4), List.of(5, 6)
);

List<Integer> flat = nested.stream()
    .flatMap(List::stream)
    .collect(Collectors.toList());
// 结果: [1, 2, 3, 4, 5, 6]
```

```javascript
// JavaScript
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.flatMap(x => x);    // 或 .flat()
// [1, 2, 3, 4, 5, 6]
```

---

## 4. 短路操作

```java
// anyMatch ≈ JS some
boolean hasFail = students.stream()
    .anyMatch(s -> s.getScore() < 60);

// allMatch ≈ JS every
boolean allPass = students.stream()
    .allMatch(s -> s.getScore() >= 60);

// noneMatch ≈ JS every(!predicate)
boolean allAbove50 = students.stream()
    .noneMatch(s -> s.getScore() <= 50);

// findFirst / findAny
Student first = students.stream()
    .filter(s -> s.getScore() > 90)
    .findFirst()
    .orElse(null);
```

```javascript
// JavaScript
const hasFail = students.some(s => s.score < 60);
const allPass = students.every(s => s.score >= 60);
const first90 = students.find(s => s.score > 90);
```

---

## 5. 常用 Stream 操作速查

| 场景 | Java Stream | JavaScript |
|------|-------------|------------|
| 遍历 | `stream().forEach(System.out::println)` | `forEach(console.log)` |
| 过滤 | `filter(x -> x > 0)` | `filter(x => x > 0)` |
| 映射 | `map(x -> x * 2)` | `map(x => x * 2)` |
| 归约 | `reduce(0, (a,b) -> a + b)` | `reduce((a,b) => a+b, 0)` |
| 去重 | `distinct()` | `new Set(arr)` |
| 排序 | `sorted()` | `toSorted()` |
| 跳过 | `skip(n)` | `slice(n)` |
| 限制 | `limit(n)` | `slice(0, n)` |
| 扁平化 | `flatMap(List::stream)` | `flatMap(x => x)` |
| 最大值 | `max(Comparator.naturalOrder())` | `Math.max(...arr)` |
| 转列表 | `collect(Collectors.toList())` | `Array.from()` |
| 转 Map | `collect(Collectors.toMap(k, v))` | `Object.fromEntries()` |
| 分组 | `collect(Collectors.groupingBy(f))` | `Object.groupBy(arr, f)` |
| 拼接 | `collect(Collectors.joining(", "))` | `arr.join(", ")` |
