---
category: Components
cols: 1
type: Navigation
title: Menu
---

Menu list of Navigation.

## When To Use

Navigation menu is important for a website, it helps users jump from one site section to another quickly. Mostly, it includes top navigation and side navigation. Top navigation provides all the category and functions of the website. Side navigation provides the Multi-level structure of the website.

More layouts with navigation: [layout](/components/layout/en).

## API

```html
<ul nz-menu>
  <li nz-menu-item>Menu</li>
  <li nz-submenu>
    <span title>SubMenu</span>
    <ul>
      <li nz-menu-item>SubMenuItem</li>
    </ul>
  </li>
</ul>
```

### [nz-menu]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[nzInlineCollapsed]` | specifies the collapsed status when menu is inline mode | boolean | - |
| `[nzInlineIndent]` | indent px of inline menu item on each level | number | 24 |
| `[nzMode]` | type of the menu; `vertical`, `horizontal`, and `inline` modes are supported | string: `vertical` 丨 `horizontal` 丨 `inline` | `vertical` |
| `[nzSelectable]` | allow selecting menu items | boolean | true |
| `[nzTheme]` | color theme of the menu | string: `light` `dark` | `light` |
| `(nzClick)` | the Output when click nz-menu-item inside nz-menu | `EventEmitter<NzMenuItemDirective>` | |

### [nz-menu-item]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[nzDisabled]` | whether menu item is disabled or not | boolean | false |
| `[nzSelected]` | whether menu item is selected or not | boolean | false |

### [nz-submenu]

use `title` to mark the title of submenu

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[nzOpen]` | whether sub menu is open or not, double binding | boolean | false |
| `[nzDisabled]` | whether sub menu is disabled or not | boolean | false |
| `(nzOpenChange)` | nzOpen callback | `EventEmitter<boolean>` | |

### [nz-menu-group]

use `title` to mark the title of menu group

### [nz-menu-divider]

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu.
