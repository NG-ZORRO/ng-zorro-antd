---
category: Components
type: Data Entry
title: Switch
cover: 'https://gw.alipayobjects.com/zos/alicdn/zNdJQMhfm/Switch.svg'
description: Used to toggle between two states.
---

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

## API

### nz-switch

| Property                | Description                                                             | Type                          | Default     | Global Config |
| ----------------------- | ----------------------------------------------------------------------- | ----------------------------- | ----------- | ------------- |
| `[nzId]`                | button id attribute inside the component                                | `string`                      | -           |
| `[ngModel]`             | determine whether the `nz-switch` is checked, double binding            | `boolean`                     | `false`     |
| `[nzCheckedChildren]`   | content to be shown when the state is checked                           | `string \| TemplateRef<void>` | -           |
| `[nzUnCheckedChildren]` | content to be shown when the state is unchecked                         | `string \| TemplateRef<void>` | -           |
| `[nzDisabled]`          | Disable switch                                                          | `boolean`                     | `false`     |
| `[nzSize]`              | the size of the `nz-switch`, options: `default` `small`                 | `'small' \| 'default'`        | `'default'` | ✅            |
| `[nzLoading]`           | loading state of switch                                                 | `boolean`                     | `false`     |
| `[nzControl]`           | determine whether fully control state by user                           | `boolean`                     | `false`     |
| `(ngModelChange)`       | a callback function, can be executed when the checked state is changing | `EventEmitter<boolean>`       | -           |

#### Methods

| Name    | Description  |
| ------- | ------------ |
| focus() | get focus    |
| blur()  | remove focus |
