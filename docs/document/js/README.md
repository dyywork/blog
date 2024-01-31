---
date: 2022-01-12
category:
- javascript
tag:
- 垃圾回收
- 变量提升
---

# JavaScript 杂项

## 数字格式化

```js
const str = '10000000000.3782'
// 1,000,000,000,000.3,782
const num = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
console.log(num) //  10,000,000,000.3,782
```

## 数字转中文

::: normal-demo 数字转中文

```html
<div class="title">中文统计金额</div>
<input type="number" id="num" value="888888.6666"/>
<p id="very"></p>
<p id="veryBig"></p>

<div class="title">数字转中文</div>

<p id="very1"></p>
<p id="veryBig1"></p>
```

```js
document.querySelector("#num").oninput = () => {
    initNum()
}
initNum()

function initNum() {
    let num = document.querySelector("#num").value
    document.querySelector("#very").innerHTML = numToChinese(num, true)
    document.querySelector("#veryBig").innerHTML = numToBigChinese(num, true)
    document.querySelector("#very1").innerHTML = numToChinese(num)
    document.querySelector("#veryBig1").innerHTML = numToBigChinese(num)
}

function numToChinese(num, type) {
    let chineseNum = ''
    let chinesePoint = ''
    let point = ''
    let temp = num.replace(/\B(?=(\d{4})+(?!\d))/g, ',').split(',').filter(Boolean)
    if (num.indexOf('.') !== -1){
        temp = num.split('.')[0].replace(/\B(?=(\d{4})+(?!\d))/g, ',').split(',').filter(Boolean)
        point = num.split('.')[1]
    }
    
    const map = ["零",'一','二','三','四','五','六','七','八','九'];
    const units = ['','十','百','千']
    // 处理小数点
    function _setChinesePoint(p) {
        if (!type) {
            return '点' + p.split('').map(n => map[n]).join('') 
        }
        const pointUnits = ['角','分','毫','厘']
        for (let i = 0; i < p.slice(0, 4).length; i++) {
            const c = map[p[i]]
            let u = pointUnits[i]
            if (c === '零') {
                u =''
            }
            chinesePoint += c + u
        }
        chinesePoint = _removeZero(chinesePoint)
        return '元' + chinesePoint
    }
    // 删除多余的零
    function _removeZero(n) {
        return n.replace(/零+/, '零').replace(/零$/, '')
    }
    // 转换成中文
    function _transformChinese(n) {
        let result = '';
        for (let i = 0; i < n.length; i++) {
            const c = map[n[i]]
            let u = units[n.length -i - 1]
            if (c === '零') {
                u = ''
            }
            result += c + u
        }
        result = _removeZero(result)
        return result
    }
    const bigUnit = ['','万','亿','万亿','亿亿','万亿亿']
    // 循环添加单位
    for (let i = 0; i < temp.length; i++) {
        const p = temp[i];
        let c =  _transformChinese(p)
        if (c === '') {
            chineseNum = '零'
            continue;
        }
        const u = bigUnit[temp.length - i - 1]
        chineseNum += c + u
    }
    chineseNum = _removeZero(chineseNum)
    if (point) {
     chineseNum += _setChinesePoint(point)
    }
    return chineseNum
}

function numToBigChinese(num, type) {
    const cnum = numToChinese(num, type)
    let map = {
        "零": "零",
        "一": "壹",
        "二": "贰",
        "三": "叁",
        "四": "肆",
        "五": "伍",
        "六": "陆",
        "七": "柒",
        "八": "捌",
        "九": "玖",
        "十": "拾",
        "百": "佰",
        "千": "仟",
        "万": "萬",
        "亿": "億",
        "点": "點",
        "元": "元",
        "角": "角",
        "分": "分",
        "毫": "毫",
        "厘": "厘"
    }
    return cnum.split('').map((item) => map[item]).join('')
}

```

```css
.title{
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #2196f3;
}
#num {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 20px;
    padding-left: 10px;
}
p{
    font-size: 20px;
    font-weight: bold;
}
#num:focus {
    border: 1px solid #2196f3;
}
#num[type=number]::-webkit-inner-spin-button, 
#num[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  margin: 0; 
}
#num[type=number] {
    -moz-appearance:textfield;
}
```

:::

## let,const

- let 声明的变量只在let命令所在的代码块内有效
- const 声明一个只读的常量，一旦声明，常量的值不能改变

:::info var, let

- 使用var关键字声明的全局作用域变量属于 window对象；
- 使用let关键字声明的全局作用域变量不属于window 对象；
- var 关键字定义的变量可以使用后声明，也就是变量可以先使用在声明（变量提升）
- let 关键字定义的变量不可以在使用后声明，也就是变量需要先声明再使用
- const 用于声明一个或多个常量，声明时必须进行初始化，切初始化后值不可在修改；

:::

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

## 防抖

## 节流

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
