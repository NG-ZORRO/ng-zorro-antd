---
category: Components
type: Navigation
title: Dropdown
---

A dropdown list.

## When To Use

If there are too many operations to display, you can wrap them in a `Dropdown`. By clicking/hovering on the trigger, a dropdown menu should appear, which allows you to choose one option and execute relevant actions.

## API

### nz-dropdown

> You should add  `[nz-dropdown]` to the element that trigger dropdown

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDisabled]` | whether the dropdown menu is disabled | `boolean` | - |
| `[nzPlacement]` | placement of pop menu | `'bottomLeft'｜'bottomCenter'｜'bottomRight'｜'topLeft'｜'topCenter'｜'topRight'` | `'bottomLeft'` |
| `[nzTrigger]` | the trigger mode which executes the drop-down action | `'click'｜'hover'` | `'hover'` |
| `[nzClickHide]` | whether hide menu when click | `boolean` | `true` |
| `[nzVisible]` | whether the dropdown menu is visible, double binding | `boolean` | - |
| `[nzOverlayClassName]` | Class name of the dropdown root element | `string` | - |
| `[nzOverlayStyle]` | Style of the dropdown root element | `object` | - |
| `(nzVisibleChange)` | a callback function takes an argument: `nzVisible`, is executed when the visible state is changed | `EventEmitter<boolean>` | - |

You should use [nz-menu](/components/menu/en) in `nz-dropdown`. The menu items and dividers are also available by using `nz-menu-item` and `nz-menu-divider`.

> nz-menu of nz-dropdown is unselectable by default, you can make it selectable via `<ul nz-menu nzSelectable>`.

### [nz-dropdown]

mark the element that trigger dropdown

### nz-dropdown-button

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDisabled]` | whether the dropdown menu is disabled | `boolean` | - |
| `[nzPlacement]` | placement of pop menu | `'bottomLeft'｜'bottomCenter'｜'bottomRight'｜'topLeft'｜'topCenter'｜'topRight'` | `'bottomLeft'` |
| `[nzSize]` | size of the button, the same as [nz-buutton](/components/button/en) | `'large'｜'small'｜'default'` | `'default'` |
| `[nzType]` | type of the button, the same as [nz-button](/components/button/en) | `'primary'｜'ghost'｜'dashed'｜'danger'｜'default'` | `'default'` |
| `[nzTrigger]` | the trigger mode which executes the drop-down action | `'click'｜'hover'` | `'hover'` |
| `[nzClickHide]` | whether hide menu when click | `boolean` | `true` |
| `[nzVisible]` | whether the dropdown menu is visible | `boolean` | - |
| `(nzVisibleChange)` | a callback function takes an argument: `nzVisible`, is executed when the visible state is changed | `EventEmitter<boolean>` | - |
| `(nzClick)` | a callback function which will be executed when you click the button on the left | `EventEmitter<MouseEvent>` | - |


### NzDropdownService

Create dropdown with contextmenu, the detail can be found in the example above

| Property | Description | Arguments | Return Value |
| --- | --- | --- | --- |
| create | create dropdown | `($event:MouseEvent, template:TemplateRef<void>)` | `NzDropdownContextComponent` |
| close | close dropdown | - | - |