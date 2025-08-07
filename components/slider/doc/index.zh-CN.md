---
category: Components
subtitle: 滑动输入条
type: 数据录入
title: Slider
cover: 'https://gw.alipayobjects.com/zos/alicdn/HZ3meFc6W/Silder.svg'
description: 滑动型输入器，展示当前值和可选范围。
---

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## API

### nz-slider

| 参数                   | 说明                                                                                                                                               | 类型                                             | 默认值                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| `[nzDisabled]`         | 值为 `true` 时，滑块为禁用状态                                                                                                                     | `boolean`                                        | `false`                                                                          |
| `[nzDots]`             | 是否只能拖拽到刻度上                                                                                                                               | `boolean`                                        | `false`                                                                          |
| `[nzIncluded]`         | `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列                                                                             | `boolean`                                        | `true`                                                                           |
| `[nzMarks]`            | 刻度标记，key 的类型必须为 `number` 且取值在闭区间 `[min, max]` 内，每个标签可以单独设置样式                                                       | `object`                                         | `{ number: string/HTML }` or `{ number: { style: object, label: string/HTML } }` |
| `[nzMax]`              | 最大值                                                                                                                                             | `number`                                         | `100`                                                                            |
| `[nzMin]`              | 最小值                                                                                                                                             | `number`                                         | `0`                                                                              |
| `[nzRange]`            | 双滑块模式                                                                                                                                         | `boolean`                                        | `false`                                                                          |
| `[nzStep]`             | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 `null`，此时 Slider 的可选值仅有 marks 标出来的部分。 | `number \| null`                                 | `1`                                                                              |
| `[nzTipFormatter]`     | Slider 会把当前值传给 `nzTipFormatter`，并在 Tooltip 中显示 `nzTipFormatter` 的返回值，若为 null，则隐藏 Tooltip。                                 | `(value: number) => string \| TemplateRef<void>` | -                                                                                |
| `[ngModel]`            | 设置当前取值。当 `range` 为 `false` 时，使用 `number`，否则用 `[number, number]`                                                                   | `number \| number[]`                             | -                                                                                |
| `[nzVertical]`         | 值为 `true` 时，Slider 为垂直方向                                                                                                                  | `boolean`                                        | `false`                                                                          |
| `[nzReverse]`          | 反向坐标轴                                                                                                                                         | `boolean`                                        | `false`                                                                          |
| `[nzTooltipVisible]`   | 值为 `always` 时总是显示，值为 `never` 时在任何情况下都不显示                                                                                      | `'default' \| 'always' \| 'never'`               | `'default'`                                                                      |
| `[nzTooltipPlacement]` | 设置 Tooltip 的默认位置。                                                                                                                          | `string`                                         |                                                                                  |
| `(nzOnAfterChange)`    | 与 `onmouseup` 触发时机一致，把当前值作为参数传入。                                                                                                | `EventEmitter<number[] \| number>`               | -                                                                                |
| `(ngModelChange)`      | 当 Slider 的值发生改变时，会触发 ngModelChange 事件，并把改变后的值作为参数传入。                                                                  | `EventEmitter<number[] \| number>>`              | -                                                                                |
