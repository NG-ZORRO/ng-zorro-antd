---
category: Components
type: Data Display
title: QRCode
tag: 15.1.0
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cJopQrf0ncwAAAAAAAAAAAAADrJ8AQ/original'
description: Convert text into QR codes, and support custom color and logo.
---

## When To Use

Used when the text needs to be converted into a QR Code.

## API

### nz-qrcode

| Property           | Description                                                                                                  | Type                                        | Default     | Version           |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------- | ----------- | ----------------- |
| `[nzValue]`        | scanned text                                                                                                 | `string \| string[]`                        | -           | `string[]`:21.0.0 |
| `[nzType]`         | render type                                                                                                  | `'canvas'\|'svg'`                           | `canvas`    | 21.0.0            |
| `[nzColor]`        | QR code Color                                                                                                | `string`                                    | `'#000000'` |
| `[nzBgColor]`      | QR code background color                                                                                     | `string`                                    | `'#FFFFFF'` |
| `[nzSize]`         | QR code Size                                                                                                 | `number`                                    | `160`       |
| `[nzPadding]`      | QR code Padding                                                                                              | `number`                                    | `0`         |
| `[nzIcon]`         | Icon address in QR code                                                                                      | `string`                                    | -           |
| `[nzIconSize]`     | The size of the icon in the QR code                                                                          | `number`                                    | `40`        |
| `[nzBordered]`     | Whether has border style                                                                                     | `boolean`                                   | `true`      |
| `[nzStatus]`       | QR code status                                                                                               | `'active'\|'expired'\|'loading'\|'scanned'` | `'active'`  |
| `[nzStatusRender]` | custom status                                                                                                | `TemplateRef<void> \| string`               | -           |
| `[nzLevel]`        | Error Code Level                                                                                             | `'L'\|'M'\|'Q'\|'H'`                        | `'M'`       |
| `[nzBoostLevel]`   | If enabled, the Error Correction Level of the result may be higher than the specified Error Correction Level | `boolean`                                   | `true`      | 21.0.0            |
| `(nzRefresh)`      | callback                                                                                                     | `EventEmitter<string>`                      | -           |

## Note

### Invalid QR Code

`nzValue` has a conservative upper limit of 738 or fewer strings. If error correction levels are used, the `nzValue`
upper limit will be lowered.

### QR Code error correction level

The ErrorLevel means that the QR code can be scanned normally after being blocked, and the maximum area that can be
blocked is the error correction rate.

Generally, the QR code is divided into 4 error correction levels: Level `L` can correct about `7%` errors, Level `M` can
correct about `15%` errors, Level `Q` can correct about `25%` errors, and Level `H` can correct about `30%` errors. When
the content encoding of the QR code carries less information, in other words, when the value link is short, set
different error correction levels, and the generated image will not change.

> For more information, see
> the: [https://www.qrcode.com/en/about/error_correction](https://www.qrcode.com/en/about/error_correction.html)
