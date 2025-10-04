---
category: Components
type: Data Entry
title: InputNumber
cover: 'https://gw.alipayobjects.com/zos/alicdn/XOS8qZ0kU/InputNumber.svg'
tag: 19.0.0
description: Enter a number within certain range with the mouse or keyboard.
---

## When To Use

When a numeric value needs to be provided.

## API

### nz-input-number

| Property           | Description                                                                     | Type                                                                    | Default                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `[ngModel]`        | current value, two way binding                                                  | `number`                                                                | -                                                                                                                                   |
| `[nzId]`           | ID of the input box                                                             | `string`                                                                | -                                                                                                                                   |
| `[nzPlaceHolder]`  | placeholder                                                                     | `string`                                                                | -                                                                                                                                   |
| `[nzAutoFocus]`    | auto focus                                                                      | `boolean`                                                               | `false`                                                                                                                             |
| ~~`[nzBordered]`~~ | ~~whether to have border~~                                                      | ~~`boolean`~~                                                           | ~~`true`~~                                                                                                                          |
| `[nzVariant]`      | Variants of InputNumber                                                         | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'`                | `'outlined'`                                                                                                                        |
| `[nzControls]`     | whether to show up and down buttons                                             | `boolean`                                                               | `true`                                                                                                                              |
| `[nzDisabled]`     | whether to disable                                                              | `boolean`                                                               | `false`                                                                                                                             |
| `[nzFormatter]`    | specify the format of the displayed value                                       | `(value: number) => string`                                             | -                                                                                                                                   |
| `[nzKeyboard]`     | Whether to enable keyboard shortcuts                                            | `boolean`                                                               | `true`                                                                                                                              |
| `[nzMax]`          | maximum value                                                                   | `number`                                                                | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) |
| `[nzMin]`          | minimum value                                                                   | `number`                                                                | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) |
| `[nzParser]`       | specify how to convert back to a number from `formatter`, used with `formatter` | `(value: string) => number`                                             | -                                                                                                                                   |
| `[nzPrecision]`    | numerical precision, the `formatter` configuration takes precedence             | `number`                                                                | -                                                                                                                                   |
| `[nzReadOnly]`     | whether to read only                                                            | `boolean`                                                               | `false`                                                                                                                             |
| `[nzStatus]`       | status, optional `error` `warning`                                              | `'error' \| 'warning'`                                                  | -                                                                                                                                   |
| `[nzSize]`         | input box size, optional `large` `default` `small`                              | `'large' \| 'small' \| 'default'`                                       | `'default'`                                                                                                                         |
| `[nzStep]`         | step of each change, can be a decimal                                           | `number`                                                                | `1`                                                                                                                                 |
| `[nzAddonBefore]`  | The label text displayed before (on the left side of) the input-number          | `string`                                                                | -                                                                                                                                   |
| `[nzAddonAfter]`   | The label text displayed after (on the right side of) the input-number          | `string`                                                                | -                                                                                                                                   |
| `[nzPrefix]`       | The prefix icon for the input-number                                            | `string`                                                                | -                                                                                                                                   |
| `[nzSuffix]`       | The suffix icon for the input-number                                            | `string`                                                                | -                                                                                                                                   |
| `(nzOnStep)`       | callback when clicking the up and down arrows                                   | `EventEmitter<{ value: number, offset: number, type: 'up' \| 'down' }>` | -                                                                                                                                   |
| `(nzFocus)`        | callback when focus                                                             | `OutputRef<void>`                                                       | -                                                                                                                                   |
| `(nzBlur)`         | callback when blur                                                              | `OutputRef<void>`                                                       | -                                                                                                                                   |
| `(ngModelChange)`  | callback function when the value changes                                        | `EventEmitter<number>`                                                  | -                                                                                                                                   |

#### Methods

You can get instance by `ViewChild`

| Name    | Description  |
| ------- | ------------ |
| focus() | get focus    |
| blur()  | remove focus |

## FAQ

### Why can the `value` exceed the `min` and `max` range in controlled mode?

In controlled mode, developers may store related data by themselves. If the component constrains the data back to the range, it will cause the displayed data to be inconsistent with the actual stored data. This leads to potential data problems in some scenarios such as form fields.
