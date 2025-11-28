---
category: Components
subtitle: 标签页
type: 导航
title: Tabs
cols: 1
cover: 'https://gw.alipayobjects.com/zos/antfincdn/lkI2hNEDr2V/Tabs.svg'
description: 选项卡切换组件。
---

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。
- [RadioButton](/components/radio/zh/#components-radio-demo-radiobutton) 可作为更次级的页签来使用。

## API

### nz-tabs

| 参数                         | 说明                                                               | 类型                                                | 默认值                                | 全局配置 |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------- | -------- |
| `[nzSelectedIndex]`          | 当前激活 tab 面板的 序列号，可双向绑定                             | `number`                                            | -                                     |
| `[nzAnimated]`               | 是否使用动画切换 Tabs，在 `nzTabPosition="top" \| "bottom"` 时有效 | `boolean \| {inkBar:boolean, tabPane:boolean}`      | `true`, 当 `type="card"` 时为 `false` | ✅       |
| `[nzSize]`                   | 大小，提供 `large` `default` 和 `small` 三种大小                   | `'large' \| 'small' \| 'default'`                   | `'default'`                           | ✅       |
| `[nzTabBarExtraContent]`     | tab bar 上额外的元素                                               | `TemplateRef<void>`                                 | -                                     |
| `[nzTabBarStyle]`            | tab bar 的样式对象                                                 | `object`                                            | -                                     |
| `[nzTabPosition]`            | 页签位置，可选值有 `top` `right` `bottom` `left`                   | `'top' \| 'right' \| 'bottom' \| 'left'`            | `'top'`                               |          |
| `[nzType]`                   | 页签的基本样式                                                     | `'line' \| 'card' \| 'editable-card'`               | `'line'`                              | ✅       |
| `[nzTabBarGutter]`           | tabs 之间的间隙                                                    | `number`                                            | -                                     | ✅       |
| `[nzHideAll]`                | 是否隐藏所有 tab 内容                                              | `boolean`                                           | `false`                               |
| `[nzLinkRouter]`             | 与 Angular 路由联动                                                | `boolean`                                           | `false`                               |          |
| `[nzLinkExact]`              | 以严格匹配模式确定联动的路由                                       | `boolean`                                           | `true`                                |
| `[nzCanDeactivate]`          | 决定一个 tab 是否可以被切换                                        | `NzTabsCanDeactivateFn`                             | -                                     |
| `[nzCentered]`               | 标签居中展示                                                       | `boolean`                                           | `false`                               |
| `[nzDestroyInactiveTabPane]` | 被隐藏时是否销毁 DOM 结构                                          | `boolean`                                           | `false`                               |
| `(nzSelectedIndexChange)`    | 当前激活 tab 面板的 序列号变更回调函数                             | `EventEmitter<number>`                              | -                                     |
| `(nzSelectChange)`           | 当前激活 tab 面板变更回调函数                                      | `EventEmitter<{index: number,tab: NzTabComponent}>` | -                                     |

### nz-tabs[nzType="editable-card"]

| 参数          | 说明                 | 类型                              | 默认值  | 全局配置 |
| ------------- | -------------------- | --------------------------------- | ------- | -------- |
| `[nzHideAdd]` | 隐藏添加按钮         | `boolean`                         | `false` |
| `[nzAddIcon]` | 添加按钮图标         | `string \| TemplateRef<void>`     | -       |
| `(nzAdd)`     | 点击添加按钮时的事件 | `EventEmitter<>`                  | -       |
| `(nzClose)`   | 点击删除按钮时的事件 | `EventEmitter<{ index: number }>` | -       |

### nz-tab

| 参数              | 说明                      | 类型                                        | 默认值  |
| ----------------- | ------------------------- | ------------------------------------------- | ------- |
| `[nzTitle]`       | 选项卡头显示文字          | `string \| TemplateRef<TabTemplateContext>` | -       |
| `[nzForceRender]` | 被隐藏时是否渲染 DOM 结构 | `boolean`                                   | `false` |
| `[nzDisabled]`    | 是否禁用                  | `boolean`                                   | -       |
| `(nzClick)`       | 单击 title 的回调函数     | `EventEmitter<void>`                        | -       |
| `(nzContextmenu)` | 右键 title 的回调函数     | `EventEmitter<MouseEvent>`                  | -       |
| `(nzSelect)`      | tab 被选中的回调函数      | `EventEmitter<void>`                        | -       |
| `(nzDeselect)`    | tab 被取消选中的回调函数  | `EventEmitter<void>`                        | -       |

### nz-tabs[nzType="editable-card"] > nz-tab

| 参数            | 说明         | 类型                          | 默认值  | 全局配置 |
| --------------- | ------------ | ----------------------------- | ------- | -------- |
| `[nzClosable]`  | 显示删除按钮 | `boolean`                     | `false` |
| `[nzCloseIcon]` | 关闭按钮图标 | `string \| TemplateRef<void>` | -       |

#### `nz-tab[nzTitle]` 的模版引用变量

| 属性      | 说明                                                    | 类型      |
| --------- | ------------------------------------------------------- | --------- |
| `visible` | 表示是否在可见区域, 为 `false` 时将会被渲染到下拉菜单中 | `boolean` |

在 `nz-tab[nzTitle]` 中使用

```html
<nz-tab [nzTitle]="titleTemplate">
  ...
  <ng-template #titleTemplate let-visible="visible">...</ng-template>
</nz-tab>
```

在 `*nzTabLink` 中使用

```html
<nz-tab>
  <a *nzTabLink="let visible = visible" nz-tab-link [routerLink]="['.']">...</a>
</nz-tab>
```

### [nz-tab]

与 `ng-template` 一同使用，用于标记需要懒加载的 `tab` 内容，具体用法见示例。

### ng-template[nzTabLink] > a[nz-tab-link]

路由联动可以让 tab 的切换和路由行为相一致。

```html
<nz-tabs nzLinkRouter>
  <nz-tab>
    <a *nzTabLink nz-tab-link [routerLink]="['.']">Link</a>
    Default.
  </nz-tab>
</nz-tabs>
```

### [nzTabBarExtraContent]

> 注意：`*nzTabBarExtraContent` 比 `nz-tabs[nzTabBarExtraContent]` 具有更高的优先级。

| 参数                     | 说明           | 类型               | 默认值  |
| ------------------------ | -------------- | ------------------ | ------- |
| `[nzTabBarExtraContent]` | 附加内容的位置 | `'start' \| 'end'` | `'end'` |
