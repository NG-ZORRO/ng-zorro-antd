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

### common API

| Property          | Description                               | Type                          | Default     |
| ----------------- | ----------------------------------------- | ----------------------------- | ----------- |
| `[nzIcon]`        | Set the icon component of button          | `TemplateRef<void>`           | -           |
| `[nzDescription]` | Text and other                            | `TemplateRef<void> \| string` | -           |
| `[nzType]`        | Setting button type                       | `'default' \| 'primary'`      | `'default'` |
| `[nzShape]`       | Setting button shape                      | `'circle' \| 'square'`        | `'circle'`  |
| `[nzHref]`        | The target of hyperlink                   | `string`                      | -           |
| `[nzTarget]`      | Specifies where to display the linked URL | `string`                      | -           |
| `(nzOnClick)`     | Set the handler to handle `click` event   | `EventEmitter<boolean>`       | -           |

### nz-float-button-group

| Property           | Description                                   | Type                                     | Default    |
| ------------------ | --------------------------------------------- | ---------------------------------------- | ---------- |
| `[nzShape]`        | Set button group shape                        | `'circle' \| 'square'`                   | `'circle'` |
| `[nzTrigger]`      | Which action can trigger menu open/close      | `'click' \| 'hover'`                     | -          |
| `[nzOpen]`         | Whether the menu is visible or not            | `boolean`                                | -          |
| `[nzPlacement]`    | Customize menu animation placement            | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`    |
| `(nzOnOpenChange)` | Callback executed when active menu is changed | `EventEmitter<boolean>`                  | -          |

### nz-float-button-top

| Property               | Description                                                                               | Type                    | Default  | Global Config |
| ---------------------- | ----------------------------------------------------------------------------------------- | ----------------------- | -------- | ------------- |
| `[nzVisibilityHeight]` | the `nz-float-button-top` button will not show until the scroll height reaches this value | `number`                | `400`    | ✅            |
| `[nzTarget]`           | specifies the scrollable area dom node                                                    | `string \| Element`     | `window` |
| `[nzDuration]`         | Time to return to top (ms)                                                                | `number`                | `450`    |
| `(nzOnClick)`          | a callback function, which can be executed when you click the button                      | `EventEmitter<boolean>` | -        |
