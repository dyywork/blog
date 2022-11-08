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


::: normal-demo Canvas

```html
<div>
  <button id="submit">重绘</button>
  <button id="clear">清空</button>
  <input type="color" id="color">
</div>
<canvas  style="border: 1px #000 solid;" id="canvas"></canvas>
```

```js
    let colorDom = document.getElementById('color');
    let submitDom = document.getElementById('submit');
    let submitDom1 = document.getElementById('clear');

    class Draw{
        constructor(selector,width, height) {
            this.element = document.querySelector(selector);
            this.canvas = this.element.getContext('2d');
            this.element.width = width;
            this.element.height = height;
            this.timeId = null;
            this.animateArr = [];
        }
        init(color) {
            const {canvas: c, element: el} = this;
            let isDrag = false;
            c.lineWidth = 2;
            c.strokeStyle = color;
            c.shadowColor = color;
            c.lineJoin = 'round';
            c.shadowBlur = 4

            el.onmousedown = () => {
                isDrag = true;
                c.beginPath()
            }
            el.onmousemove = (e) => {
                if(isDrag){
                    const x = e.pageX - el.offsetLeft;
                    const y = e.pageY - el.offsetTop;
                    c.lineTo(x, y)
                    c.stroke()
                    this.animateArr.push([x, y])
                }
            }
            el.onmouseup = () => {
                isDrag = false;
                this.animateArr.push(color)
            }
            el.onmouseout = () => {
                el.onmouseup()
            }
        }
        animateGo() {
            const {canvas:c} = this;
            const {width, height} = this.element;
            c.clearRect(0,0,width, height);
            c.beginPath()
            const loop = (animate, i) => {
                if(i< animate.length - 1){
                    const arr = animate[i]
                    if (typeof arr === 'string'){
                        c.beginPath()
                        c.strokeStyle = arr;
                        c.shadowColor = arr;
                    }else{
                        c.lineTo(arr[0], arr[1])
                        c.stroke()
                    }
                    i++
                    this.timeId = setTimeout(() => {
                        loop(animate, i)
                    },10) 
                }
            }
            loop(this.animateArr, 0)
        }
        clear() {
            this.animateArr = []
            const {canvas:c} = this;
            const {width, height} = this.element;
            c.clearRect(0,0,width, height);
        }
    }

    const g = new Draw('#canvas', 600, 500);
    g.init('#000');

    submitDom.onclick = () => {
        g.animateGo()
    }

    submitDom1.onclick = () => {
        g.clear()
    }

    colorDom.onchange = (e) => {
        g.init(e.target.value)
    }

```

:::
