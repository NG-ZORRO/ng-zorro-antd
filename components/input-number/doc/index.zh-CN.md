---
category: Components
subtitle: 数字输入框
type: 数据录入
title: InputNumber
cover: 'https://gw.alipayobjects.com/zos/alicdn/XOS8qZ0kU/InputNumber.svg'
tag: 19.0.0
description: 通过鼠标或键盘，输入范围内的数值。
---

## 何时使用

当需要获取标准数值时。

## API

### nz-input-number

| 参数              | 说明                                                           | 类型                                                                    | 默认值                                                                                                                              | 版本   |
| ----------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `[ngModel]`       | 当前值，可双向绑定                                             | `number`                                                                | -                                                                                                                                   |
| `[nzId]`          | 输入框的 ID                                                    | `string`                                                                | -                                                                                                                                   |
| `[nzPlaceHolder]` | 占位符                                                         | `string`                                                                | -                                                                                                                                   |
| `[nzAutoFocus]`   | 自动获取焦点                                                   | `boolean`                                                               | `false`                                                                                                                             |
| `[nzVariant]`     | 形态变体                                                       | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'`                | `'outlined'`                                                                                                                        | 20.0.0 |
| `[nzControls]`    | 是否显示增减按钮                                               | `boolean`                                                               | `true`                                                                                                                              |
| `[nzDisabled]`    | 是否禁用                                                       | `boolean`                                                               | `false`                                                                                                                             |
| `[nzFormatter]`   | 指定输入框展示值的格式                                         | `(value: number) => string`                                             | -                                                                                                                                   |
| `[nzKeyboard]`    | 是否启用键盘快捷行为                                           | `boolean`                                                               | `true`                                                                                                                              |
| `[nzMax]`         | 最大值                                                         | `number`                                                                | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) |
| `[nzMin]`         | 最小值                                                         | `number`                                                                | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) |
| `[nzParser]`      | 指定从 `formatter` 里转换回数字的方式，和 `formatter` 搭配使用 | `(value: string) => number`                                             | -                                                                                                                                   |
| `[nzPrecision]`   | 数值精度，配置 `formatter` 时会以 `formatter` 为准             | `number`                                                                | -                                                                                                                                   |
| `[nzReadOnly]`    | 是否只读                                                       | `boolean`                                                               | `false`                                                                                                                             |
| `[nzStatus]`      | 状态，可选 `error` `warning`                                   | `'error' \| 'warning'`                                                  | -                                                                                                                                   |
| `[nzSize]`        | 输入框大小，可选 `large` `default` `small`                     | `'large' \| 'small' \| 'default'`                                       | `'default'`                                                                                                                         |
| `[nzStep]`        | 每次改变步数，可以是小数                                       | `number`                                                                | `1`                                                                                                                                 |
| `[nzAddonBefore]` | 带标签的 input-number，设置前置标签                            | `string`                                                                | -                                                                                                                                   |
| `[nzAddonAfter]`  | 带标签的 input-number，设置后置标签                            | `string`                                                                | -                                                                                                                                   |
| `[nzPrefix]`      | 带有前缀图标的 input-number                                    | `string`                                                                | -                                                                                                                                   |
| `[nzSuffix]`      | 带有后缀图标的 input-number                                    | `string`                                                                | -                                                                                                                                   |
| `(nzOnStep)`      | 点击上下箭头的回调                                             | `EventEmitter<{ value: number, offset: number, type: 'up' \| 'down' }>` | -                                                                                                                                   |
| `(nzFocus)`       | focus 时回调                                                   | `OutputRef<void>`                                                       | -                                                                                                                                   |
| `(nzBlur)`        | blur 时回调                                                    | `OutputRef<void>`                                                       | -                                                                                                                                   |
| `(ngModelChange)` | 值变化时的回调函数                                             | `EventEmitter<number>`                                                  | -                                                                                                                                   |

#### 方法

通过 `ViewChild` 等方法获得实例后调用

| 名称    | 描述     |
| ------- | -------- |
| focus() | 获取焦点 |
| blur()  | 移除焦点 |

## FAQ

### 为何受控模式下，`value` 可以超出 `min` 和 `max` 范围？

在受控模式下，开发者可能自行存储相关数据。如果组件将数据约束回范围内，会导致展示数据与实际存储数据不一致的情况。这使得一些如表单场景存在潜在的数据问题。
