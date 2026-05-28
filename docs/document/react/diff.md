---
date: 2024-06-01
category:
- react
---

# React 与 Vue 的相同点和不同点

## 一、相同点

### 1. 核心设计理念

- **组件化**：将 UI 拆分为独立、可复用的组件
- **响应式**：数据驱动视图，无需手动操作 DOM
- **虚拟 DOM**：通过虚拟 DOM 减少真实 DOM 操作，提升性能
- **单文件组织**：推荐将组件相关的逻辑、模板、样式组织在一起

### 2. 生态与工程化

- 都拥有成熟的 CLI 脚手架（Vite / Create React App / Vue CLI）
- 都支持 TypeScript
- 都支持服务端渲染（Next.js / Nuxt.js）
- 都拥有丰富的组件库和工具链

### 3. 现代特性

| 特性 | React | Vue |
|------|-------|-----|
| Hooks 机制 | React Hooks | Composition API |
| 代码分割 | React.lazy + Suspense | defineAsyncComponent |
| 路由 | React Router | Vue Router |
| 全局状态 | Redux / Zustand / Jotai | Pinia / Vuex |

---

## 二、不同点

### 1. 模板 vs JSX

**Vue（模板语法）**

```vue
<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <button @click="handleClick">点击</button>
  </div>
</template>
```

- 基于 HTML 的模板语法，学习成本低
- 指令系统（`v-if`、`v-for`、`v-model`、`@click`）
- 模板更接近最终输出的 HTML

**React（JSX）**

```jsx
function Hello({ title, onClick }) {
  return (
    <div className="hello">
      <h1>{title}</h1>
      <button onClick={onClick}>点击</button>
    </div>
  )
}
```

- JSX = JavaScript 的语法扩展，HTML in JS
- 全凭 JS 逻辑（没有指令，直接用 `arr.map()`、三元表达式）
- 更灵活，但需要较强的 JS 基础

### 2. 响应式原理

| 对比项 | React | Vue |
|--------|-------|-----|
| 核心机制 | 显式触发更新（`setState`） | 自动追踪依赖（Proxy） |
| 侦测粒度 | 组件级（state 变化 → 整个组件重新渲染） | 响应式数据级（精确追踪变化） |
| 数据更新 | 不可变数据（创建新引用） | 可变数据（直接修改属性） |
| 触发方式 | `setState()` / `useState` 返回的 setter | 修改 `ref.value` 或 `reactive` 对象的属性 |

**React — 不可变数据**

```jsx
const [items, setItems] = useState([1, 2, 3])

// ❌ 错误：直接修改
items.push(4)
setItems(items)

// ✅ 正确：创建新数组
setItems([...items, 4])
```

**Vue — 可变数据**

```vue
<script setup>
const items = ref([1, 2, 3])

// 直接修改即可
items.value.push(4)
</script>
```

### 3. 数据绑定

```vue
<!-- Vue：双向绑定 -->
<input v-model="name" />

<!-- 等价于 -->
<input :value="name" @input="name = $event.target.value" />
```

```jsx
// React：单向数据流，需要显式处理
function Input() {
  const [name, setName] = useState('')
  return <input value={name} onChange={(e) => setName(e.target.value)} />
}
```

### 4. 条件渲染

```vue
<!-- Vue -->
<div v-if="visible">显示</div>
<div v-else>隐藏</div>
```

```jsx
// React
{visible ? <div>显示</div> : <div>隐藏</div>}
// 或
{visible && <div>显示</div>}
```

### 5. 列表渲染

```vue
<!-- Vue -->
<li v-for="(item, index) in items" :key="item.id">
  {{ item.name }}
</li>
```

```jsx
// React
{items.map((item, index) => (
  <li key={item.id}>{item.name}</li>
))}
```

### 6. 组件通信

| 方式 | React | Vue |
|------|-------|-----|
| 父→子 | Props | Props |
| 子→父 | 回调函数 | `emit` 事件 |
| 兄弟组件 | 状态提升 | 状态提升 / Event Bus |
| 跨层级 | Context | provide / inject |
| 全局状态 | Redux / Zustand | Pinia / Vuex |

**Vue 子→父（emit）**

```vue
<!-- 子组件 -->
<button @click="$emit('click', payload)">点击</button>

<!-- 父组件 -->
<Child @click="handleClick" />
```

**React 子→父（回调）**

```jsx
// 子组件
function Child({ onClick }) {
  return <button onClick={() => onClick(payload)}>点击</button>
}

// 父组件
<Child onClick={handleClick} />
```

### 7. Hooks vs Composition API

**React Hooks**

```jsx
function useCount() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `计数: ${count}`
  }, [count])
  return { count, setCount }
}
```

**Vue Composition API**

```vue
<script setup>
import { ref, watch } from 'vue'

function useCount() {
  const count = ref(0)
  watch(count, (val) => {
    document.title = `计数: ${val}`
  })
  return { count }
}

const { count } = useCount()
</script>
```

**关键区别**：

| 对比 | React Hooks | Vue Composition API |
|------|------------|-------------------|
| 调用位置 | 只能在组件/自定义 Hook 顶层调用 | 任意位置可调用 |
| 依赖数组 | useEffect 需要手动声明依赖 | watch 自动追踪 |
| 执行时机 | 每次渲染都会执行 | setup 只执行一次 |
| 条件语句 | ❌ 不能放在条件语句中 | ✅ 可以放在条件语句中 |
| 闭包陷阱 | 容易遇到（需用 ref 或 useCallback） | 天然避免（基于 Proxy） |

---

## 三、工程化对比

| 对比项 | React | Vue |
|--------|-------|-----|
| 脚手架 | Vite / CRA | Vite / Vue CLI |
| TypeScript | 支持良好 | 支持良好 |
| 路由 | React Router | Vue Router |
| 状态管理 | Redux / Zustand / Jotai | Pinia / Vuex |
| UI 组件库 | Ant Design / Semi Design | Element Plus / Arco Design / Naive UI |
| 移动端 | React Native | Weex / uni-app |
| 全栈框架 | Next.js (React) | Nuxt.js (Vue) |
| 构建工具 | Vite / Webpack | Vite / Webpack |

---

## 四、学习曲线对比

```
React:    JS 基础 → JSX → Hooks（闭包、副作用）→ 自定义 Hooks → 生态
Vue:      HTML/JS → 模板语法 → 选项式 API → Composition API → 生态
```

- **Vue 入门更快**：模板语法对传统开发者友好，文档中文支持好
- **React 上限更高**：JSX 和 JS 深度结合，灵活性强，但需要更强的 JS 功底

---

## 五、如何选择

| 场景 | 推荐 |
|------|------|
| 个人项目 / 小团队 | 两者皆可，看团队技术栈 |
| 大型企业级应用 | React（生态更成熟，社区更大） |
| 国内中后台系统 | Vue（Ant Design Vue、Element Plus 成熟） |
| SEO 要求高 | Next.js (React) / Nuxt.js (Vue) |
| 移动端应用 | React Native |
| 快速原型 | Vue（开发效率高） |

> 两者的相似之处远多于不同之处。核心都是组件化 + 数据驱动视图。掌握其中一个后，学习另一个的成本很低。
