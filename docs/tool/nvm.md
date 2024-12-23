---
date: 2022-09-28
category:
- tool
---

# nvm

::: tip
node 版本管理工具
:::

[下载nvm地址](https://github.com/coreybutler/nvm-windows/releases)
[文档地址](https://github.com/coreybutler/nvm-windows)

- 安装成功后使用 `管理员` 权限打开 `cmd` 或 `PowerShell`

```shell
nvm list // 查看已安装的node版本
nvm current // 查看当前node版本
nvm install <node版本> // 安装对应版本的node
nvm uninstall <node版本> // 卸载node 指定版本
nvm use <node版本> // 使用指定版本node
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm npm_mirror https://npmmirror.com/mirrors/npm/
```

## nrm

::: tip
nrm 是 node 版本管理工具，用于管理 npm 源
:::

## 安装

```shell
npm install -g nrm
```

### 查看当前源

```shell
$ nrm ls
* npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
  huawei ------- https://repo.huaweicloud.com/repository/npm/
```

### 切换源

```shell
$ nrm use taobao
Switch to registry https://registry.npmmirror.com/
```
