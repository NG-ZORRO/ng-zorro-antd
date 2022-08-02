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

| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| `[nzBlock]` | Option to fit width to its parent\'s width | `boolean` | false |  |
| `[nzDisabled]` | Disable all segments | `boolean` | false |  |
| `[nzOptions]` |  Set children optional | `string[] \| number[] \| Array<{ label: string; value: string \| number; icon: string; disabled?: boolean; useTemplate?: boolean }>` | - |  |
| `[nzSize]` | The size of the Segmented | `large \| default \| small` | - | ✅ |
| `[ngModel]` | Index of the currently selected option | `number` | - |  |
| `(nzValueChange)` | Emits when index of the currently selected option changes | `EventEmitter<number>` | - |  |
| `(ngModelChange)` | Emits when index of the currently selected option changes | `EventEmitter<number>` | - |  |
