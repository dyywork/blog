---
date: 2024-01-17
category:
- tool
- vpn
---

# VPN

## VPN 命令

```shell
# powershell命令
$env:HTTP_PROXY="http://127.0.0.1:7897"; $env:HTTPS_PROXY="http://127.0.0.1:7897"
# 测试命令行vpn是否通
curl https://www.google.com
```

## 生成文件目录

```shell
tree/f>list.txt
```

## npm 清除缓存

```shell
npm cache clean --force
```

## 面试小游戏

[flex 小游戏](http://flexboxfroggy.com/)
[js 小游戏](https://codepip.com/games/sherlock-scopes/)
[js 面试题](https://jschallenger.com/)

## pnpm 安装到指定工作区间

``` bash
pnpm add markdown-it-container --filter d-ui-plus
```

`d-ui-plus` 为package.json中的name

## pnpm,npm,yarn link命令用法

::: info
存在`ui-plus`组件库项目，存在使用`ui-plus`的项目`ui-admin`，使用`pnpm link`命令将`ui-plus`组件库项目安装到`ui-admin`的项目中，这样`ui-admin`的项目中可以使用`ui-plus`组件库项目中的组件
:::

### 全局用法

```bash
cd ui-plus
pnpm link --global  # 将ui-plus安装到全局目录中
cd ui-admin
pnpm link --global ui-plus # 将ui-plus安装到ui-admin的项目中
```

### 指定项目目录用法

```bash
cd ui-admin
pnpm link D:\\ui-admin ui-plus # 将ui-plus安装到ui-admin的项目中
```

## `pnpm link <dir>` 与 `pnpm link --dir <dir>`的不同

::: info
`pnpm link <dir>` 将包从 `<dir>` 链接到执行命令的包的 `node_modules`。 `pnpm link --dir <dir>` 将包从当前工作目录链接到 `<dir>`。
:::

```bash
# 当前目录是 ui-admin
pnpm link ../ui-plus

- ui-admin
  - node_modules
    - ui-plus -> ../../ui-plus
- ui-plus

# 当前目录是 ui-plus
pnpm link --dir ../ui-admin

- ui-admin
  - node_modules
    - ui-plus -> ../../ui-plus
- ui-plus
```

::: info
信息容器。
:::

::: note
注释容器。
:::

::: tip
提示容器
:::

::: warning
警告容器
:::

::: details
详情容器
:::

::: caution
危险容器
:::
