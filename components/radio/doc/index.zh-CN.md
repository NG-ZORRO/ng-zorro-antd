---
category: Components
subtitle: 单选框
type: 数据录入
title: Radio
cover: 'https://gw.alipayobjects.com/zos/alicdn/8cYb5seNB/Radio.svg'
description: 用于在多个备选项中选中单个状态。
---

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## API

### [nz-radio] | [nz-radio-button]

| 参数              | 说明                                     | 类型                    | 默认值  |
| ----------------- | ---------------------------------------- | ----------------------- | ------- |
| `[nzAutoFocus]`   | 自动获取焦点                             | `boolean`               | `false` |
| `[nzDisabled]`    | 设定 disable 状态                        | `boolean`               | `false` |
| `[ngModel]`       | 指定当前是否选中，可双向绑定             | `boolean`               | `false` |
| `[nzValue]`       | 设置 value，与 `nz-radio-group` 配合使用 | `any`                   | -       |
| `(ngModelChange)` | 选中变化时回调                           | `EventEmitter<boolean>` | -       |

### nz-radio-group

单选框组合，用于包裹一组 `nz-radio`。

| 参数              | 说明                                                         | 类型                              | 默认值      |
| ----------------- | ------------------------------------------------------------ | --------------------------------- | ----------- |
| `[ngModel]`       | 指定选中的 `nz-radio` 的 value 值                            | `any`                             | -           |
| `[nzName]`        | `nz-radio-group` 下所有 `input[type="radio"]` 的 `name` 属性 | `string`                          | -           |
| `[nzDisabled]`    | 设定所有 `nz-radio` disable 状态                             | `boolean`                         | `false`     |
| `[nzSize]`        | 大小，只对按钮样式生效                                       | `'large' \| 'small' \| 'default'` | `'default'` |
| `(ngModelChange)` | 选中变化时回调                                               | `EventEmitter<boolean>`           | -           |
| `[nzButtonStyle]` | RadioButton 的风格样式，目前有描边和填色两种风格             | `'outline' \| 'solid'`            | `'outline'` |

## 方法

### [nz-radio]

可以通过 `ViewChild` 等其他方式获取 `NzRadioComponent` 使用以下方法

| 名称      | 描述     |
| --------- | -------- |
| `blur()`  | 移除焦点 |
| `focus()` | 获取焦点 |
