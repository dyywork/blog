---
date: 2022-11-09
category:
- css
---

# CSS 效果

## 异型盒子

::: normal-demo

```html
<div class="box">
  <span>测试</span>
</div>
```

```css
.box {
  display: flex;
  text-align: center;
  width: 200px;
  height: 50px;
  background: #Ec3dF1;
}
.box span {
  order: 1;
  flex: 1;
  line-height: 50px;
  color: #FFFFFF;
  font-size: 20px;
}
.box::before {
  content: "";
  display: block;
  height: 50px;
  width: 50px;
  border-top-right-radius: 50%;
  background: #FFFFFF;
}
.box::after {
  content: "";
  display: block;
  height: 20px;
  width: 20px;
  align-self: flex-end;
  background-image: radial-gradient(20px at 20px 0px, #Ec3dF1 96.5%, #fff 100%);
}

```

:::

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

## 登录按钮特效

::: normal-demo

```html
<div class="button-box">
  <div class="button">
    <a>登录</a>
  </div>
</div>

```

```css
.button-box{
  background: #1c1d21;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
 .button{
  height: 50px;
  width: 150px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
}
.button a{
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  box-shadow: 0 15px 35px rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  position: absolute;
  font-size: 18px;
  font-weight: 700;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  letter-spacing: 1px;
  overflow: hidden;
  backdrop-filter: blur(15px);
  z-index: 1;
  transition: 0.5s;
  align-items: center;
  text-decoration: none;
}
 .button a::after{
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 50%;
   height: 100%;
   background: linear-gradient(to left,rgba(255, 255, 255, 0.15), transparent);
   transform: skew(45deg) translateX(0);
   transition: 0.5s;
 }
.button:hover a::after{
  transform: skew(45deg) translateX(200%);
}

.button::before{
    content: '';
    position: absolute;
    left: 50%;
    top: 32px;
    height: 10px;
    width: 0;
    background: #f00;
    transform: translateX(-50%);
    border-radius: 10px;
    transition: 0.5s;
    transition-delay: 0s;
}
.button:hover::before{
    top: 27px;
    height: 50%;
    width: 80%;
    border-radius: 30px;
    transition-delay: 0.5s;
}
.button::after{
 content: '';
 position: absolute;
  left: 50%;
  top: 0px;
  height: 10px;
  width: 0;
  background: #f00;
  transform: translateX(-50%);
  border-radius: 10px;
  transition: 0.5s;
  transition-delay: 0s;
}
.button:hover::after{
  top: 0;
  height: 50%;
  width: 80%;
  border-radius: 30px;
  transition-delay: 0.5s;
}
.button::before, .button::after{
  background: #fc2f70;
  box-shadow: 0 0 5px #fc2f70, 0 0 15px #fc2f70, 0 0 30px #fc2f70, 0 0 60px #fc2f70;
}
.button:active a{
  color: #000;
}
```

:::
