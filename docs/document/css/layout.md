---
date: 2022-01-12
category:
	- css
---

# 布局

## 飞翼布局
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
## 垂直居中
::: normal-demo 垂直居中(flex)

```html
<div class="box">
	<div class="center"></div>
</div>
```

```css
	.box{
		display: flex;
    align-items: center; /* 垂直属性 */
    justify-content: center;
		height: 200px;
		border: 1px #1c1d21 solid;
		border-radius: 5px;
	}
	
	.center{
		width: 100px;
		height: 100px;
		background: #00CD66;
	}
	
```

:::

::: normal-demo 垂直居中(position : top(50%) - height/2 ; left(50%) - width/2)

```html
<div class="box">
	<div class="center"></div>
</div>
```

```css
	.box{
		position: relative;
		height: 200px;
		border: 1px #1c1d21 solid;
		border-radius: 5px;
	}
	
	.center{
		position: absolute;
		left: calc(50% - 50px);
		top: calc(50% - 50px);
		width: 100px;
		height: 100px;
		background: #00CD66;
	}
	
```

:::

::: normal-demo 垂直居中(position : left: 50% ;top: 50%;margin-left: -50px; margin-top: -50px)

```html
<div class="box">
	<div class="center"></div>
</div>
```

```css
	.box{
		position: relative;
		height: 200px;
		border: 1px #1c1d21 solid;
		border-radius: 5px;
	}
	
	.center{
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -50px;
		margin-top: -50px;
		width: 100px;
		height: 100px;
		background: #00CD66;
	}
	
```

:::

::: normal-demo 垂直居中(transform: translateY(50%))

```html
<div class="box">
	<div class="center"></div>
</div>
```

```css
	.box{
		height: 200px;
		border: 1px #1c1d21 solid;
		border-radius: 5px;
	}
	
	.center{
		transform: translateY(50%);
		margin: 0 auto;
		width: 100px;
		height: 100px;
		background: #00CD66;
	}
	
```

:::


