---
category: Components
subtitle: 颜色选择器
type: 数据录入
title: ColorPicker
tag: 16.2.0
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PpY4RYNM8UcAAAAAAAAAAAAADrJ8AQ/original'
description: 用于颜色选择。
---

## 何时使用

当用户需要自定义颜色选择的时候使用。

## API

### nz-color-picker

| 参数                 | 说明                 | 类型                                               | 默认值      | 版本   |
| -------------------- | -------------------- | -------------------------------------------------- | ----------- | ------ |
| `[nzFormat]`         | 颜色格式             | `'rgb' \| 'hex' \| 'hsb'`                          | `'hex'`     |
| `[nzValue]`          | 颜色的值             | `string \| NzColor`                                | -           |
| `[nzSize]`           | 设置触发器大小       | `'large' \| 'small' \| 'default'`                  | `'default'` |
| `[nzDefaultValue]`   | 颜色默认的值         | `string \| NzColor`                                | -           |
| `[nzAllowClear]`     | 允许清除选择的颜色   | `boolean`                                          | `false`     |
| `[nzTrigger]`        | 颜色选择器的触发模式 | `'hover' \| 'click'`                               | `'click'`   |
| `[nzShowText]`       | 显示颜色文本         | `boolean`                                          | `false`     |
| `[nzOpen]`           | 是否显示弹出窗口     | `boolean`                                          | `false`     |
| `[nzDisabled]`       | 禁用颜色选择器       | `boolean`                                          | `false`     |
| `[nzDisabledAlpha]`  | 禁用透明度           | `boolean`                                          | `false`     |
| `[nzTitle]`          | 设置颜色选择器的标题 | `TemplateRef<void> \| string`                      | -           |
| `[nzPresets]`        | 预设的颜色           | `NzColorPickerPresetsItem[]`                       | -           | 21.0.0 |
| `(nzOnChange)`       | 颜色变化的回调       | `EventEmitter<{ color: NzColor; format: string }>` | -           |
| `(nzOnClear)`        | 清除的回调           | `EventEmitter<boolean>`                            | -           |
| `(nzOnFormatChange)` | 颜色格式变化的回调   | `EventEmitter<'rgb'｜'hex'｜'hsb'>`                | -           |
| `(nzOnOpenChange)`   | 打开颜色面板的回调   | `EventEmitter<boolean>`                            | -           |

### nz-color-block

| 参数          | 说明             | 类型                              | 默认值      |
| ------------- | ---------------- | --------------------------------- | ----------- |
| `[nzColor]`   | 模块的颜色       | `string`                          | `'#1677ff'` |
| `[nzSize]`    | 色彩块的大小     | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzOnClick]` | 点击色彩块的回调 | `EventEmitter<void>`              | -           |

### NzColor

| 参数          | 说明                                                           | 类型                                                    | 默认值 |
| ------------- | -------------------------------------------------------------- | ------------------------------------------------------- | ------ |
| `toHex`       | 转换成 `hex` 格式字符，返回格式如：`1677ff`                    | `() => string`                                          | -      |
| `toHexString` | 转换成 `hex` 格式颜色字符串，返回格式如：`#1677ff`             | `() => string`                                          | -      |
| `toHsb`       | 转换成 `hsb` 对象                                              | `() => ({ h: number, s: number, b: number, a number })` | -      |
| `toHsbString` | 转换成 `hsb` 格式颜色字符串，返回格式如：`hsb(215, 91%, 100%)` | `() => string`                                          | -      |
| `toRgb`       | 转换成 `rgb` 对象                                              | `() => ({ r: number, g: number, b: number, a number })` | -      |
| `toRgbString` | 转换成 `rgb` 格式颜色字符串，返回格式如：`rgb(22, 119, 255)`   | `() => string`                                          | -      |

## FAQ

### Q：滚动时浮层元素没有跟随滚动位置

默认情况下，浮层元素使用 `body` 作为滚动容器，如果使用了其他滚动容器，在自定义滚动容器元素上添加 [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) 指令。
注意：您需要从 `@angular/cdk/scrolling` 导入 `CdkScrollable` 指令或 `ScrollingModule` 模块。
