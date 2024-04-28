---
date: 2022-08-19
author: Mr.Ding
category:
- vue2
tag:
	- 组件库搭建
---

# 组件库搭建

[线上Dome vue-components](https://dyywork.github.io/vue-components/)

## 使用vueCli3搭建组件库

1.首先使用vueCli 创建一个初始化项目

``` bash
vue create my-components
```

2.创建一个vue组件的文件夹，目录结构如下

``` bash
    |component
    |---oneComponent
    |---|---oneComponent.vue
    |---|---index.js
    |---index.js
```

3.oneComponent.vue 如下

```vue
    <template>
      <div>oneComponent{{count}}</div>
    </template>
    
    <script>
    export default {
      name: "oneComponent",
   data() {
        return {
          count: 0
    }
   }
    }
    </script>
    
    <style scoped>
    
    </style>
```

4.oneComponent.vue同级目录下创建index.js

```js
import oneComponent from "./oneComponent";

mgSearchForm.install = function (Vue) {
    Vue.component(oneComponent.name, oneComponent)
}

export default oneComponent
```

5.component 文件夹下的index.js

```js
import oneComponent from "./oneComponent";

const components = [
    oneComponent,
]

const install = (Vue) => {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    // 以下是具体的组件列表
    oneComponent,
}
```

6.打包

```json
 {
    "lib": "vue-cli-service build --target lib --name vueComponents --dest lib components/index.js"
  }
```

7.发布 发布时可通过.npmignore 来配置不想提交的文件文件夹，和.gitignore 配置一样

``` bash
npm login
// 登录成功后
npm publish
```

## 处理组件文档md

1. 主要用到的插件

```json
    {
        "github-markdown-css": "^5.1.0",
        "highlight.js": "^11.5.1",
        "dingyongya-vue-markdown-loader": "^2.5.6",
        "vue-loader": "^14.0.0",
        "vue-template-compiler": "^2.6.14"
    }
```

2.vue.config.js的配置

```js
const path = require('path')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    configureWebpack: {
      resolve: {
          alias: {
              "@docs":  path.join(__dirname, 'docs')
          }
      }
    },
    chainWebpack: config => {
        config.module.rule('md')
        .test(/\.md/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use('dingyongya-vue-markdown-loader')
        .loader('dingyongya-vue-markdown-loader/lib/markdown-compiler')
        .options({
            raw: true,
            script: true
        })
    }
}
```
