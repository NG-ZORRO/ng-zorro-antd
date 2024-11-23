---
category: Components
type: Data Display
title: Segmented
cover: https://gw.alipayobjects.com/zos/bmw-prod/a3ff040f-24ba-43e0-92e9-c845df1612ad.svg
---

## When To Use

- When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.

```ts
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
```

## API

### nz-segmented:standalone

| Property          | Description                                               | Type                                                                                                          | Default | Global Config |
| ----------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------- | ------------- |
| `[nzBlock]`       | Option to fit width to its parent\'s width                | `boolean`                                                                                                     | false   |               |
| `[nzDisabled]`    | Disable all segments                                      | `boolean`                                                                                                     | false   |               |
| `[nzOptions]`     | Set children optional                                     | `string[] \| number[] \| Array<{ label: string; value: string \| number; icon: string; disabled?: boolean }>` | -       |               |
| `[nzSize]`        | The size of the Segmented                                 | `large \| default \| small`                                                                                   | -       | ✅             |
| `[ngModel]`       | Value of the currently selected option                    | `string \| number`                                                                                            | -       |               |
| `(nzValueChange)` | Emits when value of the currently selected option changes | `EventEmitter<string \| number>`                                                                              | -       |               |
| `(ngModelChange)` | Emits when value of the currently selected option changes | `EventEmitter<string \| number>`                                                                              | -       |               |

### label[nz-segmented-item]:standalone

| Property       | Description                | Type               | Default | Global Config |
| -------------- | -------------------------- | ------------------ | ------- | ------------- |
| `[nzIcon]`     | Icon in segmented item     | `string`           | -       |               |
| `[nzValue]`    | Value of segmented item    | `string \| number` | -       |               |
| `[nzDisabled]` | Disable the segmented item | `boolean`          | false   |               |
