---
date: 2023-01-19
author: Mr.Ding
category:
- vue
	tag:
  - vue
  - 面试题
---

# 面试题

## 清除掉源码中没有使用的方法和css样式

1. 删除无用js代码
使用 `Tree Shaking` 树摇优化  限制: js ESM 模块
2. 删除无用css样式
使用 `PurgeCSS` （CSS 原子化）

## 项目更新提示

``` js
let lastSrcs;

const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm;

async function getSrcs() {
  const html = await fetch(`/?_timestamp=${Date.now()}`).then(res => res.text());

  scriptReg.lastIndex = 0;
  const srcs = [];
  let match;
  while ((match = scriptReg.exec(html))) {
    srcs.push(match.groups.src);
  }

  return srcs;
}
async function checkUpdate() {
  const srcs = await getSrcs();
  if (lastSrcs) {
    const diff = srcs.filter(src => !lastSrcs.includes(src));
    if (diff.length) {
      console.log('有新的脚本更新了', diff);
      return true;
    } else {
      return false;
    }
  }
}

const time = 2000;
function check() {
  setTimeout(async () => {
    const hasUpdate = await checkUpdate();
    if (hasUpdate) {
      const res = comfirm('有新的脚本更新了，是否刷新页面？');
      if (res) {
       location.reload();
      }
    } else {
      check();
    }
  }, time);
}

```
