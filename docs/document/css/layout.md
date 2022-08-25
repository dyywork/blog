# 布局
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
	background: red;
}
.center{
	flex-grow: 1;
	background: greenyellow;
}
.right {
	flex-basis: 100px;
	background: red;
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
	background: red;
}
.center{
	flex-grow: 1;
	background: greenyellow;
}
.right {
	flex-basis: 100px;
	background: red;
}
</style>
```