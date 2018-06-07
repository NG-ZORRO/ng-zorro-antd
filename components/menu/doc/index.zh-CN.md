---
category: Components
cols: 1
type: Navigation
title: Menu
subtitle: 导航菜单
---

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

更多布局和导航的使用可以参考：[通用布局](/components/layout/zh)。

## API

```html
<ul nz-menu>
  <li nz-menu-item>菜单项</li>
  <li nz-submenu>
    <span title>子菜单</span>
    <ul>
      <li nz-menu-item>子菜单项</li>
    </ul>
  </li>
</ul>
```

### [nz-menu]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzInlineCollapsed]` | inline 时菜单是否收起状态 | boolean | - |
| `[nzInlineIndent]` | inline 模式的菜单缩进宽度 | number | 24 |
| `[nzMode]` | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | string: `vertical` `horizontal` `inline` | `vertical` |
| `[nzSelectable]` | 是否允许选中 | boolean | true |
| `[nzTheme]` | 主题颜色 | string: `light` `dark` | `light` |
| `(nzClick)` | 点击 nz-menu-item 输出属性 | `EventEmitter<NzMenuItemDirective>` | |

### [nz-menu-item]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzDisabled]` | 是否禁用 | boolean | false |
| `[nzSelected]` | 是否被选中 | boolean | false |

### [nz-submenu]

使用 `title` 标识符来标定子菜单标题部分

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzOpen]` | 是否展开，可双向绑定 | boolean | false |
| `[nzDisabled]` | 是否禁用 | boolean | false |
| `(nzOpenChange)` | 展开回调 | `EventEmitter<boolean>` |  |


### [nz-menu-group]

使用 `title` 标识符来标定标题部分


### [nz-menu-divider]

菜单项分割线，只用在弹出菜单内。
