---
category: Components
type: Data Entry
title: Checkbox
---

Checkbox.

## When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

## API

### nz-checkbox

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzAutoFocus | get focus when component mounted | boolean | false |
| nzDisabled | Disable checkbox | boolean | false |
| ngModel | Specifies whether the checkbox is selected, double binding | boolean | false |
| ngModelChange | The callback function that is triggered when the state changes. | (ngModel:boolean)=>{} | - |
| nzIndeterminate | set the status of indeterminate，only affect the style | boolean | false |
| nzValue | use for the callback of `nz-checkbox-wrapper` | string | - |

### nz-checkbox-group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| ngModel | Specifies options, double binding |  `Array<{ label: string; value: string; checked?: boolean; }>` | `[]` |
| ngModelChange | The callback function that is triggered when the state changes. | `(ngModel:Array<{ label: string; value: string; checked?: boolean; }>)=>{}` | - |
| nzDisabled | Disable all checkboxes | boolean | false |

### nz-checkbox-wrapper

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzOnChange | The callback function that is triggered when the state changes. | `(list:string[])=>{}` | - |

## Methods

### nz-checkbox

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
