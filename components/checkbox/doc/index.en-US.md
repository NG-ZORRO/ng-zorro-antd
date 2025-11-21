---
category: Components
type: Data Entry
title: Checkbox
cover: 'https://gw.alipayobjects.com/zos/alicdn/8nbVbHEm_/CheckBox.svg'
description: Collect user's choices.
---

## When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

## API

### [nz-checkbox]

| Property            | Description                                                     | Type                    | Default |
| ------------------- | --------------------------------------------------------------- | ----------------------- | ------- |
| `[nzId]`            | input id attribute inside the component                         | `string`                | -       |
| `[nzName]`          | input name attribute inside the component                       | `string`                | -       |
| `[nzAutoFocus]`     | get focus when component mounted                                | `boolean`               | `false` |
| `[nzDisabled]`      | Disable checkbox                                                | `boolean`               | `false` |
| `[ngModel]`         | Specifies whether the checkbox is selected, double binding      | `boolean`               | `false` |
| `[nzIndeterminate]` | set the status of indeterminate，only affect the style          | `boolean`               | `false` |
| `[nzValue]`         | use for the callback of `nz-checkbox-wrapper`                   | `any`                   | -       |
| `(ngModelChange)`   | The callback function that is triggered when the state changes. | `EventEmitter<boolean>` | -       |

### nz-checkbox-group

| Property          | Description                                                     | Type                                         | Default |
| ----------------- | --------------------------------------------------------------- | -------------------------------------------- | ------- |
| `[ngModel]`       | Specifies options, double binding                               | `string[] \| number[]`                       | `[]`    |
| `[nzName]`        | The `name` property of all input children                       | `string`                                     | -       |
| `[nzOptions]`     | Specifies options                                               | `string[] \| number[] \| NzCheckboxOption[]` | `[]`    |
| `[nzDisabled]`    | Disable all checkboxes                                          | `boolean`                                    | `false` |
| `(ngModelChange)` | The callback function that is triggered when the state changes. | `EventEmitter<string[] \| number[]>`         | -       |

## Methods

### [nz-checkbox]

| Name      | Description  |
| --------- | ------------ |
| `focus()` | get focus    |
| `blur()`  | remove focus |

## Interfaces

### NzCheckboxOption

```ts
export interface NzCheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
```
