---
type: Feedback
category: Components
subtitle:
title: Drawer
---

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since that user can interact with the Drawer without leaving the current page, tasks can be achieved more efficient within the same context.

## When To Use

* Use a Form to create or edit a set of information.
* Processing subtasks. When subtasks are too heavy for Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
* When a same Form is needed in multiple places.

## API

### nz-drawer

| Props | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzClosable]` | Whether a close (x) button is visible on top right of the Drawer dialog or not. | `boolean` | `true` |
| `[nzMask]` | Whether to show mask or not. | `boolean` | `true` |
| `[nzMaskClosable]` | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` | `true` |
| `[nzMaskStyle]` | Style for Drawer's mask element. | `object` | `{}` |
| `[nzBodyStyle]` | Body style for modal body element. Such as height, padding etc. | `object` | `{}` |
| `[nzTitle]` | The title for Drawer. | `string`  `TemplateRef<{}>` | - |
| `[nzVisible]` | Whether the Drawer dialog is visible or not. | `boolean` | `false` |
| `[nzWidth]` | Width of the Drawer dialog. | `number` `string` | `256` |
| `[nzWrapClassName]` | The class name of the container of the Drawer dialog. | `string` | - |
| `[nzZIndex]` | The `z-index` of the Drawer. | `number` | `1000` |
| `[nzPlacement]` | The placement of the Drawer. | `'left'` `'right'` | `'right'` |
| `[nzOffsetX]` | The the X coordinate offset(px) | `number` | `0` |
| `(nzOnClose)` | Specify a callback that will be called when a user clicks mask, close button or Cancel button. | `EventEmitter<MouseEvent>` | - |
