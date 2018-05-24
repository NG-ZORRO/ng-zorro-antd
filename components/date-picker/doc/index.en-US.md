---
category: Components
type: Data Entry
title: DatePicker
---

To select or input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## API

**Note:** Some of nz-date-picker's locale are coming from [Angular i18n](https://angular.io/guide/i18n), that should be provided in the file of `main.ts`.

For example:
```typescript
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
```

There are four kinds of picker:

- nz-date-picker
- nz-month-picker
- nz-range-picker
- nz-week-picker

**Note: ** All input and output date objects are [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), you can manpulate it with [date-fns](https://date-fns.org/).

### Common API

The following APIs are shared by nz-date-picker, nz-month-picker, nz-range-picker, nz-week-picker.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzAllowClear | Whether to show clear button | boolean | true |
| nzAutoFocus | get focus when component mounted | boolean | false |
| nzClassName | picker className | string | '' |
| nzDateRender | custom rendering function for date cells (Not support by nz-month-picker) | TemplateRef&lt;Date&gt; / string or (d: Date) => TemplateRef&lt;Date&gt; / string | - |
| nzDisabled | determine whether the nz-date-picker is disabled | boolean | false |
| nzDisabledDate | specify the date that cannot be selected | (current: Date) => boolean | - |
| nzLocale | localization configuration | object | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |
| nzOpen | open state of picker | boolean | - |
| nzPlaceHolder | placeholder of date input | string / string[] | - |
| nzPopupStyle | to customize the style of the popup calendar | object | {} |
| nzDropdownClassName | to customize the className of the popup calendar  | string | - |
| nzSize | determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | string | - |
| nzStyle | to customize the style of the input box | object | {} |
| nzOnOpenChange | a callback emitter, can be executed whether the popup calendar is popped up or closed | EventEmitter&lt;boolean&gt; | - |

### nz-date-picker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| ngModel | Date | Date | - |
| ngModelChange | Date change callback | `(ngModel:Date)=>{}` | - |
| nzDisabledTime | to specify the time that cannot be selected | (current: Date) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } | - |
| nzFormat | to set the date format, refer to [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-MM-dd" |
| nzRenderExtraFooter | render extra footer in panel | TemplateRef / string or () => TemplateRef / string | - |
| nzShowTime | to provide an additional time selection | object / boolean | [TimePicker Options](/components/time-picker/en#api) |
| nzShowToday | whether to show "Today" button | boolean | true |
| nzOnOk | callback when click ok button | EventEmitter&lt;Date&gt; | - |

### nz-month-picker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| ngModel | Date | Date | - |
| ngModelChange | Date change callback | `(ngModel:Date)=>{}` | - |
| nzFormat | to set the date format, refer to [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-MM" |
| nzRenderExtraFooter | render extra footer in panel | TemplateRef / string or () => TemplateRef / string | - |

### nz-week-picker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| ngModel | Date | Date | - |
| ngModelChange | Date change callback | `(ngModel:Date)=>{}` | - |
| nzFormat | to set the date format, refer to [DatePipe](https://angular.io/api/common/DatePipe) | string | "yyyy-ww" |

### nz-range-picker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| ngModel | Date | Date[] | - |
| ngModelChange | Date change callback | `(ngModel:Date[])=>{}` | - |
| nzDisabledTime | to specify the time that cannot be selected | (current: Date, partial: 'start' / 'end') => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } | - |
| nzFormat | to set the date format | string | "yyyy-MM-dd" |
| nzRanges | preseted ranges for quick selection | { [ key: string ]: Date[] } | - |
| nzRenderExtraFooter | render extra footer in panel | TemplateRef / string or () => TemplateRef / string | - |
| nzShowTime | to provide an additional time selection | object / boolean | [TimePicker Options](/components/time-picker/en#api) |
| nzValue | to set date | Date[] | - |

> Currently supported `nz-time-picker` parameters in `NzShowTime` are: `nzFormat`, `nzHourStep`, `nzMinuteStep`, `nzSecondStep`, `nzDisabledHours`, `nzDisabledMinutes`, `nzDisabledSeconds`, `nzHideDisabledOptions`, `nzDefaultOpenValue`, `nzAddOn`