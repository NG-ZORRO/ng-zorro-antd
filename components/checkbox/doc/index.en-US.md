---
category: Components
type: Data Entry
title: Checkbox
---

Checkbox.

## When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

```ts
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
```

## API

### [nz-checkbox]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzAutoFocus]` | get focus when component mounted | `boolean` | `false` |
| `[nzDisabled]` | Disable checkbox | `boolean` | `false` |
| `[ngModel]` | Specifies whether the checkbox is selected, double binding | `boolean` | `false` |
| `[nzIndeterminate]` | set the status of indeterminate，only affect the style | `boolean` | `false` |
| `[nzValue]` | use for the callback of `nz-checkbox-wrapper` | `any` | - |
| `(ngModelChange)` | The callback function that is triggered when the state changes. | `EventEmitter<boolean>` | - |

### nz-checkbox-group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[ngModel]` | Specifies options, double binding |  `Array<{ label: string; value: string; checked?: boolean; }>` | `[]` |
| `[nzDisabled]` | Disable all checkboxes | `boolean` | `false` |
| `(ngModelChange)` | The callback function that is triggered when the state changes. | `EventEmitter<Array<{ label: string; value: string; checked?: boolean; }>>` | - |

### nz-checkbox-wrapper

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `(nzOnChange)` | The callback function that is triggered when the state changes. | `EventEmitter<any[]>` | - |

## Methods

### [nz-checkbox]

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
