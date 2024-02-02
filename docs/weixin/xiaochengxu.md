---
date: 2022-09-28
category:
- uni-app
---

# 小程序

## .vue 和 .nvue 不同

`.vue`文件会使用webview进行渲染，`.nvue`会使用原生进行渲染.

进程 ： 独立内存空间

线程： 进程里面运行的为线程

## tabBar & 导航栏局限性

tabBar 暂不支持iconfont ，目前只支持APP  
导航栏不支持标题居中  

## 微信小程序 CSS border-radius元素 overflow:hidden失效问题 iPhone ios 苹果兼容问题

父元素使用border-radius 和 overflow：hidden；子元素使用了transform属性，父元素的overflow：hidden；会失效。

解决方法：父元素设置以下两个属性：

```css
-webkit-backface-visibility: hidden;
-webkit-transform: translate3d(0, 0, 0);
```

## 文字超出显示省略号

::: tip 注释
注意 `height` 属性，`line-height` 属性，必须设置，不然可能会把需要隐藏的展示出来
:::

```css
display: -webkit-box;
overflow: hidden;
text-overflow: ellipsis;
word-break: break-all;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1; /*显示行数*/
```

## IOS 下载视频失败

::: tip 解决方式
压缩后下载即可
:::
