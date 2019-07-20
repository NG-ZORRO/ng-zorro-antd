---
category: Components
type: Navigation
title: Dropdown
---

A dropdown list.

## When To Use

If there are too many operations to display, you can wrap them in a `Dropdown`. By clicking/hovering on the trigger, a dropdown menu should appear, which allows you to choose one option and execute relevant actions.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
```

## API

### [nz-dropdown]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDropdownMenu]` | Dropdown menu | `NzDropdownMenuComponent` | - |
| `[nzDisabled]` | whether the dropdown menu is disabled | `boolean` | - |
| `[nzPlacement]` | placement of pop menu | `'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight'` | `'bottomLeft'` |
| `[nzTrigger]` | the trigger mode which executes the drop-down action | `'click' \| 'hover'` | `'hover'` |
| `[nzClickHide]` | whether hide menu when click | `boolean` | `true` |
| `[nzVisible]` | whether the dropdown menu is visible, double binding | `boolean` | - |
| `[nzBackdrop]` | whether the dropdown has a backdrop when `nzTrigger` is `click` | `boolean` | `true` |
| `[nzOverlayClassName]` | Class name of the dropdown root element | `string` | - |
| `[nzOverlayStyle]` | Style of the dropdown root element | `object` | - |
| `(nzVisibleChange)` | a callback function takes an argument: `nzVisible`, is executed when the visible state is changed | `EventEmitter<boolean>` | - |

You should use [nz-menu](/components/menu/en) in `nz-dropdown`. The menu items and dividers are also available by using `nz-menu-item` and `nz-menu-divider`.

> nz-menu of nz-dropdown is unselectable by default, you can make it selectable via `<ul nz-menu nzSelectable>`.

### nz-dropdown-menu

Wrap Dropdown Menu and pass to `[nz-dropdown]` 和 `NzContextMenuService`, you can export it via Template Syntax `nzDropdownMenu`

> Note：Every `[nz-dropdown]` should pass independent `nz-dropdown-menu`.

```html
<a nz-dropdown [nzDropdownMenu]="menu">Hover me</a>
<nz-dropdown-menu #menu="nzDropdownMenu">
  <ul nz-menu>
    <li nz-menu-item>1st menu item</li>
    <li nz-menu-item>2nd menu item</li>
    <li nz-menu-item>3rd menu item</li>
  </ul>
</nz-dropdown-menu>
```

### NzContextMenuService

Create dropdown with contextmenu, the detail can be found in the example above

| Property | Description | Arguments | Return Value |
| --- | --- | --- | --- |
| create | create dropdown | `($event:MouseEvent, menu:NzDropdownMenuComponent)` | - |
| close | close dropdown | - | - |