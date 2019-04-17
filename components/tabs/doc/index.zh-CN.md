---
category: Components
subtitle: 标签页
type: 数据展示
title: Tabs
cols: 1
---

选项卡切换组件。

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。
- [RadioButton](/components/radio/zh/#components-radio-demo-radiobutton) 可作为更次级的页签来使用。

## API

### nz-tabset

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzSelectedIndex]` | 当前激活 tab 面板的 序列号，可双向绑定 | `number` | - |
| `[nzAnimated]` | 是否使用动画切换 Tabs，在 nzTabPosition=top｜bottom 时有效 | `boolean｜{inkBar:boolean, tabPane:boolean}` | `true`, 当 `type="card"` 时为 `false` |
| `[nzSize]` | 大小，提供 `large` `default` 和 `small` 三种大小 | `'large'｜'small'｜'default'` | `'default'` |
| `[nzTabBarExtraContent]` | tab bar 上额外的元素 | `TemplateRef<void>` | - |
| `[nzTabBarStyle]` | tab bar 的样式对象 | `object` | - |
| `[nzTabPosition]` | 页签位置，可选值有 `top` `right` `bottom` `left` | `'top'｜'right'｜'bottom'｜'left'` | `'top'` |
| `[nzType]` | 页签的基本样式，可选 `line`、`card` 类型 | `'line'｜'card'` | `'line'` |
| `[nzTabBarGutter]` | tabs 之间的间隙 | `number` | - |
| `[nzHideAll]` | 是否隐藏所有tab内容 | `boolean` | `false` |
| `[nzShowPagination]` | 是否超出范围时显示pre和next按钮 | `boolean` | `true` |
| `(nzSelectedIndexChange)` | 当前激活 tab 面板的 序列号变更回调函数 | `EventEmitter<number>` | - |
| `(nzSelectChange)` | 当前激活 tab 面板变更回调函数 | `EventEmitter<{nzSelectedIndex: number,tab: NzTabComponent}>` | - |
| `(nzOnNextClick)` | next 按钮被点击的回调 | `EventEmitter<void>` | - |
| `(nzOnPrevClick)` | prev 按钮被点击的回调 | `EventEmitter<void>` | - |

### nz-tab

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[nzTitle]` | 选项卡头显示文字 | `string｜TemplateRef<void>` | - |
| `[nzForceRender]` | 被隐藏时是否渲染 DOM 结构 | `boolean` | `false` |
| `[nzDisabled]` | 是否禁用 | `boolean` | - |
| `(nzClick)` | title被点击的回调函数 | `EventEmitter<void>` | - |
| `(nzSelect)` | tab被选中的回调函数 | `EventEmitter<void>` | - |
| `(nzDeselect)` | tab被取消选中的回调函数 | `EventEmitter<void>` | - |


### [nz-tab]

与 `ng-template` 一同使用，用于标记需要懒加载的 `tab` 内容，具体用法见示例。