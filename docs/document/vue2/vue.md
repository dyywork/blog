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

- 合计变形处理 ，修改是否显示合计判断 源码为判断data数据 注释掉
- 时间范围选择器中defaultTime 对于默认值无用，只能选中后才会触发自动拼接
- table 暂无数据 出现横向滚动条，不是在可视范围居中 注释掉 // width: this.bodyWidth,
- 过滤方法没有数据的时候，不显示暂无数据，在判空的时候少了一个_vm.tableData.length === 0判断

## element-ui table

### 分页多选

- el-table 设置row-key 属性
- el-table-column 设置type为selection,添加reserve-selection属性

### 复选

- 需先拿到已选数据 `list`，在获取列表数据 `getList()` ,已选数据中必包含 `row-key` 对应的字段，其他随意，若有自定义字段需同样返回

```js
 this.$refs.table.clearSelection()
 this.list.forEach(item => {
  this.$refs.table.toggleRowSelection(item, false)
 })
 this.getList()
```
