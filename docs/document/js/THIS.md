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

## 3.数字格式化

```js
const str = '10000000000.3782'
// 1,000,000,000,000.3,782
const num = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
console.log(num) //  10,000,000,000.3,782
```

## 4.数字转中文

::: normal-demo 数字转中文

```html
<input type="number" id="num" />
<p id="very"></p>
<p id="veryBig"></p>
```

```js
document.querySelector("#num").oninput = (e) => {
    let num = document.querySelector("#num").value
    document.querySelector("#very").innerHTML = numToChinese(num)
    document.querySelector("#veryBig").innerHTML = numToBigChinese(num)
}


function numToChinese(num) {
    let chineseNum = ''
    const temp = num.replace(/\B(?=(\d{4})+(?!\d))/g, ',').split(',').filter(Boolean)

    const map = ["零",'一','二','三','四','五','六','七','八','九'];
    const units = ['','十','百','千']
    function _removeZero(n) {
        return n.replace(/零+/, '零').replace(/零$/, '')
    }
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
    return chineseNum
}

function numToBigChinese(num) {
    const cnum = numToChinese(num)
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
    }
    return cnum.split('').map((item) => map[item]).join('')
}

```

```css
#num {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 20px;
    padding-left: 10px;
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
