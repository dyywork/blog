---
date: 2022-11-10
category:
- canvas
---

# canvas

::: normal-demo 画板

```html
<div>
  <button id="submit">重绘</button>
  <button id="clear">清空</button>
  <input type="color" id="color">
</div>
<canvas  style="border: 1px #000 solid;" id="canvasDom"></canvas>
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
                    console.dir(el);
                    console.log(y);
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

    const g = new Draw('#canvasDom', 670, 300);
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