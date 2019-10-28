---
category: Components
type: Data Entry
title: TimePicker
---

To select/input a time.

## When To Use

By clicking the input box, you can select a time from a popup panel.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
```

## API

```html
<nz-time-picker [(ngModel)]="someTime"></nz-time-picker>
```

### nz-time-picker

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[ngModel]` | to set time | `Date` | - |
| `[nzAddon]` | called from timepicker panel to render some addon to its bottom | `TemplateRef<void>` | - |
| `[nzAllowEmpty]` | allow clearing text | `boolean` | `true` | ✅ |
| `[nzAutoFocus]` | get focus when component mounted | `boolean` | `false` |
| `[nzClearText]` | clear tooltip of icon | `string` | `'clear'` | ✅ |
| `[nzDefaultOpenValue]` | default open panel value if `[ngModel]` is null | `Date` | `new Date()` |
| `[nzDisabled]` | determine whether the TimePicker is disabled | `boolean` | `false` |
| `[nzDisabledHours]` | to specify the hours that cannot be selected | `() => number[]` | - |
| `[nzDisabledMinutes]` | to specify the minutes that cannot be selected | `(hour: number) => number[]` | - |
| `[nzDisabledSeconds]` | to specify the seconds that cannot be selected | `(hour: number, minute: number) => number[]` | - |
| `[nzFormat]` | to set the time format | [DatePipe](https://angular.io/api/common/DatePipe) | `"HH:mm:ss"` | ✅ |
| `[nzHideDisabledOptions]` | hide the options that can not be selected | `boolean` | `false` |
| `[nzHourStep]` | interval between hours in picker | `number` | `1` | ✅ |
| `[nzMinuteStep]` | interval between minutes in picker | `number` | `1` | ✅ |
| `[nzSecondStep]` | interval between seconds in picker | `number` | `1` | ✅ |
| `[nzOpen]` | whether to popup panel, double binding | `boolean` | `false` |
| `[nzPlaceHolder]` | display when there's no value | `string` | `"Select a time"` |
| `[nzPopupClassName]` | className of panel | `string` | `''` | ✅ |
| `[nzUse12Hours]` | display as 12 hours format, with default format `h:mm:ss a` | `boolean` | `false` | ✅ |
| `(ngModelChange)` | a callback function, can be executed when the selected time is changing | `EventEmitter<Date>` | - |
| `(nzOpenChange)` | a callback function which will be called while panel opening/closing | `EventEmitter<boolean>` | - |


#### Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
