---
date: 2024-01-31
category:
  - javascript
tag:
  - this
  - call
  - apply
  - bind
sticky: 2
star: 2
---

# this

`this` 是函数运行时的上下文对象，**不由定义位置决定，而由调用方式决定**。通俗说：**谁调用函数，`this` 就指向谁**（箭头函数除外）。

## 1. this 的指向

函数执行时会在内部创建两个特殊变量：

- **arguments**：实参的类数组对象
- **this**：当前执行上下文中的 `this` 绑定

```js
function test() {
  console.log(this);
}

const objA = {
  a: test,
  b: {
    c: test,
  },
};

test();       // window（浏览器）/ global（Node）
objA.a();     // objA
objA.b.c();   // objA.b（只看直接调用者，不看外层对象）
```

::: tip 隐式丢失
把方法赋值给变量再调用，`this` 会丢失：

```js
const fn = objA.a;
fn(); // window，相当于独立调用
```

常见场景：`setTimeout(obj.method, 0)`、`[1,2].forEach(obj.method)`。
:::

## 2. 五种绑定规则

按优先级从高到低：

### ① new 绑定

`new` 调用构造函数时，`this` 指向新创建的实例。

```js
function Person(name) {
  this.name = name;
}
const p = new Person("Tom");
console.log(p.name); // Tom
```

### ② 显式绑定

`call` / `apply` / `bind` 第一个参数指定 `this`。

```js
function greet(city) {
  console.log(`${this.name} from ${city}`);
}
const user = { name: "Alice" };

greet.call(user, "Beijing");    // Alice from Beijing
greet.apply(user, ["Shanghai"]); // Alice from Shanghai
```

### ③ 隐式绑定

作为对象方法调用时，`this` 指向该对象（见上文 `objA.a()`）。

### ④ 默认绑定

独立函数调用，非严格模式下 `this` 为全局对象；严格模式下为 `undefined`。

```js
function foo() {
  "use strict";
  console.log(this); // undefined
}
foo();
```

### ⑤ 箭头函数

箭头函数**没有自己的 `this`**，捕获定义时外层作用域的 `this`（词法绑定），且无法用 `call` / `apply` / `bind` 改变。

```js
const obj = {
  name: "obj",
  getName: function () {
    return () => this.name; // this 来自 getName 的调用
  },
};

console.log(obj.getName()()); // obj

const standalone = () => this;
console.log(standalone()); // 外层是全局，浏览器中为 window
```

::: info 判断口诀
1. 是否 `new`？→ 实例  
2. 是否 `call/apply/bind`？→ 指定对象  
3. 是否 `obj.fn()`？→ `obj`  
4. 是否箭头函数？→ 看外层  
5. 否则 → 全局 / `undefined`（严格模式）
:::

## 3. call、apply、bind

三者都用来**动态改变 `this` 指向**，区别在参数传递和是否立即执行。

### call 与 apply

```js
function aaa(name, age) {
  this.name = name;
  this.age = age;
}

const objA = {};

// call：参数逐个传递
aaa.call(objA, "xiaoA", 23);
console.log(objA.name, objA.age); // xiaoA 23

// apply：参数放在数组里
aaa.apply(objA, ["xiaoB", 40]);
console.log(objA.name, objA.age); // xiaoB 40
```

**常见用途**：

```js
// 借用数组方法处理类数组
const args = Array.prototype.slice.call(arguments);

// 求数组最大值
Math.max.apply(null, [1, 5, 3]); // 5
```

### bind

`bind` 返回一个**绑定了 `this` 的新函数**，不会立即执行；还可预设部分参数（柯里化）。

```js
function greet(greeting, name) {
  console.log(`${greeting}, ${name}`);
}

const bound = greet.bind({ id: 1 }, "Hello");
bound("World"); // Hello, World
```

修复隐式丢失的典型写法：

```js
const obj = {
  name: "obj",
  say() {
    console.log(this.name);
  },
};

const say = obj.say.bind(obj);
setTimeout(say, 100); // obj
```

| 方法 | 是否立即执行 | 参数形式 | 返回值 |
|:-----|:------------|:---------|:-------|
| `call` | 是 | 逐个传参 | 函数执行结果 |
| `apply` | 是 | 数组传参 | 函数执行结果 |
| `bind` | 否 | 逐个传参（可预设） | 新函数 |

## 4. 常见场景

### 定时器与回调

```js
const obj = { name: "obj", log() { console.log(this.name); } };

setTimeout(obj.log, 0);              // undefined（默认绑定）
setTimeout(() => obj.log(), 0);      // obj
setTimeout(obj.log.bind(obj), 0);    // obj
```

### 数组方法回调

```js
const obj = {
  values: [1, 2, 3],
  print() {
    this.values.forEach(function (v) {
      // 非严格模式下 this 为 window/undefined
      console.log(v, this);
    });
    this.values.forEach((v) => {
      // 箭头函数继承 print 的 this → obj
      console.log(v, this.values);
    });
  },
};
obj.print();
```

### 类与 class 方法

```js
class Counter {
  count = 0;
  inc() {
    this.count++;
  }
}

const c = new Counter();
const inc = c.inc;
inc(); // 报错或行为异常，this 不是 c

const safeInc = c.inc.bind(c);
safeInc(); // 正常
```

类字段箭头函数可避免绑定问题（箭头函数作为实例属性）：

```js
class Counter {
  count = 0;
  inc = () => {
    this.count++;
  };
}
```

### 事件处理（浏览器）

```js
button.addEventListener("click", function () {
  console.log(this); // 触发事件的 DOM 元素
});

button.addEventListener("click", () => {
  console.log(this); // 外层作用域的 this，不是 button
});
```

## 5. 手写 call（理解原理）

```js
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx ?? globalThis;
  const key = Symbol();
  ctx[key] = this;           // 把函数挂到 ctx 上，形成隐式绑定
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};
```

本质：**把函数当作 `ctx` 的方法调用**，触发隐式绑定规则。

## 6. 速查

| 调用方式 | this 指向 |
|:---------|:----------|
| `fn()` | 全局 / `undefined`（严格模式） |
| `obj.fn()` | `obj` |
| `fn.call(ctx)` / `fn.apply(ctx)` | `ctx` |
| `new Fn()` | 新实例 |
| 箭头函数 | 定义时外层 `this` |
| DOM 事件 `function` 回调 | 触发元素 |
| `bind(ctx)()` | `ctx` |
