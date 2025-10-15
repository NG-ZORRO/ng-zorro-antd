---
category: Components
type: Data Display
title: Segmented
cover: 'https://gw.alipayobjects.com/zos/bmw-prod/a3ff040f-24ba-43e0-92e9-c845df1612ad.svg'
description: Display multiple options and allow users to select a single option.
---

## When To Use

- When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.

## API

### nz-segmented

| Property          | Description                                               | Type                                                                                                          | Default   | Global Config | Version |
| ----------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------- | ------------- | ------- |
| `[nzBlock]`       | Option to fit width to its parent\'s width                | `boolean`                                                                                                     | `false`   |               |
| `[nzDisabled]`    | Disable all segments                                      | `boolean`                                                                                                     | `false`   |               |
| `[nzOptions]`     | Set children optional                                     | `string[] \| number[] \| Array<{ label: string; value: string \| number; icon: string; disabled?: boolean }>` | -         |               |
| `[nzSize]`        | The size of the Segmented                                 | `large \| default \| small`                                                                                   | -         | ✅            |
| `[nzShape]`       | Shape of Segmented                                        | `default \| round`                                                                                            | `default` | -             | 20.3.0  |
| `[nzVertical]`    | Orientation                                               | `boolean`                                                                                                     | `false`   | -             | 20.2.0  |
| `[nzName]`        | The name property of all `input[type="radio"]` children   | `string`                                                                                                      | -         |               | 20.3.0  |
| `[ngModel]`       | Value of the currently selected option                    | `string \| number`                                                                                            | -         |               |
| `(nzValueChange)` | Emits when value of the currently selected option changes | `EventEmitter<string \| number>`                                                                              | -         |               |
| `(ngModelChange)` | Emits when value of the currently selected option changes | `EventEmitter<string \| number>`                                                                              | -         |               |

### label[nz-segmented-item]

| Property       | Description                | Type               | Default | Global Config |
| -------------- | -------------------------- | ------------------ | ------- | ------------- |
| `[nzIcon]`     | Icon in segmented item     | `string`           | -       |               |
| `[nzValue]`    | Value of segmented item    | `string \| number` | -       |               |
| `[nzDisabled]` | Disable the segmented item | `boolean`          | `false` |               |
