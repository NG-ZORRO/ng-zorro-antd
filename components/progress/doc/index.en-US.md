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

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzProgressModule } from 'ng-zorro-antd';
```

### nz-progress

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzFormat]` | template function of the content | `(percent: number) => string` | `percent => percent + '%'` |
| `[nzGapDegree]` `(nzType=circle)` | the gap degree of half circle, 0 ~ 360 | `number` | `0` |
| `[nzGapPosition]` `(nzType=circle)` | the gap position | `'top'｜'right'｜'bottom'｜'left'` | `'top'` |
| `[nzPercent]` | to set the completion percentage | `number` | `0` |
| `[nzShowInfo]` | whether to display the progress value and the status icon | `boolean` | `true` |
| `[nzStatus]` | to set the status of the Progress | `'success'｜'exception'｜'active'` | - |
| `[nzStrokeWidth]` `(nzType=line)` | to set the width of the progress bar, unit: `px` | `number` | `8` |
| `[nzStrokeWidth]` `(nzType=circle)` | to set the width of the circular progress bar, unit: percentage of the canvas width | `number` | `6` |
| `[nzType]` | to set the type | `'line'｜'circle'｜'dashboard'` | `'line'` |
| `[nzWidth]` `(nzType=circle)` | to set the canvas width of the circular progress bar, unit: `px` | `number` | `132` |
| `[nzStrokeLinecap]` | to set the style of the progress linecap | `'round'｜'square'` | `'round'` |
| `[nzStrokeColor]` | color of progress bar | `string` | - |