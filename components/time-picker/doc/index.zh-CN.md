---
category: Components
subtitle: 时间选择框
type: Data Entry
title: TimePicker
---

输入或选择时间的控件。

## 何时使用

* * *

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## API

* * *

```html
<nz-time-picker [(ngModel)]="someTime"></nz-time-picker>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ngModel | 绑定的时间值 | `Date` | `null` |
| nzAutoFocus | 自动获取焦点 | `boolean` | `false` |
| nzClearText | 清除按钮的提示文案 | `string` | `clear` |
| nzOffset | 没有值时选择器的初始位置 | `[Date, Date, Date]` | `null` |
| nzDisabled | 禁用全部操作 | `boolean` | `false` |
| nzDisabledHours | 禁止选择部分小时选项 | `() => boolean` | - |
| nzDisabledMinutes | 禁止选择部分分钟选项 | `(hour: number) => boolean` | - |
| nzDisabledSeconds | 禁止选择部分秒选项 | `(hour: number, minute: number) => boolean` | - |
| nzFormat | 展示的时间格式 | `string` | `'HH:mm:ss'` |
| nzHideDisabledOptions | 隐藏禁止选择的选项 | `boolean` | `false` |
| nzHourStep | 小时选项间隔 | `number` | `1` |
| nzMinuteStep | 分钟选项间隔 | `number` | `1` |
| nzNoClear | 是否展示清除按钮 | `boolean` | `false` |
| nzPlaceholder | 没有值的时候显示的内容 | `string` | `'请选择时间'` |
| nzSecondStep | 秒选项间隔 | `number` | `1` |
| nzStatusChange | 面板打开/关闭时的事件 | `EventEmitter<boolean>` | - |
| &lt;ng-content&gt; | 选择框底部显示自定义的内容 | `Node/Node[]` | 无 |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
| open() | 打开面板 |
| close() | 关闭面板 |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
