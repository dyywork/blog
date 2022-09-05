---
icon: edit
date: 2022-01-12
category:
	- css
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
.box-left{
	flex-basis: 100px;
	background: #FF6A6A;
}
.center{
	flex-grow: 1;
	background: #00CD66;
}
.box-right {
	flex-basis: 100px;
	background: #FF6A6A;
}
</style>

```html
<div class="box">
	<div class="box-left"></div>
	<div class="center"></div>
	<div class="box-right"></div>
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
