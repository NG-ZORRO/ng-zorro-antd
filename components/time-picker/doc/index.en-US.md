---
category: Components
type: Data Entry
title: TimePicker
---

To select/input a time.

## When To Use

* * *

By clicking the input box, you can select a time from a popup panel.

## API

* * *

```html
<nz-time-picker [(ngModel)]="someTime"></nz-time-picker>
```

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| ngModel | to set time | Date | - |
| ngModelChange | a callback function, can be executed when the selected time is changing | function(ngModel: Date): void | - |
| nzAddon | called from timepicker panel to render some addon to its bottom | `TemplateRef<void>` | - |
| nzAllowEmpty | allow clearing text | boolean | true |
| nzAutoFocus | get focus when component mounted | boolean | false |
| nzClearText | clear tooltip of icon | string | clear |
| nzDefaultOpenValue | default open panel value | Date | new Date() |
| nzDisabled | determine whether the TimePicker is disabled | boolean | false |
| nzDisabledHours | to specify the hours that cannot be selected | function() | - |
| nzDisabledMinutes | to specify the minutes that cannot be selected | function(selectedHour) | - |
| nzDisabledSeconds | to specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - |
| nzFormat | to set the time format | [DatePipe](https://angular.io/api/common/DatePipe) | "HH:mm:ss" |
| nzHideDisabledOptions | hide the options that can not be selected | boolean | false |
| nzHourStep | interval between hours in picker | number | 1 |
| nzMinuteStep | interval between minutes in picker | number | 1 |
| nzSecondStep | interval between seconds in picker | number | 1 |
| nzOpen | whether to popup panel, double binding | boolean | false |
| nzOpenChange | a callback function which will be called while panel opening/closing | (open: boolean): void | - |
| nzPlaceHolder | display when there's no value | string | "Select a time" |
| nzPopupClassName | className of panel | string | '' |


## Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
