---
date: 2026/05/28
category: canvas
---

# uni-app 大分辨率 Canvas 海报生成

## 背景

在页面中，海报需要高清大图（2230 x 3152），用于印刷级展示。

## 核心思路

- 使用 Canvas 2D API（`type="2d"`）获取完整 Canvas 节点控制权
- Canvas 内部宽高设为大分辨率（2230 x 3152），CSS 显示设为小尺寸（602 x 851rpx）
- 通过 `uni.canvasToTempFilePath` 导出高清图片，再调用 `uni.saveImageToPhotosAlbum` 保存

## 关键代码

### 1. Canvas 元素定义

```vue
<canvas class="mg-canvas" type="2d" id="mgCanvas"></canvas>
```

- `type="2d"`：使用 Canvas 2D 接口（而非旧版绘图接口），可在小程序中获取完整 Canvas 节点
- `id="mgCanvas"`：供 `createSelectorQuery` 查找

CSS 控制显示大小（比内部分辨率小得多）：

```scss
.mg-canvas {
  width: 602rpx;
  height: 851rpx;
}
```

### 2. 获取 Canvas 节点（Promise 封装）

```javascript
getCanvasNode() {
  return new Promise((resolve, reject) => {
    const query = uni.createSelectorQuery()
    query.select('#mgCanvas').fields({ node: true, size: true }).exec((res) => {
      if (res[0] && res[0].node) resolve(res[0].node)
      else reject(new Error('Canvas node not found'))
    })
  })
}
```

关键点：
- `uni.createSelectorQuery()`：小程序版 `document.querySelector`
- `.fields({ node: true, size: true })`：声明需要获取 `node`（Canvas 对象）和 `size`（宽高）
- `.exec()`：异步执行查询
- 返回 Promise 方便 async/await 链式调用

### 3. Canvas 加载网络图片（兼容小程序）

```javascript
loadCanvasImage(canvas, src) {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src,
      success: (info) => {
        const img = canvas.createImage()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = info.path
      },
      fail: reject,
    })
  })
}
```

为什么需要两步加载？
1. `uni.getImageInfo(src)` — 将网络图片下载到本地临时路径（info.path），小程序 Canvas 不能直接绘制网络图片（受域名白名单限制）
2. `canvas.createImage()` + `img.src = info.path` — 用本地临时路径创建图片对象，等 onload 后绘制

### 4. 大分辨率海报生成（核心逻辑）

```javascript
async handleCanvas() {
  this.showCanvas = true
  // 获取二维码图片 URL（后端生成带参数的微信小程序码）
  const { data: qrImgUrl } = await getStoredGiftCardSharePic({...})

  this.$nextTick(async () => {
    const canvas = await this.getCanvasNode()
    const ctx = canvas.getContext('2d')

    // ★ 关键：设置超高分辨率（2230 x 3152）
    canvas.width = 2230
    canvas.height = 3152

    // 并行加载背景图和二维码
    const [bgImg, qrImg] = await Promise.all([
      this.loadCanvasImage(canvas, bgImgUrl),
      this.loadCanvasImage(canvas, qrImgUrl),
    ])

    // 1. 绘制白色背景
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, 2230, 3152)

    // 2. 绘制海报背景图（铺满全画布）
    ctx.drawImage(bgImg, 0, 0, 2230, 3152)

    // 3. 绘制圆形二维码（clip 裁剪）
    ctx.save()
    ctx.beginPath()
    ctx.arc(1700, 2620, 325, 0, Math.PI * 2) // 圆心(1700,2620) 半径325
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()        // 先画白色圆底
    ctx.clip()        // 裁剪为圆形区域
    ctx.drawImage(qrImg, 1700 - 315, 2620 - 315, 630, 630) // 在裁剪区域内绘制二维码
    ctx.restore()
  })
}
```

**大分辨率实现原理**：

| 属性 | 值 | 作用 |
|------|-----|------|
| `canvas.width / height` | **2230 x 3152** | Canvas 内部像素尺寸（决定导出图片清晰度） |
| CSS `width / height` | **602rpx x 851rpx** | 屏幕显示尺寸（用户看到的预览大小） |
| 导出方式 | `uni.canvasToTempFilePath` | 按 Canvas 内部像素导出（2230 x 3152） |

关键点：`canvas.width/height` 和 CSS width/height 是两个独立的维度。导出时按 Canvas 内部像素导出，得到高清大图。

### 5. 保存图片到相册

```javascript
handleSaveImg() {
  this.getCanvasNode().then((canvas) => {
    uni.canvasToTempFilePath({
      canvas,             // Canvas 节点对象
      success: (res) => {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,  // Canvas 导出的临时文件路径
          success: () => this.$u.toast('保存成功'),
          fail: () => this.$u.toast('保存失败，请重试'),
        })
      },
    })
  })
}
```

- `uni.canvasToTempFilePath`：将 Canvas 内容导出为临时图片文件（按 Canvas 内部分辨率 2230x3152 导出）
- `uni.saveImageToPhotosAlbum`：将临时文件保存到系统相册

### 6. 操作流程

```
用户选择
        ↓
点击"生成"
        ↓
请求后端 → 获取带参数的小程序码
        ↓
弹出弹窗（显示 Canvas 预览，实际是低分辨率 CSS 展示）
        ↓
并行加载背景图 + 二维码
        ↓
Canvas 绘制（2230x3152 大分辨率）
        ↓
用户操作：
  ├─ "保存图片" → canvasToTempFilePath → saveImageToPhotosAlbum
  └─ "分享微信好友" → open-type="share" 原生分享
```

## 技术要点总结

1. **大分辨率**：设置 Canvas 内部宽高为打印级分辨率（2230x3152），CSS 仅控制显示尺寸，导出时按内部像素导出
2. **Canvas 2D API**：使用 `type="2d"` 获取完整节点控制，小程序中推荐用法
3. **图片加载**：网络图片需通过 `uni.getImageInfo` 下载为临时路径后再用 `canvas.createImage()` 加载
4. **圆形裁剪**：`ctx.save()` → `ctx.beginPath()` → `ctx.arc()` → `ctx.clip()` → `ctx.drawImage()` → `ctx.restore()`
5. **链式 Promise**：`getCanvasNode` → `loadCanvasImage` → `canvasToTempFilePath` → `saveImageToPhotosAlbum`
