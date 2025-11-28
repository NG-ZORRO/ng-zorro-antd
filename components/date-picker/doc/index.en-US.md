---
category: Components
type: Data Entry
title: DatePicker
cover: 'https://gw.alipayobjects.com/zos/alicdn/RT_USzA48/DatePicker.svg'
description: To select or input a date.
---

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## API

**Note:** Some of nz-date-picker's locale are coming from [Angular i18n](https://angular.dev/guide/i18n), that should be
provided in the file `app.config.ts`.

For example:

```typescript
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);
```

**Note:** All input and output date objects
are [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), you can manipulate it
with [date-fns](https://date-fns.org/).

### Common API

The following APIs are shared by nz-date-picker, nz-range-picker.

| Property                 | Description                                                                                                                        | Type                                                       | Default                                                                                                    | Global Config | Version |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------- | ------- |
| `[nzId]`                 | input id attribute inside the component                                                                                            | `string`                                                   | -                                                                                                          |
| `[nzAllowClear]`         | Whether to show clear button                                                                                                       | `boolean`                                                  | `true`                                                                                                     | -             |
| `[nzAutoFocus]`          | get focus when component mounted                                                                                                   | `boolean`                                                  | `false`                                                                                                    | -             |
| `[nzBackdrop]`           | whether or not the overlay should attach a backdrop                                                                                | `boolean`                                                  | `false`                                                                                                    |
| `[nzDefaultPickerValue]` | default picker date                                                                                                                | `Date \| Date[]`                                           | -                                                                                                          | -             |
| `[nzDisabled]`           | determine whether the nz-date-picker is disabled                                                                                   | `boolean`                                                  | `false`                                                                                                    | -             |
| `[nzDisabledDate]`       | specify the date that cannot be selected                                                                                           | `(current: Date) => boolean`                               | -                                                                                                          | -             |
| `[nzDropdownClassName]`  | to customize the className of the popup calendar                                                                                   | `string`                                                   | -                                                                                                          | -             |
| `[nzFormat]`             | to set the date format, see `nzFormat special instructions`                                                                        | `string`                                                   | -                                                                                                          |
| `[nzInputReadOnly]`      | set the readonly attribute of the input tag (avoids virtual keyboard on touch devices)                                             | `boolean`                                                  | `false`                                                                                                    | -             |
| `[nzLocale]`             | localization configuration                                                                                                         | `object`                                                   | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) | -             |
| `[nzMode]`               | Set picker mode                                                                                                                    | `'date' \| 'week' \| 'month' \| 'quarter'  \| 'year'`      | `'date'`                                                                                                   |
| `[nzPlaceHolder]`        | placeholder of date input                                                                                                          | `string \| string[]`                                       | -                                                                                                          |
| `[nzPopupStyle]`         | to customize the style of the popup calendar                                                                                       | `object`                                                   | `{}`                                                                                                       | -             |
| `[nzRenderExtraFooter]`  | render extra footer in panel                                                                                                       | `TemplateRef \| string \| (() => TemplateRef \| string)`   | -                                                                                                          |
| `[nzSize]`               | determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | `'large' \| 'small'`                                       | -                                                                                                          | -             |
| `[nzStatus]`             | Set validation status                                                                                                              | `'error' \| 'warning'`                                     | -                                                                                                          |
| `[nzPlacement]`          | The position where the selection box pops up                                                                                       | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'`                                                                                             |               |
| `[nzSuffixIcon]`         | the custom suffix icon                                                                                                             | `string \| TemplateRef`                                    | -                                                                                                          | ✅            |
| `[nzVariant]`            | Variants of DatePicker                                                                                                             | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'`   | `'outlined'`                                                                                               | ✅            | 20.0.0  |
| `[nzInline]`             | inline mode                                                                                                                        | `boolean`                                                  | `false`                                                                                                    | -             |
| `(nzOnOpenChange)`       | a callback emitter, can be executed whether the popup calendar is popped up or closed                                              | `EventEmitter<boolean>`                                    | -                                                                                                          | -             |
| `(nzOnPanelChange)`      | a callback emitter, can be executed when the panel changes                                                                         | `EventEmitter<NzPanelChangeType>`                          | -                                                                                                          | -             |

### Common Methods

| Name      | Description          |
| --------- | -------------------- |
| `open()`  | open calendar panel  |
| `close()` | close calendar panel |

### nz-date-picker

| Property      | Description | Type   | Default |
| ------------- | ----------- | ------ | ------- |
| `[(ngModel)]` | Date        | `Date` | -       |

### nz-date-picker[nzMode="date"]

| Property             | Description                                                                                                        | Type                                                                           | Default                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `[nzDateRender]`     | custom rendering function for date cells (Not support by month-picker/year-picker)                                 | -                                                                              | `TemplateRef<Date> \| string \| ((d: Date) => TemplateRef<Date> \| string)` |
| `[nzDisabledTime]`   | to specify the time that cannot be selected                                                                        | `(current: Date) => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }` | -                                                                           |
| `[nzShowTime]`       | to provide an additional time selection                                                                            | `object \| boolean`                                                            | [TimePicker Options](/components/time-picker/en#api)                        |
| `[nzShowToday]`      | whether to show 'Today' button                                                                                     | `boolean`                                                                      | `true`                                                                      |
| `[nzShowNow]`        | whether to show 'Now' button on panel when `nzShowTime` is set                                                     | `boolean`                                                                      | `true`                                                                      |
| `[nzShowWeekNumber]` | whether to show the week number on each row (Only supported by date picker. Week picker always shows week numbers) | `boolean`                                                                      | `false`                                                                     |
| `(nzOnOk)`           | callback when click ok button                                                                                      | `EventEmitter<Date>`                                                           | -                                                                           |

### nz-range-picker

| Property               | Description                                                 | Type                                                               | Default |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| `[(ngModel)]`          | Date                                                        | `Date[]`                                                           | -       |
| `[nzRanges]`           | preseted ranges for quick selection                         | `{ [ key: string ]: Date[] } \| { [ key: string ]: () => Date[] }` | -       |
| `[nzSeparator]`        | separator                                                   | `string \| TemplateRef`                                            | `'~'`   |
| `(nzOnCalendarChange)` | The start time or the end time of the range change callback | `EventEmitter<Date[]>`                                             | -       |

### nz-range-picker[nzMode="date"]

| Property             | Description                                                                                                        | Type                                                                                                      | Default                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `[nzShowTime]`       | to provide an additional time selection                                                                            | `object \| boolean`                                                                                       | [TimePicker Options](/components/time-picker/en#api) |
| `[nzDisabledTime]`   | to specify the time that cannot be selected                                                                        | `(current: Date, partial: 'start' \| 'end') => { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds }` | -                                                    |
| `[nzShowWeekNumber]` | whether to show the week number on each row (Only supported by date picker. Week picker always shows week numbers) | `boolean`                                                                                                 | `false`                                              |
| `(nzOnOk)`           | click ok callback                                                                                                  | `EventEmitter<Date[]>`                                                                                    | -                                                    |

> Currently, supported `nz-time-picker` parameters in `nzShowTime` are: `nzFormat`, `nzHourStep`, `nzMinuteStep`,
> `nzSecondStep`, `nzDisabledHours`, `nzDisabledMinutes`, `nzDisabledSeconds`, `nzHideDisabledOptions`,
> `nzDefaultOpenValue`, `nzAddOn`

## FAQ

### Why does manual input not take effect after setting `nzFormat="dd/MM/yyyy"`

You need to use `date-fns`. Date formatting currently supports two methods: `DatePipe` (
default, [syntax reference](https://angular.dev/api/common/DatePipe)) and `date-fns` (
see [`How to format a date using date-fns`](/docs/i18n/en#How%20to%20format%20a%20date%20using%20Date-fns)).NG-ZORRO
takes the function provided by `date-fns` to implement date deserialization after using it.

### Q: The overlay layer element does not follow the scroll position when scrolling

By default, the overlay layer element uses body as the scroll container. If using another scroll container, add the [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) directive to the custom scroll container element.
Note: You need to import the `CdkScrollable` directive or `ScrollingModule` module from `@angular/cdk/scrolling`.
