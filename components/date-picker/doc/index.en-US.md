---
category: Components
type: Data Entry
title: DatePicker
cover: https://gw.alipayobjects.com/zos/alicdn/RT_USzA48/DatePicker.svg
---

To select or input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

```ts
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
```

## API

**Note:** Some of nz-date-picker's locale are coming from [Angular i18n](https://angular.io/guide/i18n), that should be provided in the file of `app.module.ts`.

For example:
```typescript
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
```

**Note:** All input and output date objects are [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), you can manipulate it with [date-fns](https://date-fns.org/).

### Common API

The following APIs are shared by nz-date-picker, nz-range-picker.

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | - |
| `[nzAllowClear]` | Whether to show clear button | `boolean` | `true` | - |
| `[nzAutoFocus]` | get focus when component mounted | `boolean` | `false` | - |
| `[nzBackdrop]` | whether or not the overlay should attach a backdrop | `boolean` | `false` |
| `[nzDefaultPickerValue]` | default picker date | `Date` \| `Date[]` | - | - |
| `[nzDisabled]` | determine whether the nz-date-picker is disabled | `boolean` | `false` | - |
| `[nzDisabledDate]` | specify the date that cannot be selected | `(current: Date) => boolean` | - | - |
| `[nzDropdownClassName]` | to customize the className of the popup calendar  | `string` | - | - |
| `[nzFormat]` | to set the date format, see `nzFormat special instructions` | `string` | - |
| `[nzInputReadOnly]` | set the readonly attribute of the input tag (avoids virtual keyboard on touch devices) | `boolean` | `false` | - |
| `[nzLocale]` | localization configuration | `object` | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) | - |
| `[nzMode]` | Set picker mode | `'date'` \| `'week'` \| `'month'` \| `'year'` | `'date'` |
| `[nzPlaceHolder]` | placeholder of date input | `string` \| `string[]` | - |
| `[nzPopupStyle]` | to customize the style of the popup calendar | `object` | `{}` | - |
| `[nzRenderExtraFooter]` | render extra footer in panel | `TemplateRef \| string \| (() => TemplateRef \| string)` | - |
| `[nzSize]` | determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | `'large' \| 'small'` | - | - |
| `[nzSuffixIcon]` | the custom suffix icon | `string` \| `TemplateRef` | - | ✅ |
| `[nzBorderless]` | remove the border | `boolean` | `false` | - |
| `[nzInline]` | inline mode | `boolean` | `false` | - |
| `(nzOnOpenChange)` | a callback emitter, can be executed whether the popup calendar is popped up or closed | `EventEmitter<boolean>` | - | - |

### Common Methods

| Name | Description |
| ---- | ----------- |
| `open()` | open calendar panel |
| `close()` | close calendar panel |

### nz-date-picker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[(ngModel)]` | Date | `Date` | - |
| `[nzId]` | input id attribute inside the component| `string` | - |

### nz-date-picker[nzMode="date"]
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDateRender]` | custom rendering function for date cells (Not support by month-picker/year-picker) | - |`TemplateRef<Date> \| string \| ((d: Date) => TemplateRef<Date> \| string)` | - | - |
| `[nzDisabledTime]` | to specify the time that cannot be selected | `(current: Date) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }` | - |
| `[nzShowTime]` | to provide an additional time selection | `object \| boolean` | [TimePicker Options](/components/time-picker/en#api) |
| `[nzShowToday]` | whether to show 'Today' button | `boolean` | `true` |
| `[nzShowNow]` | whether to show 'Now' button on panel when `nzShowTime` is set | `boolean` | `true` |
| `(nzOnOk)` | callback when click ok button | `EventEmitter<Date>` | - |

### nz-range-picker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[(ngModel)]` | Date | `Date[]` | - |
| `[nzRanges]` | preseted ranges for quick selection | `{ [ key: string ]: Date[] }  \|  { [ key: string ]: () => Date[] }` | - |
| `[nzSeparator]` | separator | `string` | `'~'` |
| `(nzOnCalendarChange)` | The start time or the end time of the range change callback | `EventEmitter<Date[]>` | - |

### nz-range-picker[nzMode="date"]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzShowTime]` | to provide an additional time selection | `object \| boolean` | [TimePicker Options](/components/time-picker/en#api) |
| `[nzDisabledTime]` | to specify the time that cannot be selected | `(current: Date, partial: 'start' \| 'end') => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }` | - |
| `(nzOnOk)` | click ok callback | `EventEmitter<Date[]>` | - |

> Currently, supported `nz-time-picker` parameters in `nzShowTime` are: `nzFormat`, `nzHourStep`, `nzMinuteStep`, `nzSecondStep`, `nzDisabledHours`, `nzDisabledMinutes`, `nzDisabledSeconds`, `nzHideDisabledOptions`, `nzDefaultOpenValue`, `nzAddOn`

### nzFormat special instructions

Date formatting currently supports two methods: `DatePipe` (default, [syntax reference](https://angular.io/api/common/DatePipe)) and `date-fns` ([syntax reference](https://date-fns.org/docs/format#description), see [`How to format a date using date-fns`](/docs/i18n/en#How%20to%20format%20a%20date%20using%20Date-fns)).
