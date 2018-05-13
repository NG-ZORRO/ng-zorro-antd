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

日期类组件包括以下四种形式。

- DatePicker
- MonthPicker
- RangePicker
- WeekPicker

**注意：** 所有输入输出日期对象均为 `CandyDate`，`CandyDate` 是一个极简的日期处理工具，目标是替代过重的`moment`，目前支持的API正持续完善中，可以[点此查看](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/date-picker/lib/candy-date/candy-date.ts)。您也可以通过 `CandyDate.nativeDate` 来直接获得原生的 `Date` 对象。具体使用用法您可查看DEMO。

### 共同的 API

以下 API 为 DatePicker、MonthPicker、RangePicker, WeekPicker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzAllowClear | 是否显示清除按钮 | boolean | true |
| nzAutoFocus | 自动获取焦点 | boolean | false |
| nzClassName | 选择器 className | string | '' |
| nzDateRender | 自定义日期单元格的内容（MonthPicker不支持） | TemplateRef&lt;CandyDate&gt; / string or (d: CandyDate) => TemplateRef&lt;CandyDate&gt; / string | - |
| nzDisabled | 禁用 | boolean | false |
| nzDisabledDate | 不可选择的日期 | (current: CandyDate) => boolean | 无 |
| nzLocale | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |
| nzOpen | 控制弹层是否展开 | boolean | - |
| nzPlaceholder | 输入框提示文字 | string / string[] | - |
| nzPopupStyle | 额外的弹出日历样式 | object | {} |
| nzDropdownClassName | 额外的弹出日历 className | string | - |
| nzSize | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | string | 无 |
| nzStyle | 自定义输入框样式 | object | {} |
| nzOnOpenChange | 弹出日历和关闭日历的回调 | EventEmitter&lt;boolean&gt; | 无 |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzDefaultValue | 默认日期 | CandyDate | 无 |
| nzDisabledTime | 不可选择的时间 | (current: CandyDate) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } | 无 |
| nzFormat | 展示的日期格式，配置参考 [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-MM-dd" |
| nzRenderExtraFooter | 在面板中添加额外的页脚 | TemplateRef / string or () => TemplateRef / string | - |
| nzShowTime | 增加时间选择功能 | object / boolean | [TimePicker Options](/components/time-picker/zh#api) |
| nzShowToday | 是否展示“今天”按钮 | boolean | true |
| nzValue | 日期 | CandyDate | 无 |
| nzOnChange | 时间发生变化的回调 | EventEmitter&lt;{ date: CandyDate, dateString: string }&gt; | 无 |
| nzOnOk | 点击确定按钮的回调 | EventEmitter&lt;CandyDate&gt; | - |

### MonthPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzDefaultValue | 默认日期 | CandyDate | 无 |
| nzFormat | 展示的日期格式，配置参考 [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-MM" |
| nzRenderExtraFooter | 在面板中添加额外的页脚 | TemplateRef / string or () => TemplateRef / string | - |
| nzValue | 日期 | CandyDate | 无 |
| nzOnChange | 时间发生变化的回调，发生在用户选择时间时 | EventEmitter&lt;{ date: CandyDate, dateString: string }&gt; | - |

### WeekPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzDefaultValue | 默认日期 | CandyDate | - |
| nzFormat | 展示的日期格式，配置参考 [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-ww" |
| nzValue | 日期 | CandyDate | - |
| nzOnChange | 时间发生变化的回调，发生在用户选择时间时 | EventEmitter&lt;{ date: CandyDate, dateString: string }&gt; | - |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| nzDefaultValue | 默认日期 | CandyDate[] | 无 |
| nzDisabledTime | 不可选择的时间 | (current: CandyDate, partial: 'start' / 'end') => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } | 无 |
| nzFormat | 展示的日期格式 | string | "yyyy-MM-dd" |
| nzRanges       | 预设时间范围快捷选择 | { [ key: string ]: CandyDate[] } | 无 |
| nzRenderExtraFooter | 在面板中添加额外的页脚 | TemplateRef / string or () => TemplateRef / string | - |
| nzShowTime | 增加时间选择功能 | object / boolean | [TimePicker Options](/components/time-picker/zh#api) |
| nzValue | 日期 | CandyDate[] | 无 |
| nzOnChange | 日期范围发生变化的回调 | EventEmitter&lt;{ date: CandyDate[], dateString: string[] }&gt; | 无 |
| nzOnOk | 点击确定按钮的回调 | EventEmitter&lt;CandyDate[]&gt; | - |

> `NzShowTime` 中当前支持的 `TimePicker` 参数有：`nzFormat`, `nzHourStep`, `nzMinuteStep`, `nzSecondStep`, `nzDisabledHours`, `nzDisabledMinutes`, `nzDisabledSeconds`, `nzHideDisabledOptions`, `nzDefaultOpenValue`, `nzAddOn`