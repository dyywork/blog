# react

## 组件 && Props的只读性

### 1. 纯函数
  - 函数`不会`尝试`更改入参`，且多次调用下相同的入参始终返回相同的结果,这样的函数称之为`“纯函数”`。
```js
function sum(a, b) {
  return a + b;
}
```
### 2. Props 的只读性
- 组件无论是使用函数声明还是通过 class 声明，都`决不能修改`自身的 `props`。
- 所有 React 组件都必须像`纯函数`一样保护它们的 `props 不被更改`。

## 生命周期
 ### 1.加载组件时方法的调用顺序

<img src="./img/img.png"/>

#### 1. 首次加载
`constructor` ---> `static getDerivedStateFromProps()` 初始化 `this.state` ---> `render()` ---> `React 更新 DOM 和 refs` ---> `componentDidMount()`
#### 2. 更新

`"New props"`, `"setSate()"`, `"forceUpdate"` 三种方式更新触发

`static getDerivedStateFromProps()` ---> `shouldComponentUpdate()` 使用 "forceUpdate" 不触发， 返回值false 不重新渲染 ---> `render()` ---> 
`getSnapshotBeforeUpdate()`---> `React 更新 DOM 和 refs` ---> `componentDidUpdate()`

::: tip
`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数`snapshot`传递给 `componentDidUpdate(prevProps, prevState, snapshot)`
:::

#### 3. 卸载时
`组件` 从 `DOM` 中被移除 --> `componentWillUnmount()`

### componentDidUpdate用法

```js
	componentDidUpdate(prevProps, prevState, snapshot)
```

::: tip
 1. `componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行此方法。
 2. 当组件更新后，可以在此处对 DOM 进行操作
 3. 可以在其中直接调用`setState()`,但要被包裹在一个条件语句里；否则会导致死循环
 4. 如果组件实现了 `getSnapshotBeforeUpdate()` 生命周期（不常用），则它的返回值将作为 `componentDidUpdate()` 的第三个参数 `“snapshot”` 参数传递。否则此参数将为 `undefined`。
 5. 如果 `shouldComponentUpdate()` 返回值为 `false`，则不会调用 `componentDidUpdate()`。
:::
 


## react中的传值方式

### 1.父传子
- `props` 传递
- `context` 传递
- `redux` 传递


4. hooks的使用
5. context的使用 （provider和consumer的用法）
6. echarts中label文字长度的获取；点击每个柱形要怎么调用弹框
7. react中可以使用requirejs吗（一般使用ES6模块化导入，也可以用require，写法为 const component = require('./component') ）
8. 中英文或主题色切换怎么实现的；切换后页面会刷新吗
9. 安全性功能做过哪些
10. 加载几百页的pdf时，有什么优化操作