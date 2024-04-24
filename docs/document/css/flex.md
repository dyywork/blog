---
date: 2024-04-16
category:
- flex
---

# flex布局

::: vue-demo flex

```vue
<template>
  <div class="container">
    <div class="item" v-for="i in 3"></div>
  </div>
</template>
<style>
.container{
    width: 650px;
    display: flex;
    gap: 10px;
}
.item{
    flex: auto;
    height: 100px;
    background-color: #ececec;
    border-radius: 10px;
}
</style>
```

:::
