---
date: 2022-08-19
author: Mr.Ding
category:
- vue
tag:
	- vue 问题集合
---
# vue问题集合

## mixins 调用顺序
`Mixin 钩子`按照`传入顺序依次调用`，并在调用`组件自身的钩子之前`被调用。

## element

- 合计变形处理 ，修改是否显示合计判断 源码为判断data数据 可以根据是否有shouSummary 来显示