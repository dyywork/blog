---
date: 2023-07-06
category:
- pm2
---

# pm2

使用pm2发布node项目 [pm2文档](https://pm2.fenxianglu.cn/docs/start)

## 安装pm2

```shell
yarn add --dev pm2
```

## pm2 命令

```shell
pm2 start app.js
pm2 restart app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name

pm2 list # 列表
pm2 logs # 日志
pm2 monit # 监控信息
```
