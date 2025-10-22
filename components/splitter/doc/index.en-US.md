---
category: Components
type: Layout
title: Splitter
tag: 19.2.0
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original'
description: Splits the area into multiple horizontal or vertical sides.
---

## When To Use

The Splitter component can be used to separate areas horizontally or vertically.
You can freely drag the splitter to adjust the size of each side, while also being able to specify its minimum and
maximum width and height.

## API

### nz-splitter

| Property          | Description                     | Type                         | Default        |
| ----------------- | ------------------------------- | ---------------------------- | -------------- |
| `[nzLayout]`      | Layout direction                | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `[nzLazy]`        | Lazy Mode                       | `boolean`                    | `false`        |
| `(nzResizeStart)` | Callback before dragging starts | `EventEmitter<number[]>`     | -              |
| `(nzResize)`      | Panel size change callback      | `EventEmitter<number[]>`     | -              |
| `(nzResizeEnd)`   | Drag end callback               | `EventEmitter<number[]>`     | -              |

### nz-splitter-panel

| Property          | Description                                                     | Type                                             | Default |
| ----------------- | --------------------------------------------------------------- | ------------------------------------------------ | ------- |
| `[nzDefaultSize]` | Initial panel size support number for px or 'percent%' usage    | `number \| string`                               | -       |
| `[nzMin]`         | Minimum threshold support number for px or 'percent%' usage     | `number \| string`                               | -       |
| `[nzMax]`         | Maximum threshold support number for px or 'percent%' usage     | `number \| string`                               | -       |
| `[nzSize]`        | Controlled panel size support number for px or 'percent%' usage | `number \| string`                               | -       |
| `[nzCollapsible]` | Quick folding                                                   | `boolean  \| { start?: boolean; end?: boolean }` | `false` |
| `[nzResizable]`   | Whether to enable drag and drop                                 | `boolean`                                        | `true`  |
