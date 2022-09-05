---
icon: edit
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
function CreateObject(name) { // CreateObject 为构造函数
    this.name = name;
    this.eat = function (){
        console.log(this.name + ' eat something')
    }
}
let objA = new CreateObject('A') // 为构造函数的实例
let objB = new CreateObject('B') // 为构造函数的实例

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

## 2.继承
::: tip
- 在声明函数的时候，会自动创建一个prototype属性，我们管他叫做原型；（一般用来存放实例公用的方法）
- 在js里规定，访问对象属性的时候，如果对象下面没有这个属性，则去他下面的__proto__去寻找，如果还没有就一直向下寻找直到没有__proto__为止
:::
### 1.类式继承

```js
function A(name) {
    this.name = name;
    this.list = [1,2,3];
}
A.prototype.getName = function () {
    console.log(this.name);
}

function SubA(name) {
    this.subName = 'sub' + this.name;
}

SubA.prototype = new A();

const sa1 = new SubA('sa1')
console.log(sa1.list, sal.name) // [1,2,3] undefined

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
    this.list = [1,2,3];
}
A.prototype.getName = function () {
    console.log(this.name);
}

function SubA(name) {
    A.call(this, name)
    this.subName = 'sub' + this.name;
}
let sa1 = new SubA('xiaoA')

console.log(sa1.name, sa1.subName)
sa1.getName() // 报错

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
    this.list = [1,2,3];
}
A.prototype.getName = function () {
    console.log(this.name);
}

function SubA(name) {
    A.call(this, name)
    this.subName = 'sub' + this.name;
}

SubA.prototype = new A();

let sa1 = new SubA('xiaoA')

console.log(sa1.name, sa1.subName)
sa1.getName()

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
    this.list = [1,2,3];
}
A.prototype.getName = function () {
    console.log(this.name);
}

function SubA(name) {
    A.call(this, name)
    this.subName = 'sub' + this.name;
}

// SubA.prototype = new A();
function inheritPrototype(subClass, superClass) {
    function F() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F()
    subClass.prototype.constructor = subClass;
}

inheritPrototype(subA, A)

let sa1 = new SubA('xiaoA')

console.log(sa1.name, sa1.subName)
```


## 3.多态

::: tip
- 表示不同对象调用相同方法会产生不同结果
:::

```js
function Base() {}

Base.prototype.initial = function () {
    this.init()
}

function SubA () {
    this.init = function () {
        console.log('SubA init');
    }
}

function SubB () {
    this.init = function () {
        console.log('SubB init');
    }
}

SubA.prototype = new Base();
SubB.prototype = new Base();

let subA = new SubA();
let subB = new SubB();

subA.initial() // 'SubA init'
subB.initial() // 'SubB init'


```


## 创建对象(设计模式)

### 1.工厂模式

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

/*
* factoryOne = new Factory('张三', 12, '前端') -> {
*       name: '张三',
*       age: 12,
*       job: '前端',
*       getName: fn()
*       __proto__: Factory.prototype
* }
* factoryOne = new Factory('李四', 12, '李四') -> {
*       name: '李四',
*       age: 12,
*       job: '李四',
*       getName: fn()
*       __proto__: Factory.prototype
* }
* 
* */
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
function Person(name){
    this.name = name
}
Person.prototype.name = "lisi"
Person.prototype.age = 12
Person.prototype.sayName = function (){
    console.log(this.name);
}
let person1 = new Person('张三');
person1.sayName() 

/*
* person1 = new Person() -> {
*       name: '张三',
*       __proto__: {
*           name: 'lisi',
*           age: 12,
*           sayName: fn()
*       }
*   }
*   
* */

```

### 5.组合使用构造函数模式和原型模式
```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
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

### 7.链模式

::: tip
链模式是实现链式调用的主要方法，通过在自身方法中返回自身的方式，在一个对象连续多次调用自身方法是可以简化写法。
这种链式调用在在开发多库和框架如jquery/zepto 中频繁被使用
:::
```javascript
let obj = {
    a: function () {
        console.log('aaa')
				return this
		},
		b: function (){
        console.log('bbb')
				return this
		}
}

obj.a().b() // aaa  bbb
```
### 委托模式
::: tip
当多个对象要处理同一请求时，可以将这些请求交由另一个对象统一处理 (事件代理)
:::

```js

```

### 数据访问对象模式
::: tip
- 数据访问对象模式主要是用来抽象和封装一个对象来对数据源进行访问和储存，这样可以方便对数据的管理，以及避免数据间的重复，覆盖等问题出现。
:::

### 等待者模式
::: tip
- 通过对多个异步进程的监听，对未来事件进行统一管理
:::
### MVC模式
::: tip
- MVC是由三个单词的首字符组成的：分别是模型model、 视图view、 控制器controller
- 他是一种是使用业务逻辑，数据，视图进行分离的方式来组织架构代码的一种模式
:::
```js
 var MVC = {}
    MVC.model = (function() {
        var data = {
            side:[{
                title: 'side1',
                url: './a.html'
            },{
                title: 'side2',
                url: './b.html'
            },{
                title: 'side3',
                url: './c.html'
            },]
        }
        return {
            getData(key) {
                return data[key];
            },
            setData(key, value){
                data[key] = value
                MVC.view('createHtml')
            }
        }
    })()

    MVC.view = (function(){
        var m = MVC.model
        var view = {
            createHtml: function() {
                var list = m.getData('side')
                var html = "<ul>";
                for(var i = 0; i< list.length; i++) {
                    html += "<li><a href='"+ list[i].url +"'>"+ list[i].title +"</a></li>"
                }
                html +='</ul>';
                document.querySelector('body').innerHTML = html;
            }
        }
        return function(v){
            view[v]()
        };
    })()
    MVC.ctrl = (function(){
        var v = MVC.view
        var m = MVC.model
        var c = {
            init: function() {
                v('createHtml')
            },
            updateHtml() {
                m.setData('side', [{title: 'new Side', url: './adf.html'}])
            }
        }
        return c;
    })()
    window.onload=function() {
        MVC.ctrl.init()
        setTimeout(function() {
            MVC.ctrl.updateHtml()
        }, 3000)
    }
```