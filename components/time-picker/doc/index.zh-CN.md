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
| ngModel | 当前时间 | Date | - |
| ngModelChange | 时间发生变化的回调 | function(ngModel:Date): void | - |
| nzAddon | 选择框底部显示自定义的内容 | `TemplateRef<void>` | - |
| nzAllowEmpty | 是否展示清除按钮 | boolean | true |
| nzAutoFocus | 自动获取焦点 | boolean | false |
| nzClearText | 清除按钮的提示文案 | string | clear |
| nzDefaultOpenValue | 设置面板打开时默认选中的值 | Date | new Date() |
| nzDisabled | 禁用全部操作 | boolean | false |
| nzDisabledHours | 禁止选择部分小时选项 | function() | - |
| nzDisabledMinutes | 禁止选择部分分钟选项 | function(selectedHour) | - |
| nzDisabledSeconds | 禁止选择部分秒选项 | function(selectedHour, selectedMinute) | - |
| nzFormat | 展示的时间格式 | [DatePipe](https://angular.io/api/common/DatePipe) | "HH:mm:ss" |
| nzHideDisabledOptions | 隐藏禁止选择的选项 | boolean | false |
| nzHourStep | 小时选项间隔 | number | 1 |
| nzMinuteStep | 分钟选项间隔 | number | 1 |
| nzSecondStep | 秒选项间隔 | number | 1 |
| nzOpen | 面板是否打开，可双向绑定 | boolean | false |
| nzOpenChange | 面板打开/关闭时的回调 | (nzOpen: boolean): void | - |
| nzPlaceHolder | 没有值的时候显示的内容 | string | "请选择时间" |
| nzPopupClassName | 弹出层类名 | string | '' |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

