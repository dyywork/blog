# 面向对象

::: tip
- 面向对象注重于抽象事物，而面向过程注重于叙述事物。
- 面向对象逻辑清晰有条理，而面向过程比较方面。
- JS 通过函数和原型，模拟了传统面向对象编程中类的概念实现了面向对象的编程模式。
- 面向对象的变成思想，主要为了实现3件事， 封装、继承、多态。
:::

## 面向对象

### 1.封装

```js
// 一个例子
function CreateObject(name) { // CreateObject 为构造函数
    this.name = name;
    this.eat = function (){
        console.log(this.name + ' eat something')
    }
}

let objA = new CreateObject('A') // 为构造函数的实例
let objB = new CreateObject('B') // 为构造函数的实例

```


### 2.继承
- 在声明函数的时候，会自动创建一个prototype属性，我们管他叫做原型；（一般用来存放实例公用的方法）


### 3.多态
### 


## 创建对象

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
    this.name = name
}

let objectA = new ObjectTest('A')
console.log(objectA.name) // A

let objectB = (function (){
    let obj = {};
    obj.__proto__ = ObjectTest.prototype;
    ObjectTest.call(obj, 'B') // 这里同时执行了第3、4步
    return obj
})()

console.log(objectB.name) // B

```

### 2.工厂模式

```javascript
function objectFun(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name)
    }
    return o;
}
let objectOne = objectFun("张三", 12, "前端")
let objectTwo = objectFun("李四", 22, "后端")

objectOne.sayName() // "张三"
objectTwo.sayName() // "李四"
```

### 3.构造函数模式

```javascript
function Factory(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.getName = function () {
        console.log(this.name)
    }
}
let factoryOne = new Factory('张三', 12, '前端')
let factoryTwo = new Factory('李四', 12, '后端')

factoryOne.getName() // 张三
factoryTwo.getName() // 李四
```
注：  
1.没有显式地创建对象；  
2.直接将属性和方法赋给了this对象；  
3.没有return语句。  
(构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。)  
(1) 创建一个新对象；  
(2)将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；  
(3)执行构造函数中的代码（为这个新对象添加属性）；  
(4)返回新对象。  
(factoryOne 和 factoryTwo 分别保存这 Factory的一个不同的实例。这两个对象都有一个constructor（构造函数）属性，该属性指向Factory)

### 4.原型模式
```javascript
function Person(){
    
}
Person.prototype.name = "lisi"
Person.prototype.age = 12
Person.prototype.sayName = function (){
    console.log(this.name);
}
let person1 = new Person();
person1.sayName()
```

### 5.组合使用构造函数模式和原型模式
```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job - job;
    this.friends = [1, 2]
}
Person.prototype = {
    constructor: Person,
    sayName: function () {
        console.log(this.name);
    }
}
```

### 6.动态原型模式
```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job
    
    if (typeof this.sayName != 'function') {
        Person.prototype.sayName = function () {
            console.log(this.name);
        }
    }
}
```

### 7.寄生构造函数模式
```javascript
test 
dev
```
