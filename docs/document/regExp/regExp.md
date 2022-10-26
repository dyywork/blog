---
date: 2022-08-19
author: Mr.Ding
category:
- 正则表达式
	tag:
	- 正则表达式
---
	
# 正则表达式

:::info 正则定义
正则表达式是描述字符模式的对象。<br/>
正则表达式用于对字符串模式匹配及检索替换，是对字符串执行模式匹配的强大工具。
:::

```js
const regExp = new RegExp("\\w+")
const regExp = /\w+/
```

## 修饰符
|修饰符| 描述|
|:--------|--------------|
|i|不区分大小写的匹配|
|g|全局匹配（查找所有匹配而非找到第一个匹配后停止）|
|m|执行多行匹配|

:::tip 修饰符使用
```js
		const str = `This IS RegExp Object!`
		console.log(str.match(/is/)) // ['is', index: 2, input: 'This\nIS RegExp Object!', groups: undefined]
		console.log(str.match(/is/g)) // ['is']
		console.log(str.match(/is/gi)) // ['is', 'IS']
		console.log(str.match(/is/gim)) // ['is', 'IS']
```
:::

## 方括号
|表达式| 描述|
|:--------|--------------|
|[abc]  |查找方括号内的字符串|
|[^abc] |查找不在方括号内的字符串|
|[0-9]  |查找任何0-9的数字|
|[a-z]  |查找小写a-z的的字符|
|[A-Z]  |查找大写A-Z的的字符|
|(12\|34\|56) |查找任何指定的选项|

:::tip 方括号应用
```js
const str = `Thi12s IS9 RegExp123 Object456!`
console.log(str.match(/[is]/)) // ['i', index: 2, input: 'Thi12s IS9 RegExp123 Object456!', groups: undefined]
console.log(str.match(/[is]/g)) // ['i', 's']
console.log(str.match(/[is]/gi)) // ['i', 's', 'I', 'S']
console.log(str.match(/[^is]/gi)) // ['T', 'h', '1', '2', ' ', '9', ' ', 'R', 'e', 'g', 'E', 'x', 'p', '1', '2', '3', ' ', 'O', 'b', 'j', 'e', 'c', 't', '4', '5', '6', '!']
console.log(str.match(/[0-9]/g)) // ['1', '2', '9', '1', '2', '3', '4', '5', '6']
```
:::

## RegExp 对象的方法
|表达式| 描述|
|:--------|--------------|
|exec |检索字符串中指定的值。返回找到的值，并确定其位置。|
|test |检索字符串中指定的值。返回 true 或 false。|
|toString |	返回正则表达式的字符串。|

## 支持正则表达式的 String 对象的方法
|表达式| 描述|
|:--------|--------------|
|search |检索与正则表达式相匹配的值。|
|match |找到一个或多个正则表达式的匹配|
|replace |	替换与正则表达式匹配的子串。|
|split |	把字符串分割为字符串数组。|
