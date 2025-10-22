---
category: Components
cols: 1
type: 导航
title: Menu
subtitle: 导航菜单
cover: 'https://gw.alipayobjects.com/zos/alicdn/3XZcjGpvK/Menu.svg'
description: 为页面和功能提供导航的菜单列表。
---

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

更多布局和导航的使用可以参考：[通用布局](/components/layout/zh)。

## API

```html
<ul nz-menu>
  <li nz-menu-item>Menu 1</li>
  <li nz-menu-item>Menu 2</li>
  <li nz-submenu nzTitle="SubMenu Title">
    <ul>
      <li nz-menu-item>SubMenu Item 1</li>
      <li nz-menu-item>SubMenu Item 2</li>
      <li nz-menu-item>SubMenu Item 3</li>
    </ul>
  </li>
</ul>
```

### [nz-menu]

| 参数                  | 说明                                         | 类型                                     | 默认值       |
| --------------------- | -------------------------------------------- | ---------------------------------------- | ------------ |
| `[nzInlineCollapsed]` | `inline` 时菜单是否收起状态                  | `boolean`                                | -            |
| `[nzInlineIndent]`    | `inline` 模式的菜单缩进宽度                  | `number`                                 | `24`         |
| `[nzMode]`            | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| `[nzSelectable]`      | 是否允许选中                                 | `boolean`                                | `true`       |
| `[nzTheme]`           | 主题颜色                                     | `'light' \| 'dark'`                      | `'light'`    |
| `(nzClick)`           | 点击 `nz-menu-item` 输出属性                 | `EventEmitter<NzMenuItemComponent>`      |              |

### [nz-menu-item]

| 参数                   | 说明                                                                                                                         | 类型      | 默认值  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `[nzDisabled]`         | 是否禁用                                                                                                                     | `boolean` | `false` |
| `[nzSelected]`         | 是否被选中                                                                                                                   | `boolean` | `false` |
| `[nzMatchRouter]`      | 是否根据 [routerLink](https://www.angular.cn/api/router/RouterLink) 自动设定 `nzSelected`                                    | `boolean` | `false` |
| `[nzMatchRouterExact]` | 是否路由完整精确匹配, 详见 [routerLinkActiveOptions](https://angular.cn/api/router/RouterLinkActive#routerLinkActiveOptions) | `boolean` | `false` |
| `[nzDanger]`           | 展示错误状态样式                                                                                                             | `boolean` | `false` |

### [nz-submenu]

你可以使用以下三种方式来定义 `nz-submenu` 的标题

```html
<li nz-submenu nzTitle="SubTitle" nzIcon="appstore"></li>

<li nz-submenu>
  <span title>
    <nz-icon nzType="appstore" />
    <span>SubTitle</span>
  </span>
</li>

<li nz-submenu [nzTitle]="titleTpl"></li>
<ng-template #titleTpl>
  <nz-icon nzType="appstore" />
  <span>SubTitle</span>
</ng-template>
```

| 参数                       | 说明                        | 类型                                                                                        | 默认值         |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------------------- | -------------- |
| `[nzPlacement]`            | 菜单弹出位置                | `'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight'` | `'bottomLeft'` |
| `[nzOpen]`                 | 是否展开，可双向绑定        | `boolean`                                                                                   | `false`        |
| `[nzDisabled]`             | 是否禁用                    | `boolean`                                                                                   | `false`        |
| `[nzTitle]`                | 标题内容                    | `string \| TemplateRef<void>`                                                               | -              |
| `[nzIcon]`                 | 标题中 `icon` 类型          | `string`                                                                                    | -              |
| `[nzMenuClassName]`        | 自定义子菜单容器类名        | `string`                                                                                    | -              |
| `[nzTriggerSubMenuAction]` | SubMenu 展开/关闭的触发行为 | `'hover' \| 'click'`                                                                        | `'hover'`      |
| `(nzOpenChange)`           | 展开回调                    | `EventEmitter<boolean>`                                                                     | -              |

### [nz-menu-group]

你可以使用以下三种方式来定义 `nz-menu-group` 的标题

```html
<li nz-menu-group nzTitle="SubTitle" nzIcon="appstore"></li>

<li nz-menu-group>
  < title>
  <nz-icon nzType="appstore" />
  <span>SubTitle</span>
  </span>
</li>

<li nz-menu-group [nzTitle]="titleTpl"></li>
<ng-template #titleTpl>
  <nz-icon nzType="appstore" />
  <span>SubTitle</span>
</ng-template>
```

| 参数        | 说明     | 类型                          | 默认值 |
| ----------- | -------- | ----------------------------- | ------ |
| `[nzTitle]` | 标题内容 | `string \| TemplateRef<void>` | -      |

### [nz-menu-divider]

菜单项分割线，只用在弹出菜单内。
