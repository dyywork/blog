# 创建对象

## 1.工厂模式

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

## 2.构造函数模式

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

## 3.原型模式
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

## 4.组合使用构造函数模式和原型模式
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

## 5.动态原型模式
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

## 6.寄生构造函数模式
```javascript

```
