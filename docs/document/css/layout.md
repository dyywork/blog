---
date: 2022-01-12
category:
	- css
---

# 布局

::: normal-demo 飞翼布局

```html
<div class="box">
	<div class="box-left"></div>
	<div class="center"></div>
	<div class="box-right"></div>
</div>
```

```css
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
```

:::


