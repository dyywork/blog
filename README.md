# vuepress

## 使用vuepress2.0搭建个人笔记本

[vuepress2.0 官网](https://v2.vuepress.vuejs.org/zh/)
[莫名点 blog](https://dyywork.github.io/blog/)

### 按照官网步骤生成项目
修改.vuepress 里config.js文件配置路由首页
```js
const { backToTopPlugin } = require('@vuepress/plugin-back-to-top')
const { defaultTheme } = require('vuepress')
const { path } = require('@vuepress/utils')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')

module.exports = {
    plugins: [
        backToTopPlugin(),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, '../components'),
        })
    ],
    lang: 'zh-CN',
    title: '莫名点',
    description: '问题汇总',
    theme: defaultTheme({
        home: '/',
        navbar: [
            {
                text: '主页',
                link: '/'
            },
            {
                text: 'js问题',
                children: [
                    {
                        text: '垃圾回收',
                        link: '/js/README.md',
                    },
                    {
                        text: '创建对象',
                        link: '/js/Object.md',
                    },
                ]
            },
        ],
        sidebar: { // 官网提供了三种配置侧边路由的方式，这里用了一种
            '/document/': [
                {
                    text: 'JS问题',
                    children: ['/document/js/README.md', '/document/js/Object.md'],
                },
                {
                    text: 'vue2',
                    children: ['/document/vue2/vue.md', "/document/vue2/COMPONENTS.md"],
                }
            ],
        }
    },),
    base: '/blog/'
}

```
### 按照官网可以发布到github/gitlab gh-pages

github
```yaml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: '14'

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}


```
gitlab
```yaml
# 选择你要使用的 docker 镜像
image: node:14-buster

pages:
  # 每当 push 到 main 分支时触发部署
  only:
    - main

  # 缓存 node_modules
  cache:
    paths:
      - node_modules/

  # 安装依赖并运行构建脚本
  script:
    - yarn --frozen-lockfile
    - yarn build --dest public

  artifacts:
    paths:
      - public

```

