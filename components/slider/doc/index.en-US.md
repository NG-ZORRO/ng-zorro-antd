---
category: Components
type: Data Entry
title: Slider
cover: 'https://gw.alipayobjects.com/zos/alicdn/HZ3meFc6W/Silder.svg'
description: A Slider component for displaying current value and intervals in range.
---

## When To Use

To input a value in a range.

## API

### nz-slider

| Property               | Description                                                                                                                                          | Type                                             | Default                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| `[nzDisabled]`         | If true, the slider will not be interactable.                                                                                                        | `boolean`                                        | `false`                                                                          |
| `[nzDots]`             | Whether the thumb can drag over tick only.                                                                                                           | `boolean`                                        | `false`                                                                          |
| `[nzIncluded]`         | Make effect when `marks` not null，`true` means containment and `false` means coordinative                                                           | `boolean`                                        | `true`                                                                           |
| `[nzMarks]`            | Tick mark of Slider, type of key must be `number`, and must in closed interval `[min, max]` ，each mark can declare its own style.                   | `object`                                         | `{ number: string/HTML }` or `{ number: { style: object, label: string/HTML } }` |
| `[nzMax]`              | The maximum value the slider can slide to                                                                                                            | `number`                                         | `100`                                                                            |
| `[nzMin]`              | The minimum value the slider can slide to.                                                                                                           | `number`                                         | `0`                                                                              |
| `[nzRange]`            | dual thumb mode                                                                                                                                      | `boolean`                                        | `false`                                                                          |
| `[nzStep]`             | The granularity the slider can step through values. Must greater than 0, and be divided by (max - min) . When `marks` no null, `step` can be `null`. | `number \| null`                                 | `1`                                                                              |
| `[nzTipFormatter]`     | Slider will pass its value to `tipFormatter`, and display its value in Tooltip, and hide Tooltip when return value is null.                          | `(value: number) => string \| TemplateRef<void>` | -                                                                                |
| `[ngModel]`            | The value of slider. When `range` is `false`, use `number`, otherwise, use `[number, number]`                                                        | `number \| number[]`                             | -                                                                                |
| `[nzVertical]`         | If true, the slider will be vertical.                                                                                                                | `boolean`                                        | `false`                                                                          |
| `[nzReverse]`          | Reverse the component                                                                                                                                | `boolean`                                        | `false`                                                                          |
| `[nzTooltipVisible]`   | When set to `always` tooltips are always displayed. When set to `never` they are never displayed                                                     | `'default' \| 'always' \| 'never'`               | `'default'`                                                                      |
| `[nzTooltipPlacement]` | Set the default placement of Tooltip                                                                                                                 | `string`                                         |                                                                                  |
| `(nzOnAfterChange)`    | Fire when `onmouseup` is fired.                                                                                                                      | `EventEmitter<number[] \| number>`               | -                                                                                |
| `(ngModelChange)`      | Callback function that is fired when the user changes the slider's value.                                                                            | `EventEmitter<number[] \| number>`               | -                                                                                |
