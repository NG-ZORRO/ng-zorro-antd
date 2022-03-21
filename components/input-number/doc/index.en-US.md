---
category: Components
type: Data Entry
title: InputNumber
cover: https://gw.alipayobjects.com/zos/alicdn/XOS8qZ0kU/InputNumber.svg
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
| `[nzBorderless]` | hide the border style or not | `boolean` | `false` |
| `[nzControls]` | show `+-` controls or not | `boolean` | `true` |
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

### nz-input-number-group

| property | description | type | default |
| --- | --- | --- | --- |
| `[nzSize]` | set the sizes of all `nz-input-number` inside `nz-input-number-group` | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzAddOnAfter]` | the label text displayed after (on the right side of) the input field | `string \| TemplateRef<void>` | - |
| `[nzAddOnBefore]` | the label text displayed before (on the left side of) the input field | `string \| TemplateRef<void>` | - |
| `[nzAddOnAfterIcon]` | define the `outline` Icon type inside `nzAddonAfter` | `string` | - |
| `[nzAddOnBeforeIcon]` | define the `outline` Icon type inside `nzAddonBefore` | `string` | - |
| `[nzPrefix]` | define the prefix label | `string \| TemplateRef<void>` | - |
| `[nzPrefixIcon]` | define the `outline` Icon type of the prefix label | `string` | - |

#### Methods

You can get instance by `ViewChild`

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
