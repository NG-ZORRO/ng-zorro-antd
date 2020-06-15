---
category: Components
type: Data Entry
title: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

```ts
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
```

## API

### nz-input-number

| property | description | type | default |
| -------- | ----------- | ---- | ------- |
| `[ngModel]` | current value, double binding | `number \| string`  \|  `string` | - |
| `[nzAutoFocus]` | get focus when component mounted | `boolean` | `false` |
| `[nzDisabled]` | disable the input | `boolean` | `false` |
| `[nzMax]` | max value | `number` | `Infinity` |
| `[nzMin]` | min value | `number` | `-Infinity` |
| `[nzFormatter]` | Specifies the format of the value presented | `(value: number \| string) => string \| number` | - |
| `[nzParser]` | Specifies the value extracted from nzFormatter | `(value: string) => string \| number` | `(value: string) => value.trim().replace(/。/g, '.').replace(/[^\w\.-]+/g, '')` |
| `[nzPrecision]` | precision of input value | `number` | - |
| `[nzPrecisionMode]` | The method for calculating the precision of input value | `'cut' \| 'toFixed' \| ((value: number \| string, precision?: number) => number)` | `'toFixed'` |
| `[nzSize]` | width of input box | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzStep]` | The number to which the current value is increased or decreased. It can be an integer or decimal. | `number \| string` | `1` |
| `[nzInputMode]` | enumerated attribute that hints at the type of data that might be entered by the user, [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) | `string` | `decimal` |
| `[nzPlaceHolder]` | Placeholder of select | `string` | - |
| `[nzId]` | input id attribute inside the component| `string` | - |
| `(ngModelChange)` | The callback triggered when the value is changed | `EventEmitter<number>` | - |
| `(nzFocus)` | focus callback | `EventEmitter<void>` | - |
| `(nzBlur)` | blur callback | `EventEmitter<void>` | - |

#### Methods

You can get instance by `ViewChild`

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
