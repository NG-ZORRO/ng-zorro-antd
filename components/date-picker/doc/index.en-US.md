---
category: Components
type: Data Entry
title: DatePicker
---

To select or input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## API

There are four kinds of picker:

- DatePicker
- MonthPicker
- RangePicker
- WeekPicker

**Note: ** All input and output date objects are `CandyDate`,`CandyDate` is a minimalist date processing tool, the currently supported API is continuously improved, you can [click here](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/date-picker/lib/candy-date/candy-date.ts) to get more informations. You can also get native `Date` objects directly with `CandyDate.nativeDate`. Specific usage You can view DEMO.

### Common API

The following APIs are shared by DatePicker, MonthPicker, RangePicker, WeekPicker.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzAllowClear | Whether to show clear button | boolean | true |
| nzAutoFocus | get focus when component mounted | boolean | false |
| nzClassName | picker className | string | '' |
| nzDateRender | custom rendering function for date cells (Not support by MonthPicker) | TemplateRef&lt;CandyDate&gt; / string or (d: CandyDate) => TemplateRef&lt;CandyDate&gt; / string | - |
| nzDisabled | determine whether the DatePicker is disabled | boolean | false |
| nzDisabledDate | specify the date that cannot be selected | (current: CandyDate) => boolean | - |
| nzLocale | localization configuration | object | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |
| nzOpen | open state of picker | boolean | - |
| nzPlaceholder | placeholder of date input | string / string[] | - |
| nzPopupStyle | to customize the style of the popup calendar | object | {} |
| nzDropdownClassName | to customize the className of the popup calendar  | string | - |
| nzSize | determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | string | - |
| nzStyle | to customize the style of the input box | object | {} |
| nzOnOpenChange | a callback emitter, can be executed whether the popup calendar is popped up or closed | EventEmitter&lt;boolean&gt; | - |

### DatePicker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzDefaultValue | to set default date | CandyDate | - |
| nzDisabledTime | to specify the time that cannot be selected | (current: CandyDate) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } | - |
| nzFormat | to set the date format, refer to [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-MM-dd" |
| nzRenderExtraFooter | render extra footer in panel | TemplateRef / string or () => TemplateRef / string | - |
| nzShowTime | to provide an additional time selection | object / boolean | [TimePicker Options](/components/time-picker/en#api) |
| nzShowToday | whether to show "Today" button | boolean | true |
| nzValue | to set date | CandyDate | - |
| nzOnChange | a callback emitter, can be executed when the selected time is changing | EventEmitter&lt;{ date: CandyDate, dateString: string }&gt; | - |
| nzOnOk | callback when click ok button | EventEmitter&lt;CandyDate&gt; | - |

### MonthPicker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzDefaultValue | to set default date | CandyDate | - |
| nzFormat | to set the date format, refer to [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-MM" |
| nzRenderExtraFooter | render extra footer in panel | TemplateRef / string or () => TemplateRef / string | - |
| nzValue | to set date | CandyDate | - |
| nzOnChange | a callback emitter, can be executed when the selected time is changing | EventEmitter&lt;{ date: CandyDate, dateString: string }&gt; | - |

### WeekPicker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzDefaultValue | to set default date | CandyDate | - |
| nzFormat | to set the date format, refer to [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-ww" |
| nzValue | to set date | CandyDate | - |
| nzOnChange | a callback emitter, can be executed when the selected time is changing | EventEmitter&lt;{ date: CandyDate, dateString: string }&gt; | - |

### RangePicker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzDefaultValue | to set default date | CandyDate[] | - |
| nzDisabledTime | to specify the time that cannot be selected | (current: CandyDate, partial: 'start' / 'end') => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } | - |
| nzFormat | to set the date format | string | "yyyy-MM-dd" |
| nzRanges | preseted ranges for quick selection | { [ key: string ]: CandyDate[] } | - |
| nzRenderExtraFooter | render extra footer in panel | TemplateRef / string or () => TemplateRef / string | - |
| nzShowTime | to provide an additional time selection | object / boolean | [TimePicker Options](/components/time-picker/en#api) |
| nzValue | to set date | CandyDate[] | - |
| nzOnChange | a callback emitter, can be executed when the selected time is changing | EventEmitter&lt;{ date: CandyDate[], dateString: string[] }&gt; | - |
| nzOnOk | callback when click ok button | EventEmitter&lt;CandyDate[]&gt; | - |

> Currently supported `TimePicker` parameters in `NzShowTime` are: `nzFormat`, `nzHourStep`, `nzMinuteStep`, `nzSecondStep`, `nzDisabledHours`, `nzDisabledMinutes`, `nzDisabledSeconds`, `nzHideDisabledOptions`, `nzDefaultOpenValue`, `nzAddOn`