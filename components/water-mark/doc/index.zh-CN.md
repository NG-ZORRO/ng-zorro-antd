---
category: Components
type: 其他
subtitle: 水印
title: WaterMark
cols: 1
cover: https://img.alicdn.com/imgextra/i3/O1CN0194FGAd1FlrwQShfR8_!!6000000000528-0-tps-952-502.jpg
---

给页面的某个区域加上水印。

## 何时使用

- 页面需要添加水印标识版权时使用。
- 适用于防止信息盗用。

```ts
import { NzWaterMarkModule } from 'ng-zorro-antd/water-mark';
```

## API

### nz-water-mark

| 参数        | 说明                                                        | 类型                 | 默认值                   |
| ----------- | ----------------------------------------------------------- | -------------------- | ------------------------ |
| `nzContent` | 水印文字内容                                                | `string ｜ string[]` | -                        |
| `nzWidth`   | 水印的宽度，`nzContent` 的默认值为自身的宽度                | `number`             | 120                      |
| `nzHeight`  | 水印的高度，`nzContent` 的默认值为自身的高度                | `number`             | 64                       |
| `nzRotate`  | 水印绘制时，旋转的角度，单位 `°`                            | `number`             | -22                      |
| `nzZIndex`  | 追加的水印元素的 z-index                                    | `number`             | 9                        |
| `nzImage`   | 图片源，建议导出 2 倍或 3 倍图，优先级高 (支持 base64 格式) | `string`             | -                        |
| `nzFont`    | 文字样式                                                    | `FontType`           | FontType                 |
| `nzGap`     | 水印之间的间距                                              | `[number, number]`   | [100, 100]               |
| `nzOffset`  | 水印距离容器左上角的偏移量，默认为 `nzGap/2`                | `[number, number]`   | [nzGap[0]/2, nzGap[1]/2] |

### FontType

| 参数         | 说明     | 类型                                  | 默认值          |
| ------------ | -------- | ------------------------------------- | --------------- |
| `color`      | 字体颜色 | `string`                              | rgba(0,0,0,.15) |
| `fontSize`   | 字体大小 | `number`                              | 16              |
| `fontWeight` | 字体粗细 | `normal ｜ light ｜ weight ｜ number` | normal          |
| `fontFamily` | 字体类型 | `string`                              | sans-serif      |
| `fontStyle`  | 字体样式 | `none ｜ normal ｜ italic ｜ oblique` | normal          |

## FAQ

### 处理异常图片水印

当使用图片水印且图片加载异常时，可以同时添加 `nzContent` 防止水印失效。

```ts
<nz-water-mark
  [nzWidth]="212"
  [nzHeight]="32"
  nzContent="NG Ant Design"
  nzImage="https://img.alicdn.com/imgextra/i3/O1CN01UR3Zkq1va9fnZsZcr_!!6000000006188-55-tps-424-64.svg"
>
  <div style="height: 500px"></div>
</nz-water-mark>
```
