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
| ngModel | time for binding | `Date` | `null` |
| nzAutoFocus | get focus when component rendered | `boolean` | `false` |
| nzClearText | clear tooltip of icon | `string` | `clear` |
| nzOffset | start position when no value given | `[Date, Date, Date]` | `null` |
| nzDisabled | determine whether the TimePicker is disabled | `boolean` | `false` |
| nzDisabledHours | to specify the hours that cannot be selected | `() => boolean` | - |
| nzDisabledMinutes | to specify the minutes that cannot be selected | `(hour: number) => boolean` | - |
| nzDisabledSeconds | to specify the seconds that cannot be selected | `(hour: number, minute: number) => boolean` | - |
| nzFormat | to set the time format | `string` | `'HH:mm:ss'` |
| nzHideDisabledOptions | hide the options that can not be selected | `boolean` | `false` |
| nzHourStep | interval between hours in picker | `number` | `1` |
| nzMinuteStep | interval between minutes in picker | `number` | `1` |
| nzNoClear | whether to show clear button | `boolean` | `false` |
| nzPlaceholder | display when there's no value | `string` | `'Select a time'` |
| nzSecondStep | interval between seconds in picker | `number` | `1` |
| nzStatusChange | output for panel opening/closing | `EventEmitter<boolean>` | - |
| &lt;ng-content&gt; | used by time-picker panel to render some addon to its bottom | `Node/Node[]` | - |

## Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
| open() | open the popup panel |
| close() | close the popup panel |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
