---
category: Components
type: Data Entry
title: Radio
---

Radio.

## When To Use

- Used to select a single state in multiple options.
- The difference between Select is that Radio is visible to user and can facilitate the comparison of choice. So, when you want to use Radio, option should not be too much.

## API

### nz-radio | nz-radio-button

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzAutoFocus | get focus when component mounted | boolean | false |
| nzDisabled | Disable radio | boolean | false |
| ngModel | Specifies whether the radio is selected, double binding | boolean | false |
| ngModelChange | The callback function that is triggered when the state changes. | (ngModel:boolean)=>{} | - |
| nzValue | use with `nz-radio-group` | string | - |

### nz-radio-group

radio group，wrap a group of `nz-radio`。

| Property | Description | Type | Default |
| -------- | ----------- | ---- | -------- | ------- |
| ngModel | current selected `nz-radio` value, double binding| string | - |
| ngModelChange | the callback function when current selected `nz-radio` value change | (ngModel:string)=>{} | - |
| nzName | The `name` property of all `input[type="radio"]` children | string  | none |
| nzDisabled | Disable all radio buttons | boolean |  false |
| nzSize | Size, only on radio style | `large` `default` `small` | `default` |

## Methods

### nz-radio

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
