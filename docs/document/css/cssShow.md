---
date: 2022-11-09
category:
- css
---

# CSS 效果

## 字体阴影
::: normal-demo 

```html
<div class="box">
	<div class="fontBoxShadow">DINGYONGYA</div>
</div>
```

```css
	.box{
		height: 200px;
		border: 1px #1c1d21 solid;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #bbbbbb;
	}
	.fontBoxShadow{
			font-size: 80px;
			font-weight: bold;
			z-index: 1;
			color: #ffffff;
	}
	.fontBoxShadow::before{
			content: "DINGYONGYA";
			position: absolute;
			z-index: -1;
      transform: scaleY(0.5) translate(-40px, 33px) skew(50deg);
			color: #000;
			filter: blur(5px);
			-webkit-mask-image: linear-gradient(transparent, #000000);
	}
	
```

:::