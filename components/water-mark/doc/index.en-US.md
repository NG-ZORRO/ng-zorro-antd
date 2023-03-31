---
category: Components
type: Other
cols: 1
title: WaterMark
cover: https://img.alicdn.com/imgextra/i3/O1CN0194FGAd1FlrwQShfR8_!!6000000000528-0-tps-952-502.jpg
---

Add specific text or patterns to the page.

## When To Use

- Use when the page needs to be watermarked to identify the copyright.
- Suitable for preventing information theft.

```ts
import { NzWaterMarkModule } from 'ng-zorro-antd/water-mark';
```

## API

### nz-water-mark

| Property    | Description                                                                                       | Type                 | Default                  |
| ----------- | ------------------------------------------------------------------------------------------------- | -------------------- | ------------------------ |
| `nzContent` | Watermark text content                                                                            | `string ｜ string[]` | -                        |
| `nzWidth`   | The width of the watermark, the default value of `nzContent` is its own width                     | `number`             | 120                      |
| `nzHeight`  | The height of the watermark, the default value of `nzContent` is its own height                   | `number`             | 64                       |
| `nzRotate`  | When the watermark is drawn, the rotation Angle, unit `°`                                         | `number`             | -22                      |
| `nzZIndex`  | The z-index of the appended watermark element                                                     | `number`             | 9                        |
| `nzImage`   | Image source, it is recommended to export 2x or 3x image, high priority (support base64 format)   | `string`             | -                        |
| `nzFont`    | Text style                                                                                        | `FontType`           | FontType                 |
| `nzGap`     | The spacing between watermarks                                                                    | `[number, number]`   | [100, 100]               |
| `nzOffset`  | The offset of the watermark from the upper left corner of the container. The default is `nzGap/2` | `[number, number]`   | [nzGap[0]/2, nzGap[1]/2] |

### FontType

| Property     | Description | Type                                  | Default         |
| ------------ | ----------- | ------------------------------------- | --------------- |
| `color`      | font color  | `string`                              | rgba(0,0,0,.15) |
| `fontSize`   | font size   | `number`                              | 16              |
| `fontWeight` | font weight | `normal ｜ light ｜ weight ｜ number` | normal          |
| `fontFamily` | font family | `string`                              | sans-serif      |
| `fontStyle`  | font style  | `none ｜ normal ｜ italic ｜ oblique` | normal          |

## FAQ

### Handle abnormal image watermarks

When using an image watermark and the image loads abnormally, you can add `nzContent` at the same time to prevent the watermark from becoming invalid.

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
