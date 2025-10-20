---
category: Components
type: Data Entry
title: TimePicker
cover: 'https://gw.alipayobjects.com/zos/alicdn/h04Zsl98I/TimePicker.svg'
description: To select/input a time.
---

## When To Use

By clicking the input box, you can select a time from a popup panel.

## API

### nz-time-picker

| Property                  | Description                                                                            | Type                                                     | Default           | Global Config | Version |
| ------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------- | ------------- | ------- |
| `[nzId]`                  | input id attribute inside the component                                                | `string`                                                 | -                 |
| `[ngModel]`               | to set time                                                                            | `Date`                                                   | -                 |
| `[nzAddOn]`               | called from timepicker panel to render some addon to its bottom                        | `TemplateRef<void>`                                      | -                 |
| `[nzAllowEmpty]`          | allow clearing text                                                                    | `boolean`                                                | `true`            | ✅            |
| `[nzAutoFocus]`           | get focus when component mounted                                                       | `boolean`                                                | `false`           |
| `[nzBackdrop]`            | whether or not the overlay should attach a backdrop                                    | `boolean`                                                | `false`           |
| `[nzClearText]`           | clear tooltip of icon                                                                  | `string`                                                 | `'clear'`         | ✅            |
| `[nzNowText]`             | text of the Now button                                                                 | `string`                                                 | `'Now'`           | ✅            |
| `[nzOkText]`              | text of the Ok button                                                                  | `string`                                                 | `'Ok'`            | ✅            |
| `[nzDefaultOpenValue]`    | default open panel value if `[ngModel]` is null                                        | `Date`                                                   | `new Date()`      |
| `[nzDisabled]`            | determine whether the TimePicker is disabled                                           | `boolean`                                                | `false`           |
| `[nzDisabledHours]`       | to specify the hours that cannot be selected                                           | `() => number[]`                                         | -                 |
| `[nzDisabledMinutes]`     | to specify the minutes that cannot be selected                                         | `(hour: number) => number[]`                             | -                 |
| `[nzDisabledSeconds]`     | to specify the seconds that cannot be selected                                         | `(hour: number, minute: number) => number[]`             | -                 |
| `[nzFormat]`              | to set the time format                                                                 | [DatePipe](https://angular.dev/api/common/DatePipe)      | `'HH:mm:ss'`      | ✅            |
| `[nzHideDisabledOptions]` | hide the options that can not be selected                                              | `boolean`                                                | `false`           |
| `[nzHourStep]`            | interval between hours in picker                                                       | `number`                                                 | `1`               | ✅            |
| `[nzMinuteStep]`          | interval between minutes in picker                                                     | `number`                                                 | `1`               | ✅            |
| `[nzSecondStep]`          | interval between seconds in picker                                                     | `number`                                                 | `1`               | ✅            |
| `[nzSize]`                | width of time picker box                                                               | `'large' \| 'small' \| 'default'`                        | `'default'`       |
| `[nzStatus]`              | Set validation status                                                                  | `'error' \| 'warning'`                                   | -                 |
| ~~`[nzBorderless]`~~      | ~~remove the border~~                                                                  | ~~`boolean`~~                                            | ~~`false`~~       | -             |
| `[nzVariant]`             | Variants of TimePicker                                                                 | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'` | `'outlined'`      | ✅            | 20.0.0  |
| `[nzInputReadOnly]`       | set the readonly attribute of the input tag (avoids virtual keyboard on touch devices) | `boolean`                                                | `false`           | -             |
| `[nzOpen]`                | whether to popup panel, double binding                                                 | `boolean`                                                | `false`           |
| `[nzPlaceHolder]`         | display when there's no value                                                          | `string`                                                 | `'Select a time'` |
| `[nzPopupClassName]`      | className of panel                                                                     | `string`                                                 | `''`              | ✅            |
| `[nzUse12Hours]`          | display as 12 hours format, with default format `h:mm:ss a`                            | `boolean`                                                | `false`           | ✅            |
| `[nzSuffixIcon]`          | the custom suffix icon                                                                 | `string \| TemplateRef`                                  | -                 | ✅            |
| `(ngModelChange)`         | a callback function, can be executed when the selected time is changing                | `EventEmitter<Date>`                                     | -                 |
| `(nzOpenChange)`          | a callback function which will be called while panel opening/closing                   | `EventEmitter<boolean>`                                  | -                 |

#### Methods

| Name      | Description  |
| --------- | ------------ |
| `blur()`  | remove focus |
| `focus()` | get focus    |

## FAQ

### Q: The overlay layer element does not follow the scroll position when scrolling

By default, the overlay layer element uses body as the scroll container. If using another scroll container, add the [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) directive to the custom scroll container element.
Note: You need to import the `CdkScrollable` directive or `ScrollingModule` module from `@angular/cdk/scrolling`.
