---
date: 2024-01-31
category:
  - javascript
tag:
  - this 
sticky: 2
star: 2
---

# this

## 1.this的指向

1.在函数执行的时候会在函数内部创建两个变量，arguments、this  
    a. arguments 储存着实参的一个类数组对象。  
    b. this 指向函数执行的上下文 （通俗点：谁调用这个函数this就指向谁）

```js
function test() {
    console.log(this)
}

const objA = {
    a: test,
    b: {
        c: test
    }
}

test() // window
objA.a() // objA
objA.b.c() // objA.b

```

## 2.call、apply

1.用来动态改变this的指向

```js

function aaa(name, age) {
    this.name= name;
    this.age = age;
}

let objA = {
    b: aaa,
}
// 第一个参数为需要this指向的对象， 后面的为参数
aaa.call(objA, 'xiaoA', 23)
console.log(objA.name, objA.age) // xiaoA, 23

// 与call不同的是参数的传递是放在数组里面的
aaa.apply(objA, ['xiaoB', 40])
console.log(objA.name, objA.age) // xiaoB, 40

```
