---
date: 2022-01-12
category:
- javascript
tag:
- 垃圾回收
- 变量提升
---

# JavaScript 杂项

## JavaScript 精确度问题

- JavaScript中数字是使用64位双精度浮点型来表示的， 精度问题都是由于浮点数无法精确表示引起的
- 目前比较成熟的库，比如 [bignumber.js](https://github.com/MikeMcl/bignumber.js)，[decimal.js](https://github.com/MikeMcl/decimal.js)，以及[big.js](https://github.com/MikeMcl/big.js)等

## 变量提升

JavaScript在执行之前会有一个 `预编译` 过程，变量提升和函数提升就在这时候发生。[具体介绍](https://www.runoob.com/js/js-hoisting.html)

:::info 变量提升

- javaScript中，函数及变量的声明都会被提升到函数的最顶部；
- javaScript中，变量可以在使用后声明，也就是变量可以先使用在声明；
- JavaScript 初始化不会提升，只有声明的变量会提升；
- JavaScript中，函数声明比变量提升先，就是说，先函数提升，在变量提升。
- JavaScript中，变量的搜索顺序：找变量时，先找局部变量，如果没有局部变量；再找全局变量；

:::

## 垃圾回收

### 1.标记清除
`“标记清除”` 是目前主流的垃圾收集算法，这种算法的思想就是给当前不使用的值加上标记，然后再回收其内存
### 2.引用计数
`“引用计数”`跟踪记录所有值被引用的次数
（注： `JavaScript`引擎目前都不在使用这种算法，当代码中存在循环引用现象时，`‘引用计数’`算法会导致问题）

### 3.优化
解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该
及时解除不再使用的全局对象，全局对象属性以及循环引用变量的引用。

### 4.小计
函数内的变量在函数执行完之后，变量所占内存就会释放
