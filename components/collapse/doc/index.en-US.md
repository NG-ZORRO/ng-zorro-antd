---
category: Components
type: Data Display
title: Collapse
cols: 1
cover: 'https://gw.alipayobjects.com/zos/alicdn/IxH16B9RD/Collapse.svg'
description: A content area which can be collapsed and expanded.
---

## When To Use

- Can be used to group or hide complex regions to keep the page clean.
- `Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

## API

### nz-collapse

| Property                 | Description                                                 | Type               | Default   | Global Config |
| ------------------------ | ----------------------------------------------------------- | ------------------ | --------- | ------------- |
| `[nzAccordion]`          | Accordion mode                                              | `boolean`          | `false`   | ✅            |
| `[nzBordered]`           | Set border style                                            | `boolean`          | `true`    | ✅            |
| `[nzGhost]`              | Make the collapse borderless and its background transparent | `boolean`          | `false`   | ✅            |
| `[nzExpandIconPosition]` | Set expand icon position                                    | `'start' \| 'end'` | `'start'` | -             |

### nz-collapse-panel

| Property           | Description                                 | Type                          | Default | Global Config |
| ------------------ | ------------------------------------------- | ----------------------------- | ------- | ------------- |
| `[nzDisabled]`     | If `true`, panel cannot be opened or closed | `boolean`                     | `false` | -             |
| `[nzHeader]`       | Title of the panel                          | `string \| TemplateRef<void>` | -       | -             |
| `[nzExpandedIcon]` | Customize an icon for toggle                | `string \| TemplateRef<void>` | -       | -             |
| `[nzExtra]`        | Extra element in the corner                 | `string \| TemplateRef<void>` | -       | -             |
| `[nzShowArrow]`    | Display arrow or not                        | `boolean`                     | `true`  | ✅            |
| `[nzActive]`       | Active status of panel, double binding      | `boolean`                     | -       | -             |
| `(nzActiveChange)` | Callback function of the active status      | `EventEmitter<boolean>`       | -       | -             |
