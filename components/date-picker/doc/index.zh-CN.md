---
category: Components
type: Data Entry
title: DatePicker
subtitle: 日期选择框
---

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API

**注意：**nz-date-picker 的部分 locale 来自于 Angular 自身的[国际化支持](https://angular.io/guide/i18n)，需要在 `app.module.ts` 文件中 引入相应的 Angular 语言包。

例如：
```typescript
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
```

日期类组件包括以下四种形式。

- nz-date-picker
- nz-month-picker
- nz-range-picker
- nz-week-picker

**注意：** 所有输入输出日期对象均为 [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)，你可以通过 [date-fns](https://date-fns.org/) 工具库获得你需要的数据。

### 共同的 API

以下 API 为 nz-date-picker、nz-month-picker、nz-range-picker, nz-week-picker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzAllowClear]` | 是否显示清除按钮 | boolean | true |
| `[nzAutoFocus]` | 自动获取焦点 | boolean | false |
| `[nzClassName]` | 选择器 className | string | '' |
| `[nzDateRender]` | 自定义日期单元格的内容（month-picker/year-picker不支持） | TemplateRef&lt;Date&gt; / string or (d: Date) => TemplateRef&lt;Date&gt; / string | - |
| `[nzDisabled]` | 禁用 | boolean | false |
| `[nzDisabledDate]` | 不可选择的日期（year-picker不支持） | (current: Date) => boolean | 无 |
| `[nzLocale]` | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |
| `[nzOpen]` | 控制弹层是否展开 | boolean | - |
| `[nzPopupStyle]` | 额外的弹出日历样式 | object | {} |
| `[nzDropdownClassName]` | 额外的弹出日历 className | string | - |
| `[nzSize]` | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | string | 无 |
| `[nzStyle]` | 自定义输入框样式 | object | {} |
| `(nzOnOpenChange)` | 弹出日历和关闭日历的回调 | `EventEmitter<boolean>` | 无 |

### nz-date-picker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 日期 | Date | 无 |
| `[nzDisabledTime]` | 不可选择的时间 | (current: Date) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } | 无 |
| `[nzFormat]` | 展示的日期格式，配置参考 [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-MM-dd" |
| `[nzRenderExtraFooter]` | 在面板中添加额外的页脚 | TemplateRef / string or () => TemplateRef / string | - |
| `[nzShowTime]` | 增加时间选择功能 | object / boolean | [TimePicker Options](/components/time-picker/zh#api) |
| `[nzShowToday]` | 是否展示“今天”按钮 | boolean | true |
| `[nzPlaceHolder]` | 输入框提示文字 | string | - |
| `(nzOnOk)` | 点击确定按钮的回调 | `EventEmitter<Date>` | - |
| `(ngModelChange)` | 时间发生变化的回调 | `EventEmitter<Date>` | 无 |

### nz-year-picker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 日期 | Date | 无 |
| `[nzFormat]` | 展示的日期格式，配置参考 [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy" |
| `[nzRenderExtraFooter]` | 在面板中添加额外的页脚 | TemplateRef / string or () => TemplateRef / string | - |
| `[nzPlaceHolder]` | 输入框提示文字 | string | - |
| `(ngModelChange)` | 时间发生变化的回调 | `EventEmitter<Date>` | 无 |

### nz-month-picker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 日期 | Date | 无 |
| `[nzFormat]` | 展示的日期格式，配置参考 [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-MM" |
| `[nzRenderExtraFooter]` | 在面板中添加额外的页脚 | TemplateRef / string or () => TemplateRef / string | - |
| `[nzPlaceHolder]` | 输入框提示文字 | string | - |
| `(ngModelChange)` | 时间发生变化的回调 | `EventEmitter<Date>` | 无 |

### nz-week-picker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 日期 | Date | 无 |
| `[nzFormat]` | 展示的日期格式，配置参考 [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-ww" |
| `[nzPlaceHolder]` | 输入框提示文字 | string | - |
| `(ngModelChange)` | 时间发生变化的回调 | `EventEmitter<Date>` | 无 |

### nz-range-picker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[ngModel]` | 日期 | Date[] | 无 |
| `[nzDisabledTime]` | 不可选择的时间 | (current: Date, partial: 'start' / 'end') => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } | 无 |
| `[nzFormat]` | 展示的日期格式 | string | "yyyy-MM-dd" |
| `[nzRanges]`       | 预设时间范围快捷选择 | { [ key: string ]: Date[] } | 无 |
| `[nzRenderExtraFooter]` | 在面板中添加额外的页脚 | TemplateRef / string or () => TemplateRef / string | - |
| `[nzShowTime]` | 增加时间选择功能 | object / boolean | [TimePicker Options](/components/time-picker/zh#api) |
| `[nzPlaceHolder]` | 输入框提示文字 | string[] | - |
| `(nzOnOk)` | 点击确定按钮的回调 | `EventEmitter<Date[]>` | - |
| `(ngModelChange)` | 时间发生变化的回调 | `EventEmitter<Date[]>` | 无 |

> `nzShowTime` 中当前支持的 `nz-time-picker` 参数有：`nzFormat`, `nzHourStep`, `nzMinuteStep`, `nzSecondStep`, `nzDisabledHours`, `nzDisabledMinutes`, `nzDisabledSeconds`, `nzHideDisabledOptions`, `nzDefaultOpenValue`, `nzAddOn`