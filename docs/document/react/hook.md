---
date: 2022-08-19
author: Mr.Ding
category:
- React
- Hooks
tag:
- useState
- useEffect
sticky: 1
star: 1
---

# hooks

## hooks的使用

### 为什么要用Hook?

1.在组件之间复用状态逻辑很难

- `Hook` 使你在无需修改组件结构的情况下复用状态逻辑。

2.复杂组件变得难以理解

- `Hook` 将组件中`相互关联`的部分`拆分`成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 `reducer` 来管理组件的内部状态，使其更加可预测。

3.难以理解的 class

- `Hook` 使你在非 `class` 的情况下可以使用更多的 `React` 特性

### 什么是 Hook?

- `Hook` 是一些可以让你在`函数组件`里`“钩入” React state` 及`生命周期等特性`的`函数`。`Hook` `不能`在 `class 组件`中使用 —— 这使得你不使用 `class` 也能使用 `React`。

### 什么是 "副作用"?

- 你之前可能已经在 `React` 组件中执行过数据`获取、订阅`或者`手动修改`过 `DOM`。我们统一把这些操作称为`“副作用”`，或者简称为`“作用”`。

## useState

### 调用 useState 方法的时候做了什么?

- 它定义一个 `“state 变量”`,一般来说，在`函数退出`后`变量`就`会”消失”`，而 `state` 中的变量会被`React 保留`。

## useState 需要哪些参数？

-`useState()` 方法里面唯一的参数就是初始 `state`;想初始化两个变量，就调用两次`useState()`

### useState 方法的返回值是什么？

- 返回值为：当前 `state` 以及`更新 state 的函数`。这就是我们写 `const [count, setCount] = useState()` 的原因; 使用的 `[]` 中括号

## useEffect

### 1.useEffect 介绍

## useEffect 做了什么？

- 它告诉 `React 组件`需要在`渲染后`执行某些操作。`React` 会`保存`你`传递的函数`（我们将它称之为 “effect”），并且在执行 `DOM 更新之后调用它`。

### 为什么在组件内部调用 useEffect？

-将 `useEffect` 放在组件内部让我们可以在 `effect` 中直接访问`count state` 变量（或其他 `props`）;`Hook` 使用了 `JavaScript` 的`闭包机制`，而不用在 `JavaScript` 已经提供了解决方案的情况下，还引入特定的 `React API`。

### useEffect 会在每次渲染后都执行吗？

- 它在`第一次渲染之后`和`每次更新之后`都会执行;`React` 保证了每次运行 `effect` 的同时，`DOM` 都已经`更新完毕`。

### useEffect 是不是异步？

- `是异步`；如果需要`effect 同步`的话，有单独的 `useLayoutEffect Hook` 供你使用，其 `API` 与 `useEffect` 相同。

### useEffect 的优势？

- 与 `componentDidMount` 或 `componentDidUpdate` 不同，使用 `useEffect` 调度的 `effect` `不会阻塞浏览器更新屏幕`，这让你的应用看起来`响应更快。`

### 2.需要清除的 effect

`useEffect` 的设计是在同一个地方执行。如果你的 `effect` 返回一个函数，`React` 将会在`执行清除操作时调用它`

```js
useEffect(() => {
  // 渲染时执行 相当于clas组件的 componentDidMount componentDidUpdate 
  return () => {
    // 组件卸载时执行 相当于clas组件的
  };
}, []); // 注1 例：[count] 仅在count 更改时更新 componentWillUnmount
```

::: tip

1. 如果使用`注1`这种优化方式，请确保数组中包含了`所有外部作用域`中会随时间变化并且在 `effect` 中使用的变量，否则你的代码会引用到先前渲染中的旧变量;
2. 如果想执行`只运行一次`的 `effect`（仅在组件`挂载`和`卸载`时执行），可以传递一个`空数组（[]）`作为第二个参数。
:::

## Hook 规则

1.只在最顶层使用 Hook

- `不要`在`循环，条件或嵌套函数`中调用 `Hook`， 确保总是在你的 `React` `函数的最顶层调用他们`。 遵守这条规则，你就能确保 `Hook` 在每一次渲染中都按照同样的顺序被调用。这让 `React` 能够在多次的 `useState` 和 `useEffect` 调用之间保持 `hook` 状态的正确。

2.只在 React 函数中调用 Hook

- 不要在普通的 `JavaScript` 函数中调用 `Hook`。
- 在 `React` 的函数组件中调用 `Hook`
- 在自定义 `Hook` 中调用其他 `Hook`

## 自定义Hook

- `自定义 Hook` 是一个`函数`，其名称以 `“use” 开头`，函数内部`可以调用`其他的 `Hook`。
- `自定义 Hook` 是一种自然遵循 `Hook 设计`的约定，而并`不是 React` 的`特性`。

### 自定义 Hook 必须以 “use” 开头吗？

- `必须如此。`这个约定非常重要。不遵循的话，由于`无法判断`某个函数是`否包含对其内部 Hook 的调用`，`React` 将无法自动检查你的 `Hook` 是否违反了 `Hook 的规则`。

### 在两个组件中使用相同的 Hook 会共享 state 吗？

- `不会。` `自定义 Hook` 是一种`重用状态逻辑的机制`(例如设置为订阅并存储当前值)，所以每次使用`自定义 Hook`时，其中的所有 `state` 和`副作用`都是`完全隔离的`。

### 自定义 Hook 如何获取独立的 state？

- 每次调用 `Hook`，它都会获取`独立的 state`；我们可以在一个组件中`多次调用 useState 和 useEffect`，它们是`完全独立的`。
