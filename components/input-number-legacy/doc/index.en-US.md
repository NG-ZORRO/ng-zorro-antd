---
category: Components
type: Data Entry
title: InputNumberLegacy
cover: 'https://gw.alipayobjects.com/zos/alicdn/XOS8qZ0kU/InputNumber.svg'
tag: deprecated
description: Enter a number within certain range with the mouse or keyboard.
---

> ⚠️ `InputNumberLegacy` has been deprecated in `v19.0.0`, and will be removed in `v21.0.0`, please use the new version of `InputNumber` component.

## When To Use

When a numeric value needs to be provided.

## API

### nz-input-number

| property            | description                                                                                                                                                                 | type                                                                              | default                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `[ngModel]`         | current value, double binding                                                                                                                                               | `number \| string` \| `string`                                                    | -                                                                               |
| `[nzAutoFocus]`     | get focus when component mounted                                                                                                                                            | `boolean`                                                                         | `false`                                                                         |
| `[nzDisabled]`      | disable the input                                                                                                                                                           | `boolean`                                                                         | `false`                                                                         |
| `[nzReadOnly]`      | If readonly the input                                                                                                                                                       | `boolean`                                                                         | `false`                                                                         |
| `[nzMax]`           | max value                                                                                                                                                                   | `number`                                                                          | `Infinity`                                                                      |
| `[nzMin]`           | min value                                                                                                                                                                   | `number`                                                                          | `-Infinity`                                                                     |
| `[nzFormatter]`     | Specifies the format of the value presented                                                                                                                                 | `(value: number \| string) => string \| number`                                   | -                                                                               |
| `[nzParser]`        | Specifies the value extracted from nzFormatter                                                                                                                              | `(value: string) => string \| number`                                             | `(value: string) => value.trim().replace(/。/g, '.').replace(/[^\w\.-]+/g, '')` |
| `[nzPrecision]`     | precision of input value                                                                                                                                                    | `number`                                                                          | -                                                                               |
| `[nzPrecisionMode]` | The method for calculating the precision of input value                                                                                                                     | `'cut' \| 'toFixed' \| ((value: number \| string, precision?: number) => number)` | `'toFixed'`                                                                     |
| `[nzSize]`          | width of input box                                                                                                                                                          | `'large' \| 'small' \| 'default'`                                                 | `'default'`                                                                     |
| `[nzStatus]`        | Set validation status                                                                                                                                                       | `'error' \| 'warning'`                                                            | -                                                                               |
| `[nzStep]`          | The number to which the current value is increased or decreased. It can be an integer or decimal.                                                                           | `number \| string`                                                                | `1`                                                                             |
| `[nzInputMode]`     | enumerated attribute that hints at the type of data that might be entered by the user, [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) | `string`                                                                          | `'decimal'`                                                                     |
| `[nzPlaceHolder]`   | Placeholder of select                                                                                                                                                       | `string`                                                                          | -                                                                               |
| `[nzId]`            | input id attribute inside the component                                                                                                                                     | `string`                                                                          | -                                                                               |
| `(ngModelChange)`   | The callback triggered when the value is changed                                                                                                                            | `EventEmitter<number>`                                                            | -                                                                               |
| `(nzFocus)`         | focus callback                                                                                                                                                              | `EventEmitter<void>`                                                              | -                                                                               |
| `(nzBlur)`          | blur callback                                                                                                                                                               | `EventEmitter<void>`                                                              | -                                                                               |

### nz-input-number-group

| Property          | Description                                                                                                 | Type                              | Default     |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `[nzAddOnAfter]`  | The label text displayed after (on the right side of) the input number field, can work with `nzAddOnBefore` | `string \| TemplateRef<void>`     | -           |
| `[nzAddOnBefore]` | The label text displayed before (on the left side of) the input number field, can work with `nzAddOnAfter`  | `string \| TemplateRef<void>`     | -           |
| `[nzPrefix]`      | The prefix icon for the Input Number, can work with `nzSuffix`                                              | `string \| TemplateRef<void>`     | -           |
| `[nzSuffix]`      | The suffix icon for the Input Number, can work with `nzPrefix`                                              | `string \| TemplateRef<void>`     | -           |
| `[nzPrefixIcon]`  | The prefix icon for the Input Number                                                                        | `string`                          | -           |
| `[nzSuffixIcon]`  | The suffix icon for the Input Number                                                                        | `string`                          | -           |
| `[nzSize]`        | The size of `nz-input-number-group` specifies the size of the included `nz-input-number` fields             | `'large' \| 'small' \| 'default'` | `'default'` |
| `[nzStatus]`      | Set validation status                                                                                       | `'error' \| 'warning'`            | -           |

#### Methods

You can get instance by `ViewChild`

| Name    | Description  |
| ------- | ------------ |
| focus() | get focus    |
| blur()  | remove focus |
