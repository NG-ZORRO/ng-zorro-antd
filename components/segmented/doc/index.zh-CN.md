---
category: Components
subtitle: 分段控制器
type: 数据展示
title: Segmented
cover: 'https://gw.alipayobjects.com/zos/bmw-prod/a3ff040f-24ba-43e0-92e9-c845df1612ad.svg'
description: 用于展示多个选项并允许用户选择其中单个选项。
---

## 何时使用

- 用于展示多个选项并允许用户选择其中单个选项；
- 当切换选中选项时，关联区域的内容会发生变化。

## API

### nz-segmented

| 参数              | 说明                                      | 类型                                                                                                           | 默认值    | 全局配置 |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| `[nzBlock]`       | 将宽度调整为父元素宽度的选项              | `boolean`                                                                                                      | `false`   |          |
| `[nzDisabled]`    | 是否禁用                                  | `boolean`                                                                                                      | `false`   |          |
| `[nzOptions]`     | 数据化配置选项内容                        | `string[] \| number[] \| Array<{ label: string; value: string \| number; icon: string; disabled?: boolean; }>` | -         |          |
| `[nzSize]`        | 控件尺寸                                  | `large \| default \| small`                                                                                    | -         | ✅       |
| `[nzShape]`       | 形状                                      | `default \| round`                                                                                             | `default` | -        |
| `[nzVertical]`    | 排列方向                                  | `boolean`                                                                                                      | `false`   | -        |
| `[nzName]`        | 所有 `input[type="radio"]` 的 `name` 属性 | `string`                                                                                                       | -         |          |
| `[ngModel]`       | 当前选中项目的 value                      | `string \| number`                                                                                             | -         |          |
| `(nzValueChange)` | 当前选中项目变化时触发回调                | `EventEmitter<string \| number>`                                                                               | -         |          |
| `(ngModelChange)` | 当前选中项目变化时触发回调                | `EventEmitter<string \| number>`                                                                               | -         |          |

### label[nz-segmented-item]

| 参数           | 说明     | 类型               | 默认值  | 全局配置 |
| -------------- | -------- | ------------------ | ------- | -------- |
| `[nzIcon]`     | 图标     | `string`           | -       |          |
| `[nzValue]`    | 值       | `string \| number` | -       |          |
| `[nzDisabled]` | 是否禁用 | `boolean`          | `false` |          |
