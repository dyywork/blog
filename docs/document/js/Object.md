---
date: 2022-01-12
category:
  - javascript
tag:
  - Object
  - 面向对象
---

# 面向对象

::: tip

- 面向对象注重于抽象事物，而面向过程注重于叙述事物。
- 面向对象逻辑清晰有条理，而面向过程比较方面。
- JS 通过函数和原型，模拟了传统面向对象编程中类的概念实现了面向对象的编程模式。
- 面向对象的变成思想，主要为了实现3件事， 封装、继承、多态。
  :::

## 1.封装

```js
// 一个例子
function CreateObject(name) {
  // CreateObject 为构造函数
  this.name = name;
  this.eat = function () {
    console.log(this.name + " eat something");
  };
}
let objA = new CreateObject("A"); // 为构造函数的实例
let objB = new CreateObject("B"); // 为构造函数的实例
```

### 1.new 做了那些操作

```js
/*
 1. 创建一个空对象
 2. 将构造函数的prototype属性赋值给新对象的__proto__属性
 3. 将构造函数的this指向新对象
 4. 执行构造函数的代码
 5. 将新对象返回
*/

function ObjectTest(name) {
  this.name = name;
}

let objectA = new ObjectTest("A");
console.log(objectA.name); // A

let objectB = (function () {
  let obj = {};
  obj.__proto__ = ObjectTest.prototype;
  ObjectTest.call(obj, "B"); // 这里同时执行了第3、4步
  return obj;
})();

console.log(objectB.name); // B
```

## 2.继承

::: tip

- 在声明函数的时候，会自动创建一个prototype属性，我们管他叫做原型；（一般用来存放实例公用的方法）
- 在js里规定，访问对象属性的时候，如果对象下面没有这个属性，则去他下面的**proto**去寻找，如果还没有就一直向下寻找直到没有**proto**为止
  :::

### 1.类式继承

```js
function A(name) {
  this.name = name;
  this.list = [1, 2, 3];
}
A.prototype.getName = function () {
  console.log(this.name);
};

function SubA(name) {
  this.subName = "sub" + this.name;
}

SubA.prototype = new A();

const sa1 = new SubA("sa1");
console.log(sa1.list, sal.name); // [1,2,3] undefined

/*
 * SubA.prototype = new A()  ->  {
 *           name: undefined,
 *           list: [1,2,3],
 *           __porto__: {
 *               getName: functiong() {}
 *           }
 *       }
 *
 *   sa1 = new SubA('sa1') -> {
 *           subName: subsa1,
 *           __proto__: {
 *               name: undefined,
 *               list: [1,2,3],
 *               __porto__: {
 *                   getName: functiong() {}
 *               }
 *           }
 *       }
 *
 * */

// 类式继承的问题
// 1. 这种方式不支持父构造函数带参数
// 2. 父构造函数的所有属性和方法都变成了一个共有属性
```

### 2.构造函数继承

```js
function A(name) {
  this.name = name;
  this.list = [1, 2, 3];
}
A.prototype.getName = function () {
  console.log(this.name);
};

function SubA(name) {
  A.call(this, name);
  this.subName = "sub" + this.name;
}
let sa1 = new SubA("xiaoA");

console.log(sa1.name, sa1.subName);
sa1.getName(); // 报错

/*
 * sa1 = new SubA('xiaoA') -> {
 *       __proto: SubA.prototype,
 *       subName: 'sub xiaoA',
 *       name: 'xiaoA',
 *       list: [1,2,3]
 *   }
 *
 * */
// 构造函数继承问题
// 1. 不能继承父构造函数的原型方法
```

### 3.组合式继承

```js
function A(name) {
  this.name = name;
  this.list = [1, 2, 3];
}
A.prototype.getName = function () {
  console.log(this.name);
};

function SubA(name) {
  A.call(this, name);
  this.subName = "sub" + this.name;
}

SubA.prototype = new A();

let sa1 = new SubA("xiaoA");

console.log(sa1.name, sa1.subName);
sa1.getName();

/*
 *   new A() -> {
 *       name: undefined,
 *       list: [1,2,3],
 *       __proto__: {
 *           getName: fn
 *       }
 *   }
 *
 *   new SubA('xiaoA') -> {
 *       subName: 'sub xiaoA',
 *       name: 'xiaoA',
 *       list: [1,2,3]
 *       __proto__: {
 *           name: undefined,
 *           list: [1,2,3],
 *           __proto__: {
 *               getName: fn
 *           }
 *       }
 *   }
 *
 *
 * */

// 小问题
// 1. __proto__属性没有用
// 2. 父构造函数执行了两次
```

### 4.寄生组合式继承

```js
function A(name) {
  this.name = name;
  this.list = [1, 2, 3];
}
A.prototype.getName = function () {
  console.log(this.name);
};

function SubA(name) {
  A.call(this, name);
  this.subName = "sub" + this.name;
}

// SubA.prototype = new A();
function inheritPrototype(subClass, superClass) {
  function F() {}
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
}

inheritPrototype(subA, A);

let sa1 = new SubA("xiaoA");

console.log(sa1.name, sa1.subName);
```

## 3.多态

::: tip

- 表示不同对象调用相同方法会产生不同结果
  :::

```js
function Base() {}

Base.prototype.initial = function () {
  this.init();
};

function SubA() {
  this.init = function () {
    console.log("SubA init");
  };
}

function SubB() {
  this.init = function () {
    console.log("SubB init");
  };
}

SubA.prototype = new Base();
SubB.prototype = new Base();

let subA = new SubA();
let subB = new SubB();

subA.initial(); // 'SubA init'
subB.initial(); // 'SubB init'
```
