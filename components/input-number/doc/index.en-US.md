---
category: Components
type: Data Entry
title: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

> Note：InputNumber will validate the input value only when `(blur)` and `(keydown.enter)` happened other than when user input character to avoid error `ngModelChange` output (-0.02001 or -1.0e28)

## When To Use

When a numeric value needs to be provided.

## API

### Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzInputNumberModule } from 'ng-zorro-antd';
```

### nz-input-number

| property | description | type | default |
| -------- | ----------- | ---- | ------- |
| `[ngModel]` | current value, double binding | `number｜string` ｜ `string` | - |
| `[nzAutoFocus]` | get focus when component mounted | `boolean` | `false` |
| `[nzDisabled]` | disable the input | `boolean` | `false` |
| `[nzMax]` | max vale | `number` | `Infinity` |
| `[nzMin]` | min value | `number` | `-Infinity` |
| `[nzFormatter]` | Specifies the format of the value presented | `(value: number｜string) => string｜number` | - |
| `[nzParser]` | Specifies the value extracted from nzFormatter | `(value: string) => string｜number` | - |
| `[nzPrecision]` | precision of input value | `number` | - |
| `[nzSize]` | width of input box | `'large'｜'small'｜'default'` | `'default'` |
| `[nzStep]` | The number to which the current value is increased or decreased. It can be an integer or decimal. | `number｜string` | `1` |
| `[nzPlaceHolder]` | Placeholder of select | `string` | - |
| `(ngModelChange)` | The callback triggered when the value is changed | `EventEmitter<number>` | - |
| `(nzFocus)` | focus callback | `EventEmitter<void>` | - |
| `(nzBlur)` | blur callback | `EventEmitter<void>` | - |

#### Methods

You can get instance by `ViewChild`

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
