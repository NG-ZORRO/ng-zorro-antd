---
category: Components
type: Data Entry
title: Radio
cover: 'https://gw.alipayobjects.com/zos/alicdn/8cYb5seNB/Radio.svg'
description: Used to select a single state from multiple options.
---

## When To Use

- Used to select a single state in multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

## API

### [nz-radio] | [nz-radio-button]

| Property          | Description                                                     | Type                    | Default |
| ----------------- | --------------------------------------------------------------- | ----------------------- | ------- |
| `[nzAutoFocus]`   | get focus when component mounted                                | `boolean`               | `false` |
| `[nzDisabled]`    | Disable radio                                                   | `boolean`               | `false` |
| `[ngModel]`       | Specifies whether the radio is selected, double binding         | `boolean`               | `false` |
| `[nzValue]`       | use with `nz-radio-group`                                       | `any`                   | -       |
| `(ngModelChange)` | The callback function that is triggered when the state changes. | `EventEmitter<boolean>` | -       |

### nz-radio-group

radio group，wrap a group of `nz-radio`。

| Property          | Description                                                         | Type                              | Default     |
| ----------------- | ------------------------------------------------------------------- | --------------------------------- | ----------- |
| `[ngModel]`       | current selected `nz-radio` value, double binding                   | `any`                             | -           |
| `[nzName]`        | The `name` property of all `input[type="radio"]` children           | `string`                          | -           |
| `[nzDisabled]`    | Disable all radio buttons                                           | `boolean`                         | `false`     |
| `[nzSize]`        | Size, only on radio style                                           | `'large' \| 'small' \| 'default'` | `'default'` |
| `(ngModelChange)` | the callback function when current selected `nz-radio` value change | `EventEmitter<string>`            | -           |
| `[nzButtonStyle]` | style type of radio button                                          | `'outline' \| 'solid'`            | `'outline'` |

## Methods

### [nz-radio]

you can get `NzRadioComponent` via `ViewChild`

| Name      | Description  |
| --------- | ------------ |
| `blur()`  | remove focus |
| `focus()` | get focus    |
