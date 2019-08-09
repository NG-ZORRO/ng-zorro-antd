---
category: Components
type: Data Display
title: Statistic
---

Display statistic number.

## When To Use

- When want to highlight some data.
- When want to display statistic data with description.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
```

## API

### nz-statistic

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzPrefix]` | Prefix of Value | `string \| TemplateRef<void>` | - |
| `[nzSuffix]` | Suffix of Value | `string \| TemplateRef<void>` | - |
| `[nzTitle]` | Title | `string \| TemplateRef<void>` | - |
| `[nzValue]` | Value | `string \| number` | - |
| `[nzValueStyle]` | Value CSS style | `Object` | - |
| `[nzValueTemplate]` | Custom template to render a number | `TemplateRef<{ $implicit: string \| number }>` | - |

### nz-countdown

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzFormat]` | Format string  | `string` | `"HH:mm:ss"` |
| `[nzPrefix]` | Prefix of Value | `string \| TemplateRef<void>` | - |
| `[nzSuffix]` | Suffix of Value | `string \| TemplateRef<void>` | - |
| `[nzTitle]` | Title | `string \| TemplateRef<void>` | - |
| `[nzValue]` | Target time in timestamp form | `string \| number` | - |
| `[nzValueTemplate]` | Custom template to render a time | `TemplateRef<{ $implicit: number }>` | - |
| `(nzCountdownFinish)` | Emit when countdown finishes | `void` | - |

### nzFormat

| Token | Description |
| -------- | ----------- |
| `Y` | Year |
| `M` | Month |
| `D` | Date |
| `H` | Hour |
| `m` | Minute |
| `s` | Second |
| `S` | Millisecond |
