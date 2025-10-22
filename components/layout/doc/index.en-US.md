---
category: Components
type: Layout
cols: 1
title: Layout
cover: 'https://gw.alipayobjects.com/zos/alicdn/hzEndUVEx/Layout.svg'
description: Handling the overall layout of a page.
---

## Specification

### Size

The first level navigation is inclined left near a logo, and the secondary menu is inclined right.

- Top Navigation (almost systems): the height of the first level navigation `64px`, the second level navigation `48px`.
- Top Navigation(contents page): the height of the first level navigation `80px`, the second level navigation `56px`.
- Calculation formula of a top navigation: `48+8n`.
- Calculation formula of an aside navigation: `200+8n`.

### Interaction rules

- The first level navigation and the last level navigation should be distinguishable by visualization;
- The current item should have the highest priority of visualization;
- When the current navigation item is collapsed, the style of the current navigation item will be applied to its parent level;
- The left side navigation bar has support for both the accordion and expanding styles, you can choose the one that fits your case best.

## Visualization rules

Style of a navigation should conform to its level.

- **Emphasis by colorblock**

  When background color is a deep color, you can use this pattern for the parent level navigation item of current page.

- **The highlight match stick**

  When background color is a light color, you can use this pattern for the current page navigation item, we recommend using it for the last item of the navigation path.

- **Highlighted font**

  From the visualization aspect, highlighted font is stronger than colorblock, this pattern is often used for the parent level of the current item.

- **Enlarge the size of the font**

  `12px`、`14px` is a standard font size of navigations，`14px` is used for the first and the second level of the navigation. You can choose an appropriate font size in terms of the level of your navigation.

## Component Overview

- `nz-layout`: The layout wrapper, in which `nz-header` `nz-sider` `nz-content` `nz-footer` or `nz-layout` itself can be nested, and can be placed in any parent container.
- `nz-header`: The top layout with default style, in which any element can be nested, and must be placed in `nz-layout`.
- `nz-sider`: The sidebar with default style and basic functions, in which any element can be nested, and must be placed in `nz-layout`.
- `nz-content`: The content layout with default style, in which any element can be nested, and must be placed in `nz-layout`.
- `nz-footer`: The bottom layout with default style, in which any element can be nested, and must be placed in `nz-layout`.

> Based on `flex layout`, please pay attention to the [compatibility](http://caniuse.com/#search=flex).

## API

```html
<nz-layout>
  <nz-header>header</nz-header>
  <nz-layout>
    <nz-sider>left sidebar</nz-sider>
    <nz-content>main content</nz-content>
    <nz-sider>right sidebar</nz-sider>
  </nz-layout>
  <nz-footer>footer</nz-footer>
</nz-layout>
```

### nz-sider

The sidebar.

| Property              | Description                                                                       | Type                                            | Default  |
| --------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- | -------- |
| `[nzBreakpoint]`      | breakpoints of the responsive layout                                              | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | -        |
| `[nzCollapsedWidth]`  | width of the collapsed sidebar, by setting to `0` a special `trigger` will appear | `number`                                        | `64`     |
| `[nzCollapsible]`     | whether can be collapsed                                                          | `boolean`                                       | `false`  |
| `[nzCollapsed]`       | the collapsed status can be double binding                                        | `boolean`                                       | `false`  |
| `[nzReverseArrow]`    | reverse direction of arrow, for a sider that expands from the right               | `boolean`                                       | `false`  |
| `[nzTrigger]`         | specify the customized `trigger`, set to `null` to hide the `trigger`             | `string \| TemplateRef<void>`                   | -        |
| `[nzZeroTrigger]`     | specify the customized trigger when `nzCollapsedWidth` setting to `0`             | `TemplateRef<void>`                             | -        |
| `[nzWidth]`           | width of the sidebar                                                              | `number \| string`                              | `200`    |
| `[nzTheme]`           | color theme of the sidebar                                                        | `'light' \| 'dark'`                             | `'dark'` |
| `(nzCollapsedChange)` | the callback function                                                             | `EventEmitter<boolean>`                         | -        |

#### breakpoint width

```js
{
  xs: '575px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
}
```
