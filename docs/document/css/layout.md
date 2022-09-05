---
icon: edit
date: 2022-01-01
category:
- CategoryA
	tag:
- tag A
- tag B
---

# 布局

<MyTemplate></MyTemplate>

<div class="box">
<div class="left"></div>
<div class="center"></div>
<div class="right"></div>
</div>

<style>
.box{
	display: flex;
	height: 200px;
}
.left{
	flex-basis: 100px;
	background: #FF6A6A;
}
.center{
	flex-grow: 1;
	background: #00CD66;
}
.right {
	flex-basis: 100px;
	background: #FF6A6A;
}
</style>

```html
<div class="box">
	<div class="left"></div>
	<div class="center"></div>
	<div class="right"></div>
</div>

<style>
    .box{
        display: flex;
        height: 200px;
    }
    .left{
        flex-basis: 100px;
        background: #FF6A6A;
    }
    .center{
        flex-grow: 1;
        background: #00CD66;
    }
    .right {
        flex-basis: 100px;
        background: #FF6A6A;
    }
</style>
```

::: title css
:::
