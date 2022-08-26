# hooks
## hooks的使用
<h4 style="color: red">为什么要用Hook?</h4> <br/>
1.在组件之间复用状态逻辑很难

- `Hook` 使你在无需修改组件结构的情况下复用状态逻辑。

2.复杂组件变得难以理解
- `Hook` 将组件中`相互关联`的部分`拆分`成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 `reducer` 来管理组件的内部状态，使其更加可预测。

3.难以理解的 class
- `Hook` 使你在非 `class` 的情况下可以使用更多的 `React` 特性

<h4 style="color: red">什么是 Hook?</h4>

- `Hook` 是一些可以让你在`函数组件`里`“钩入” React state` 及`生命周期等特性`的`函数`。`Hook` `不能`在 `class 组件`中使用 —— 这使得你不使用 `class` 也能使用 `React`。

<h4 style="color: red">什么是 "副作用"?</h4>

- 你之前可能已经在 `React` 组件中执行过数据`获取、订阅`或者`手动修改`过 `DOM`。我们统一把这些操作称为`“副作用”`，或者简称为`“作用”`。

## useState
<h4 style="color: red">调用 useState 方法的时候做了什么?</h4>

- 它定义一个 `“state 变量”`,一般来说，在`函数退出`后`变量`就`会”消失”`，而 `state` 中的变量会被` React 保留`。

<h4 style="color: red">useState 需要哪些参数？</h4>

-`useState()` 方法里面唯一的参数就是初始 `state`;想初始化两个变量，就调用两次`useState()`

<h4 style="color: red">useState 方法的返回值是什么？</h4>

- 返回值为：当前 `state` 以及`更新 state 的函数`。这就是我们写 `const [count, setCount] = useState()` 的原因; 使用的 `[]` 中括号

## useEffect