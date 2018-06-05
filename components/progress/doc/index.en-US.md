---
category: Components
type: Feedback
title: Progress
---

Display the current progress of an operation flow.

## When To Use

If it will take a long time to complete an operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## API

### nz-progress

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzFormat]` | template function of the content | function(percent) | `percent => percent + '%'` |
| `[nzGapDegree]` `(nzType=circle)` | the gap degree of half circle, 0 ~ 360 | number | 0 |
| `[nzGapPosition]` `(nzType=circle)` | the gap position, options: `top` `bottom` `left` `right` | string | `top` |
| `[nzPercent]` | to set the completion percentage | number | 0 |
| `[nzShowInfo]` | whether to display the progress value and the status icon | boolean | true |
| `[nzStatus]` | to set the status of the Progress, options: `success` `exception` `active` | string | - |
| `[nzStrokeWidth]` `(nzType=line)` | to set the width of the progress bar, unit: `px` | number | 8 |
| `[nzStrokeWidth]` `(nzType=circle)` | to set the width of the circular progress bar, unit: percentage of the canvas width | number | 6 |
| `[nzType]` | to set the type, options: `line` `circle` `dashboard` | string | `line` |
| `[nzWidth]` `(nzType=circle)` | to set the canvas width of the circular progress bar, unit: `px` | number | 132 |
