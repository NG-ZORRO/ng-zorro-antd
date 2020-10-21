---
category: Components
subtitle: 下拉菜单
type: 导航
title: Dropdown
cover: https://gw.alipayobjects.com/zos/alicdn/eedWN59yJ/Dropdown.svg
---

向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

```ts
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
```

## API

### [nz-dropdown]

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzDropdownMenu]` | Dropdown 下拉菜单组件 | `NzDropdownMenuComponent` | - |
| `[nzDisabled]` | 菜单是否禁用 | `boolean` | - |
| `[nzPlacement]` | 菜单弹出位置 | `'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight'` | `'bottomLeft'` |
| `[nzTrigger]` | 触发下拉的行为 | `'click' \| 'hover'` | `'hover'` |
| `[nzClickHide]` | 点击后是否隐藏菜单 | `boolean` | `true` |
| `[nzVisible]` | 菜单是否显示，可双向绑定 | `boolean` | - |
| `[nzOverlayClassName]` | 下拉根元素的类名称 | `string` | - |
| `[nzOverlayStyle]` | 下拉根元素的样式 | `object` | - |
| `(nzVisibleChange)` | 菜单显示状态改变时调用，参数为 nzVisible | `EventEmitter<boolean>` | - |

菜单使用 [nz-menu](/components/menu/zh)，还包括菜单项 `[nz-menu-item]`，分割线 `[nz-menu-divider]`。

> nz-dropdown 下的 nz-menu 默认不可选中。如果需要菜单可选中，可以指定 `<ul nz-menu nzSelectable>`.

### nz-dropdown-menu

用于包裹菜单项，可以通过 `nzDropdownMenu` 模板变量导出后传入 `[nz-dropdown]` 和 `NzContextMenuService`。

> 注意：每个 `nz-dropdown-menu` 只能作为一个 `[nz-dropdown]` 的输入项

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

用于右键弹出下拉菜单，具体参见示例

| 方法/属性 | 说明 | 参数 | 返回 |
| --- | --- | --- | --- |
| create | 创建右键菜单 | `($event:MouseEvent \| {x:number, y:number}, menu:NzDropdownMenuComponent)` | - |
| close | 关闭右键菜单 | - | - |
