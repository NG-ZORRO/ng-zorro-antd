---
category: Components
type: Data Entry
title: Rate
---

Rate component.

## When To Use

- Show evaluation.
- A quick rating operation on something.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzRateModule } from 'ng-zorro-antd/rate';
```

## API

### nz-rate

| Property | Description | type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzAllowClear]` | whether to allow clear when click again | `boolean` | `true` | ✅ |
| `[nzAllowHalf]` | whether to allow semi selection | `boolean` | `false` | ✅ |
| `[nzAutoFocus]` | get focus when component mounted | `boolean` | `false` |
| `[nzCharacter]` | custom character of rate | `TemplateRef<void>` | `<i nz-icon nzType="star"></i>` |
| `[nzCount]` | star count | `number` | `5` |
| `[nzDisabled]` | read only, unable to interact | `boolean` | `false` |
| `[nzTooltips]` | Customize tooltip by each character | `string[]` | `[]` |
| `[ngModel]` | current value , double binding | `number` | - |
| `(ngModelChange)` | callback when select value | `EventEmitter<number>` | - |
| `(nzOnBlur)` | callback when component lose focus | `EventEmitter<FocusEvent>` | - |
| `(nzOnFocus)` | callback when component get focus | `EventEmitter<FocusEvent>` | - |
| `(nzOnHoverChange)` | callback when hover item | `EventEmitter<number>` | - |
| `(nzOnKeyDown)` | callback when keydown on component | `EventEmitter<KeyboardEvent>` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
