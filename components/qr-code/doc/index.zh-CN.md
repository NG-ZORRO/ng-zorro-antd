---
category: Components
subtitle: 二维码
type: 数据展示
title: QRCode
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO 实验性功能是指已发布但不稳定或者还未准备好用于生产环境的功能。</p>
<p>开发者或用户可以选择在正式发布前使用这些功能，但是每次发布版本时都可能存在 <strong>breaking changes</strong>。</p>
</blockquote>

## 何时使用

当需要将链接转换成为二维码时使用。

### 引入模块

```ts
import { NzQrCodeModule } from 'ng-zorro-antd/qr-code';
```

## API

### nz-qrcode

| 参数             | 说明                 | 类型                              | 默认值                            |
| ---------------- | -------------------- | --------------------------------- | --------------------------------- |
| `[nzValue]`      | 扫描后的地址         | `string`                          | -                                 |
| `[nzColor]`      | 二维码颜色           | `{ dark: string, light: string }` | `{ dark: '#000', light: '#fff' }` |
| `[nzSize]`       | 二维码大小           | `number`                          | `160`                             |
| `[nzIcon]`       | 二维码中 logo 地址   | `string`                          | -                                 |
| `[nzIconColor]`  | 二维码中 logo 背景色 | `string`                          | `#fff`                            |
| `[nzIconSize]`   | 二维码中 logo 大小   | `number`                          | `40`                              |
| `[nzBordered]`   | 是否有边框           | `boolean`                         | `true`                            |
| `[nzStatus]`     | 二维码状态           | `'active'｜'expired' ｜'loading'` | `active`                          |
| `[nzErrorLevel]` | 二维码纠错等级       | `'L'｜'M'｜'Q'｜'H'`              | `M`                               |
| `(nzRefresh)`    | 点击"点击刷新"的回调 | `EventEmitter<string>`            | -                                 |

## 注意

### 二维码无法识别

`nzValue` 保守的上限为 738 或更少的字符串。如果使用纠错等级， `nzValue` 上限会降低。

### 关于二维码纠错等级

纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。

通常情况下二维码分为 4 个纠错级别：`L级` 可纠正约 `7%` 错误、`M级` 可纠正约 `15%` 错误、`Q级` 可纠正约 `25%` 错误、`H级` 可纠正约 `30%` 错误。并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。

> 有关更多信息，可参阅相关资料：[https://www.qrcode.com/zh/about/error_correction](https://www.qrcode.com/zh/about/error_correction.html)
