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

