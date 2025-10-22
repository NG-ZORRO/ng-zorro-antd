---
category: Components
type: Feedback
title: Progress
cover: 'https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg'
description: Display the current progress of an operation.
---

## When To Use

If it will take a long time to complete an operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## API

### nz-progress

| Property             | Description                                                          | Type                                                                                   | Default                    | Global Config |
| -------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| `[nzType]`           | to set the type                                                      | `'line' \| 'circle' \| 'dashboard'`                                                    | `'line'`                   |               |
| `[nzFormat]`         | template function of the content                                     | `(percent: number) => string \| TemplateRef<{ $implicit: number }>`                    | `percent => percent + '%'` |               |
| `[nzPercent]`        | to set the completion percentage                                     | `number`                                                                               | `0`                        |               |
| `[nzShowInfo]`       | whether to display the progress value and the status icon            | `boolean`                                                                              | `true`                     | ✅            |
| `[nzStatus]`         | to set the status of the Progress                                    | `'success' \| 'exception' \| 'active' \| 'normal'`                                     | -                          |               |
| `[nzStrokeLinecap]`  | to set the style of the progress linecap                             | `'round' \| 'square'`                                                                  | `'round'`                  | ✅            |
| `[nzStrokeColor]`    | color of progress bar, render linear-gradient when passing an object | `string \| { from: string; to: string: direction: string; [percent: string]: string }` | -                          | ✅            |
| `[nzSuccessPercent]` | segmented success percent                                            | `number`                                                                               | 0                          |               |

### `nzType="line"`

| Property          | Description                                      | Type     | Default |
| ----------------- | ------------------------------------------------ | -------- | ------- |
| `[nzStrokeWidth]` | to set the width of the progress bar, unit: `px` | `number` | `8`     |
| `[nzSteps]`       | the total step count                             | `number` | -       |

### `nzType="circle"`

| Property          | Description                                                                         | Type     | Default | Global Config |
| ----------------- | ----------------------------------------------------------------------------------- | -------- | ------- | ------------- |
| `[nzWidth]`       | to set the canvas width of the circular progress bar, unit: `px`                    | `number` | `132`   |               |
| `[nzStrokeWidth]` | to set the width of the circular progress bar, unit: percentage of the canvas width | `number` | `6`     | ✅            |

### `nzType="dashboard"`

| Property          | Description                                                                          | Type                                     | Default | Global Config |
| ----------------- | ------------------------------------------------------------------------------------ | ---------------------------------------- | ------- | ------------- |
| `[nzWidth]`       | to set the canvas width of the dashboard progress bar, unit: `px`                    | `number`                                 | `132`   |               |
| `[nzStrokeWidth]` | to set the width of the dashboard progress bar, unit: percentage of the canvas width | `number`                                 | `6`     | ✅            |
| `[nzGapDegree]`   | the gap degree of half circle, 0 ~ 360                                               | `number`                                 | `0`     | ✅            |
| `[nzGapPosition]` | the gap position                                                                     | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | ✅            |
