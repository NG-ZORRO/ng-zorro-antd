---
category: Components
subtitle: 时间选择框
type: 数据录入
title: TimePicker
cover: 'https://gw.alipayobjects.com/zos/alicdn/h04Zsl98I/TimePicker.svg'
description: 输入或选择时间的控件。
---

## 何时使用

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## API

### nz-time-picker

| 参数                      | 说明                                                    | 类型                                                     | 默认值         | 全局配置 |
| ------------------------- | ------------------------------------------------------- | -------------------------------------------------------- | -------------- | -------- |
| `[nzId]`                  | 组件内部 input 的 id 值                                 | `string`                                                 | -              |
| `[ngModel]`               | 当前时间                                                | `Date`                                                   | -              |
| `[nzAddOn]`               | 选择框底部显示自定义的内容                              | `TemplateRef<void>`                                      | -              |
| `[nzAllowEmpty]`          | 是否展示清除按钮                                        | `boolean`                                                | `true`         | ✅       |
| `[nzAutoFocus]`           | 自动获取焦点                                            | `boolean`                                                | `false`        |
| `[nzBackdrop]`            | 浮层是否应带有背景板                                    | `boolean`                                                | `false`        |
| `[nzClearText]`           | 清除按钮的提示文案                                      | `string`                                                 | `'clear'`      | ✅       |
| `[nzNowText]`             | 此刻按钮文本                                            | `string`                                                 | `'此刻'`       | ✅       |
| `[nzOkText]`              | 确认按钮文本                                            | `string`                                                 | `'确定'`       | ✅       |
| `[nzDefaultOpenValue]`    | 当 `[ngModel]` 不存在时，可以设置面板打开时默认选中的值 | `Date`                                                   | `new Date()`   |
| `[nzDisabled]`            | 禁用全部操作                                            | `boolean`                                                | `false`        |
| `[nzDisabledHours]`       | 禁止选择部分小时选项                                    | `() => number[]`                                         | -              |
| `[nzDisabledMinutes]`     | 禁止选择部分分钟选项                                    | `(hour: number) => number[]`                             | -              |
| `[nzDisabledSeconds]`     | 禁止选择部分秒选项                                      | `(hour: number, minute: number) => number[]`             | -              |
| `[nzFormat]`              | 展示的时间格式                                          | [DatePipe](https://angular.cn/api/common/DatePipe)       | `'HH:mm:ss'`   | ✅       |
| `[nzHideDisabledOptions]` | 隐藏禁止选择的选项                                      | `boolean`                                                | `false`        |
| `[nzHourStep]`            | 小时选项间隔                                            | `number`                                                 | `1`            | ✅       |
| `[nzMinuteStep]`          | 分钟选项间隔                                            | `number`                                                 | `1`            | ✅       |
| `[nzSecondStep]`          | 秒选项间隔                                              | `number`                                                 | `1`            | ✅       |
| `[nzSize]`                | 时间选择框大小                                          | `'large' \| 'small' \| 'default'`                        | `'default'`    |
| `[nzStatus]`              | 设置校验状态                                            | `'error' \| 'warning'`                                   | -              |
| ~~`[nzBorderless]`~~      | ~~移除边框~~                                            | ~~`boolean`~~                                            | ~~`false`~~    | -        |
| `[nzVariant]`             | 形态变体                                                | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'` | `'outlined'`   | ✅       |
| `[nzInputReadOnly]`       | 为 input 标签设置只读属性（避免在移动设备上触发小键盘） | `boolean`                                                | `false`        | -        |
| `[nzOpen]`                | 面板是否打开，可双向绑定                                | `boolean`                                                | `false`        |
| `[nzPlaceHolder]`         | 没有值的时候显示的内容                                  | `string`                                                 | `'请选择时间'` |
| `[nzPopupClassName]`      | 弹出层类名                                              | `string`                                                 | `''`           | ✅       |
| `[nzUse12Hours]`          | 使用 12 小时制，为 true 时 format 默认为`h:mm:ss a`     | `boolean`                                                | `false`        | ✅       |
| `[nzSuffixIcon]`          | 自定义的后缀图标                                        | `string \| TemplateRef`                                  | -              | ✅       |
| `(ngModelChange)`         | 时间发生变化的回调                                      | `EventEmitter<Date>`                                     | -              |
| `(nzOpenChange)`          | 面板打开/关闭时的回调                                   | `EventEmitter<boolean>`                                  | -              |

#### 方法

| 名称      | 描述     |
| --------- | -------- |
| `blur()`  | 移除焦点 |
| `focus()` | 获取焦点 |
