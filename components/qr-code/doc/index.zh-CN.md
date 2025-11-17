---
category: Components
subtitle: 二维码
type: 数据展示
title: QRCode
tag: 15.1.0
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cJopQrf0ncwAAAAAAAAAAAAADrJ8AQ/original'
description: 能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置。
---

## 何时使用

当需要将文本转换成为二维码时使用。

## API

### nz-qrcode

| 参数               | 说明                                                               | 类型                                        | 默认值      | 版本              |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------- | ----------- | ----------------- |
| `[nzValue]`        | 扫描后的文本                                                       | `string \| string[]`                        | -           | `string[]`:21.0.0 |
| `[nzType]`         | 渲染类型                                                           | `'canvas'\|'svg'`                           | `canvas`    | 21.0.0            |
| `[nzColor]`        | 二维码颜色                                                         | `string`                                    | `'#000000'` |
| `[nzBgColor]`      | 二维码背景颜色                                                     | `string`                                    | `'#FFFFFF'` |
| `[nzSize]`         | 二维码大小                                                         | `number`                                    | `160`       |
| `[nzPadding]`      | 二维码填充                                                         | `number`                                    | `0`         |
| `[nzIcon]`         | 二维码中 icon 地址                                                 | `string`                                    | -           |
| `[nzIconSize]`     | 二维码中 icon 大小                                                 | `number`                                    | `40`        |
| `[nzBordered]`     | 是否有边框                                                         | `boolean`                                   | `true`      |
| `[nzStatus]`       | 二维码状态                                                         | `'active'\|'expired'\|'loading'\|'scanned'` | `'active'`  |
| `[nzStatusRender]` | 自定义状态渲染器                                                   | `TemplateRef<void> \| string`               | -           |
| `[nzLevel]`        | 二维码容错等级                                                     | `'L'\|'M'\|'Q'\|'H'`                        | `'M'`       |
| `[nzBoostLevel]`   | 如果启用，自动提升纠错等级，结果的纠错级别可能会高于指定的纠错级别 | `boolean`                                   | `true`      | 21.0.0            |
| `(nzRefresh)`      | 点击"点击刷新"的回调                                               | `EventEmitter<string>`                      | -           |

## 注意

### 二维码无法识别

`nzValue` 保守的上限为 738 或更少的字符串。如果使用容错等级，`nzValue` 上限会降低。

### 关于二维码容错等级

容错等级也叫容错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是容错率。

通常情况下二维码分为 4 个容错等级：`L级` 可纠正约 `7%` 错误、`M级` 可纠正约 `15%` 错误、`Q级` 可纠正约 `25%` 错误、`H级`
可纠正约 `30%`
错误。并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的容错等级，生成的图片不会发生变化。

> 有关更多信息，可参阅相关资料：[https://www.qrcode.com/zh/about/error_correction](https://www.qrcode.com/zh/about/error_correction.html)
