---
date: 2026-06-29
category:
  - java
tag:
  - 集合框架
  - Collections
  - 前端转Java
---

# Java 集合框架（对比 JavaScript）

## 概览：JS 集合 vs Java 集合

| 场景 | JavaScript | Java | 说明 |
|------|-----------|------|------|
| 动态数组 | `Array` | `ArrayList` | 最常用 |
| 链表 | ❌ | `LinkedList` | 插入/删除快 |
| 集合(去重) | `Set` | `HashSet` | 都一样 |
| 有序集合 | ❌ | `TreeSet` | 自动排序 |
| 键值对 | `Map` | `HashMap` | 都一样 |
| 有序 Map | ❌ | `LinkedHashMap` | 按插入顺序 |
| 队列 | `Array` (模拟) | `Queue` / `Deque` | BFS 必备 |
| 栈 | `Array` (模拟) | `Deque` (ArrayDeque) | DFS 用 |
| 不可变 | `Object.freeze` | `List.of()`, `Collections.unmodifiableList()` | - |

---

## 1. List — 动态数组

### ArrayList（最常用，≈ JS 数组）

```java
import java.util.ArrayList;
import java.util.List;

// 创建
List<String> list = new ArrayList<>();

// 增删改查
list.add("Apple");           // 添加
list.add("Banana");
list.add(0, "First");        // 指定位置插入
list.get(0);                 // 取值 → "First"
list.set(1, "Orange");       // 修改
list.remove(0);              // 按索引删除
list.remove("Orange");       // 按对象删除
list.size();                 // 长度（不是 .length！）
list.contains("Apple");      // 是否包含
list.isEmpty();              // 是否为空
list.clear();                // 清空

// 遍历
for (String item : list) {
    System.out.println(item);
}

// forEach (Lambda)
list.forEach(item -> System.out.println(item));
list.forEach(System.out::println);  // 方法引用
```

```javascript
// JavaScript
const list = [];
list.push("Apple");
list.unshift("First");
list[0];
list[1] = "Orange";
list.splice(0, 1);         // 删除
list.includes("Apple");
list.length;
```

> **前端理解**：`ArrayList` ≈ JS 的 `Array`。JS 数组更灵活（可以混装类型），Java 的 `ArrayList` 通过泛型约束类型。

### LinkedList

```java
// 双向链表：插入/删除头部快
List<String> linkedList = new LinkedList<>();
linkedList.add("A");
linkedList.add(0, "First");  // 头部插入 O(1)

// 也可以当队列/栈用
Queue<String> queue = new LinkedList<>();
queue.offer("A");    // 入队
queue.poll();        // 出队
queue.peek();        // 看队首不移除

Deque<String> stack = new LinkedList<>();
stack.push("A");     // 入栈
stack.pop();         // 出栈
```

---

## 2. Set — 集合（去重）

```java
import java.util.HashSet;
import java.util.Set;

Set<String> set = new HashSet<>();

set.add("Apple");
set.add("Banana");
set.add("Apple");     // 重复，不会添加

set.size();            // 2
set.contains("Apple"); // true
set.remove("Apple");
set.clear();

// 遍历
for (String item : set) {
    System.out.println(item);
}
```

```javascript
// JavaScript
const set = new Set();
set.add("Apple");
set.add("Banana");
set.size;
set.has("Apple");
```

> **前端理解**：`HashSet` ≈ JS 的 `Set`，用法几乎一样。

---

## 3. Map — 键值对

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> map = new HashMap<>();

// 增删改查
map.put("Apple", 5);
map.put("Banana", 3);
map.put("Orange", 8);

map.get("Apple");           // 5
map.getOrDefault("Pear", 0); // 不存在返回默认值 0
map.containsKey("Apple");   // true
map.containsValue(5);       // true
map.size();                 // 3
map.remove("Apple");

// 遍历
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    String key = entry.getKey();
    Integer value = entry.getValue();
    System.out.println(key + " = " + value);
}

// forEach (Lambda)
map.forEach((key, value) -> System.out.println(key + " = " + value));

// 获取所有 key / value
Set<String> keys = map.keySet();
Collection<Integer> values = map.values();
```

```javascript
// JavaScript
const map = new Map();
map.set("Apple", 5);
map.get("Apple");
map.has("Apple");
map.size;

for (const [key, value] of map) {
    console.log(key, value);
}
```

> **前端理解**：`HashMap` ≈ JS 的 `Map`。注意 Java 用 `put`/`get`，JS 用 `set`/`get`。

---

## 4. 常用算法对比

### 排序

```java
// Java
List<Integer> nums = new ArrayList<>(List.of(3, 1, 4, 1, 5));
Collections.sort(nums);                    // 升序 [1, 1, 3, 4, 5]
Collections.sort(nums, Collections.reverseOrder());  // 降序
nums.sort(Comparator.naturalOrder());      // List.sort() 方式
nums.sort((a, b) -> b - a);                // Lambda：降序
```

```javascript
// JavaScript
const nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b);  // 升序
nums.sort((a, b) => b - a);  // 降序
```

### 查找最大值

```java
// Java
List<Integer> nums = List.of(3, 1, 4, 1, 5);
int max = Collections.max(nums);
int min = Collections.min(nums);
```

```javascript
// JavaScript
const nums = [3, 1, 4, 1, 5];
const max = Math.max(...nums);
const min = Math.min(...nums);
```

### 数组转换

```java
// List → Array
List<String> list = List.of("A", "B", "C");
String[] arr = list.toArray(new String[0]);

// Array → List
String[] arr = {"A", "B", "C"};
List<String> list = Arrays.asList(arr);
List<String> mutableList = new ArrayList<>(Arrays.asList(arr));
```

```javascript
// JavaScript
const set = new Set(["A", "B", "C"]);
const arr = [...set];
const list = Array.from(set);
```

---

## 5. 创建不可变集合

```java
// Java 9+ 工厂方法（推荐）
List<String> list = List.of("A", "B", "C");      // 不可变！
Set<String> set = Set.of("A", "B", "C");          // 不可变！
Map<String, Integer> map = Map.of("A", 1, "B", 2); // 不可变！

// 尝试修改会抛 UnsupportedOperationException
list.add("D");  // ❌ 运行时异常
```

```javascript
// JavaScript
const arr = Object.freeze(["A", "B", "C"]);  // 浅冻结
```

---

## 快速速查

| 操作 | Java `ArrayList` | JS `Array` |
|------|-----------------|------------|
| 创建 | `new ArrayList<>()` | `[]` |
| 追加 | `add(e)` | `push(e)` |
| 头插 | `add(0, e)` | `unshift(e)` |
| 读取 | `get(i)` | `arr[i]` |
| 修改 | `set(i, e)` | `arr[i] = e` |
| 删除 | `remove(i)` | `splice(i, 1)` |
| 长度 | `size()` | `length` |
| 包含 | `contains(e)` | `includes(e)` |
| 清空 | `clear()` | `length = 0` |
| forEach | `forEach(fn)` | `forEach(fn)` |
| 排序 | `sort(cmp)` | `sort(cmp)` |
