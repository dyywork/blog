---
date: 2022-12-12
category:
- javascript
	tag:
	- 读
---
	
# js 原生小效果

## 录屏
::: normal-demo

```html
<button id="btn_start">开始</button>
<button id="btn_end">结束</button>
<a id="stream"></a>
```

```js
var recoder = ''
document.querySelector('#btn_start').addEventListener('click', async () => {
   var videoStream = await navigator.mediaDevices.getDisplayMedia({video: true});
   var audioStream = await navigator.mediaDevices.getUserMedia({audio: true});
		 var tracks = []
		 videoStream.getVideoTracks().forEach(t => tracks.push(t))
    audioStream.getAudioTracks().forEach(t => tracks.push(t))
				var stream = new MediaStream(tracks)
        recoder = new MediaRecorder(stream); 
        let data = [];
        recoder.ondataavailable = function (e) {
            data.push(e.data);
				}
				recoder.onstop = function () {
					 this.stream.getTracks().forEach(track => track.stop())
						
					 let blob = new Blob(data, {type: this.minType});
            console.dir(document);
            let link = document.querySelector("#stream");
					 link.href = URL.createObjectURL(blob);
					 link.download = new Date().getTime()+ '.webm';
					 link.click();
					 URL.revokeObjectURL(link.href);
					 link.remove()
				}
				recoder.start();
		
})
document.querySelector('#btn_end').addEventListener('click', () => {
    recoder.stop();
})
```
:::

## 调用摄像头
::: normal-demo

```html
<button id="btn_start">开始</button>
<video width="600" height="300" autoplay id="video"></video>
```

```js
document.querySelector('#btn_start').addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({video: true}).then(stm => {
        document.querySelector('#video').srcObject= stm;
		})
})
```
:::

## 选中朗读
::: normal-demo

```html
<div class="box">
	<p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。
    参差荇菜，左右流之。窈窕淑女，寤寐求之。
    求之不得，寤寐思服。悠哉悠哉，辗转反侧。
    参差荇菜，左右采之。窈窕淑女，琴瑟友之。
    参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。</p>
</div>
```

```js
const syn = window.speechSynthesis;

document.addEventListener('mouseup', () => {
    const txt = window.getSelection().toString();
    const txtSyn = new SpeechSynthesisUtterance(txt)
		syn.speak(txtSyn)
})
```
:::
