---
category: Components
type: Data Entry
title: ColorPicker
tag: New
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PpY4RYNM8UcAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

Used when the user needs to customize the color selection.

```ts
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
```

## API

Install `ng-antd-color-picker` in your project first:

```sh
npm install ng-antd-color-picker
```

### nz-color-picker:standalone

| Parameter            | Description                           | Type                                               | Default   |
|----------------------|---------------------------------------|----------------------------------------------------|-----------|
| `[nzFormat]`         | Format of color                       | `rgb`｜`hex`｜`hsb`                                  | `hex`     |
| `[nzValue]`          | Value of color                        | `string`｜`NzColor`                                 | -         |
| `[nzSize]`           | Setting the trigger size              | `large`｜`default`｜`small`                          | `default` |
| `[nzDefaultValue]`   | Default value of color                | `string`｜`NzColor`                                 | `false`   |
| `[nzAllowClear]`     | Allow clearing color selected         | `boolean`                                          | `false`   |
| `[nzTrigger]`        | ColorPicker trigger mode              | `hover`｜`click`                                    | `click`   |
| `[nzShowText]`       | Show color text                       | `boolean`                                          | `false`   |
| `[nzOpen]`           | Whether to show popups                | `boolean`                                          | `false`   |
| `[nzDisabled]`       | Disable ColorPicker                   | `boolean`                                          | `false`   |
| `[nzDisabledAlpha]`  | Disable Alpha                         | `boolean`                                          | `false`   |
| `[nzTitle]`          | Setting the title of the color picker | `TemplateRef<void>`｜`string`                       | -         |
| `(nzOnChange)`       | Callback when value is changed        | `EventEmitter<{ color: NzColor; format: string }>` | -         |
| `(nzOnClear)`        | Called when clear                     | `EventEmitter<boolean>`                            | -         |
| `(nzOnFormatChange)` | Callback when `format` is changed     | `EventEmitter<'rgb'｜'hex'｜'hsb'>`                  | -         |
| `(nzOnOpenChange)`   | Callback for opening the color panel  | `EventEmitter<boolean>`                            | -         |

### nz-color-block:standalone

| Parameter     | Description                            | Type                      | Default   |
|---------------|----------------------------------------|---------------------------|-----------|
| `[nzColor]`   | Module colors                          | `string`                  | `#1677ff` |
| `[nzSize]`    | Color block size                       | `large`｜`default`｜`small` | `default` |
| `[nzOnClick]` | Callbacks for clicking on color blocks | `EventEmitter<boolean>`   | -         |

### NzColor

| Parameter     | Description                                                                       | Type                                                    | Default |
|---------------|-----------------------------------------------------------------------------------|---------------------------------------------------------|---------|
| `toHex`       | Convert to `hex` format characters, the return type like: `1677ff`                | `() => string`                                          | -       |
| `toHexString` | Convert to `hex` format color string, the return type like: `#1677ff`             | `() => string`                                          | -       |
| `toHsb`       | Convert to `hsb` object                                                           | `() => ({ h: number, s: number, b: number, a number })` | -       |
| `toHsbString` | Convert to `hsb` format color string, the return type like: `hsb(215, 91%, 100%)` | `() => string`                                          | -       |
| `toRgb`       | Convert to `rgb` object                                                           | `() => ({ r: number, g: number, b: number, a number })` | -       |
| `toRgbString` | Convert to `rgb` format color string, the return type like: `rgb(22, 119, 255)`   | `() => string`                                          | -       |
