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

### [nz-radio] | [nz-radio-button]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzAutoFocus]` | get focus when component mounted | boolean | false |
| `[nzDisabled]` | Disable radio | boolean | false |
| `[ngModel]` | Specifies whether the radio is selected, double binding | boolean | false |
| `[nzValue]` | use with `nz-radio-group` | string | - |
| `(ngModelChange)` | The callback function that is triggered when the state changes. | `EventEmitter<boolean>` | - |

### nz-radio-group

radio group，wrap a group of `nz-radio`。

| Property | Description | Type | Default |
| -------- | ----------- | ---- | -------- | ------- |
| `[ngModel]` | current selected `nz-radio` value, double binding| string | - |
| `[nzName]` | The `name` property of all `input[type="radio"]` children | string  | none |
| `[nzDisabled]` | Disable all radio buttons | boolean |  false |
| `[nzSize]` | Size, only on radio style | `large` `default` `small` | `default` |
| `(ngModelChange)` | the callback function when current selected `nz-radio` value change | `EventEmitter<string>` | - |
| `[nzButtonStyle]` | style type of radio button | `outline` 丨 `solid` | `outline` |

## Methods

### [nz-radio]

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
