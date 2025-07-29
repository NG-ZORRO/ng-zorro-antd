---
category: Components
type: General
title: FloatButton
cover: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HS-wTIIwu0kAAAAAAAAAAAAADrJ8AQ/original'
tag: 19.0.0
description: A button that floats at the top of the page.
---

## When To Use

- For global functionality on the site.
- Buttons that can be seen wherever you browse.

## API

### Common API

| Property          | Description                               | Type                                  | Default     |
| ----------------- | ----------------------------------------- | ------------------------------------- | ----------- |
| `[nzIcon]`        | Set the icon component of button          | `string \| TemplateRef<void>`         | -           |
| `[nzDescription]` | Text and other content                    | `string \| TemplateRef<void> \| null` | -           |
| `[nzType]`        | Button type                               | `'default' \| 'primary'`              | `'default'` |
| `[nzShape]`       | Button shape                              | `'circle' \| 'square'`                | `'circle'`  |
| `[nzHref]`        | The target of hyperlink                   | `string`                              | -           |
| `[nzTarget]`      | Specifies where to display the linked URL | `string`                              | -           |
| `(nzOnClick)`     | Callback of `click` event                 | `EventEmitter<boolean>`               | -           |

### nz-float-button-group

| Property           | Description                                   | Type                                     | Default    |
| ------------------ | --------------------------------------------- | ---------------------------------------- | ---------- |
| `[nzShape]`        | Shape of button group                         | `'circle' \| 'square'`                   | `'circle'` |
| `[nzTrigger]`      | Which action can trigger menu open/close      | `'click' \| 'hover'`                     | -          |
| `[nzPlacement]`    | Customize menu animation placement            | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`    |
| `[nzOpen]`         | Whether the menu is visible or not            | `boolean`                                | -          |
| `(nzOnOpenChange)` | Callback executed when active menu is changed | `EventEmitter<boolean>`                  | -          |

### nz-float-button-top

| Property               | Description                                                                               | Type                    | Default  | Global Config |
| ---------------------- | ----------------------------------------------------------------------------------------- | ----------------------- | -------- | ------------- |
| `[nzVisibilityHeight]` | The `nz-float-button-top` button will not show until the scroll height reaches this value | `number`                | `400`    | ✅            |
| `[nzTarget]`           | Specifies the scrollable area dom node                                                    | `string \| Element`     | `window` | -             |
| `[nzDuration]`         | Duration of scrolling to top (ms)                                                         | `number`                | `450`    | -             |
| `(nzOnClick)`          | Callback executed when click the button                                                   | `EventEmitter<boolean>` | -        | -             |
