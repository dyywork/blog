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
