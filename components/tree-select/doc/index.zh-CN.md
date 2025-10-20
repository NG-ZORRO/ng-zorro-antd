---
category: Components
subtitle: 树选择
type: 数据录入
title: TreeSelect
cover: 'https://gw.alipayobjects.com/zos/alicdn/Ax4DA0njr/TreeSelect.svg'
description: 树型选择控件。
---

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## API

### nz-tree-select

| 参数                           | 说明                                                                                                                 | 类型                                                       | 默认值                             | 全局配置 | 版本   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------- | -------- | ------ |
| `[nzId]`                       | 组件内部 input 的 id 值                                                                                              | `string`                                                   | -                                  |
| `[nzAllowClear]`               | 显示清除按钮                                                                                                         | `boolean`                                                  | `false`                            |
| `[nzPlaceHolder]`              | 选择框默认文字                                                                                                       | `string`                                                   | -                                  |
| `[nzPlacement]`                | 选择框弹出的位置                                                                                                     | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'`                     |
| `[nzDisabled]`                 | 禁用选择器                                                                                                           | `boolean`                                                  | `false`                            |
| `[nzShowIcon]`                 | 是否展示 TreeNode title 前的图标，没有默认样式                                                                       | `boolean`                                                  | `false`                            | ✅       |
| `[nzShowSearch]`               | 显示搜索框                                                                                                           | `boolean`                                                  | `false`                            |
| `[nzNotFoundContent]`          | 当下拉列表为空时显示的内容                                                                                           | `'string' \| 'TemplateRef<void>'`                          | -                                  |
| `[nzDropdownMatchSelectWidth]` | 下拉菜单和选择器同宽                                                                                                 | `boolean`                                                  | `true`                             | ✅       |
| `[nzDropdownStyle]`            | 下拉菜单的样式                                                                                                       | `{ [key: string]: string; }`                               | -                                  |
| `[nzDropdownClassName]`        | 下拉菜单的 className 属性                                                                                            | `string`                                                   | -                                  |
| `[nzMultiple]`                 | 支持多选（当设置 nzCheckable 时自动变为 true）                                                                       | `boolean`                                                  | `false`                            |
| `[nzHideUnMatched]`            | 搜索隐藏未匹配的节点                                                                                                 | `boolean`                                                  | `false`                            | ✅       |
| `[nzSize]`                     | 选择框大小                                                                                                           | `'large' \| 'small' \| 'default'`                          | `'default'`                        | ✅       |
| `[nzStatus]`                   | 设置校验状态                                                                                                         | `'error' \| 'warning'`                                     | -                                  |          |
| `[nzCheckable]`                | 节点前添加 Checkbox 复选框                                                                                           | `boolean`                                                  | `false`                            |
| `[nzCheckStrictly]`            | checkable 状态下节点选择完全受控（父子节点选中状态不再关联）                                                         | `boolean`                                                  | `false`                            |
| `[nzShowExpand]`               | 节点前添加展开图标                                                                                                   | `boolean`                                                  | `true`                             |          |
| `[nzShowLine]`                 | 是否展示连接线                                                                                                       | `boolean`                                                  | `false`                            |          |
| `[nzPrefix]`                   | 自定义的选择框前缀                                                                                                   | `TemplateRef<any> \| string`                               | -                                  |          |
| `[nzSuffixIcon]`               | 自定义的选择框后缀图标                                                                                               | `TemplateRef<any> \| string`                               | -                                  |          |
| `[nzAsyncData]`                | 是否异步加载(显示加载状态)                                                                                           | `boolean`                                                  | `false`                            |
| `[nzNodes]`                    | treeNodes 数据                                                                                                       | `NzTreeNodeOptions[]`                                      | `[]`                               |
| `[nzDefaultExpandAll]`         | 默认展开所有树节点                                                                                                   | `boolean`                                                  | `false`                            |
| `[nzExpandedKeys]`             | 默认展开指定的树节点                                                                                                 | `string[]`                                                 | -                                  |
| `[nzDisplayWith]`              | 如何在输入框显示所选的节点值的方法                                                                                   | `(node: NzTreeNode) => string`                             | `(node: NzTreeNode) => node.title` |
| `[nzMaxTagCount]`              | 最多显示多少个 tag                                                                                                   | `number`                                                   | -                                  |
| `[nzMaxTagPlaceholder]`        | 隐藏 tag 时显示的内容                                                                                                | `TemplateRef<{ $implicit: NzTreeNode[] }>`                 | -                                  |
| `[nzTreeTemplate]`             | 自定义节点                                                                                                           | `TemplateRef<{ $implicit: NzTreeNode }>`                   | -                                  |
| `[nzVariant]`                  | 形态变体                                                                                                             | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'`   | `'outlined'`                       | ✅       | 20.0.0 |
| `[nzVirtualHeight]`            | 虚拟滚动的总高度                                                                                                     | `string`                                                   | `-`                                |
| `[nzVirtualItemSize]`          | 虚拟滚动时每一列的高度，与 [cdk itemSize](https://material.angular.io/cdk/scrolling/api) 相同                        | `number`                                                   | `28`                               |
| `[nzVirtualMaxBufferPx]`       | 缓冲区最大像素高度，与 [cdk maxBufferPx](https://material.angular.io/cdk/scrolling/api) 相同                         | `number`                                                   | `500`                              |
| `[nzVirtualMinBufferPx]`       | 缓冲区最小像素高度，低于该值时将加载新结构，与 [cdk minBufferPx](https://material.angular.io/cdk/scrolling/api) 相同 | `number`                                                   | `28`                               |
| `[nzBackdrop]`                 | 浮层是否应带有背景板                                                                                                 | `boolean`                                                  | `false`                            |
| `(nzExpandChange)`             | 点击展开树节点图标调用                                                                                               | `EventEmitter<NzFormatEmitEvent>`                          | -                                  |

#### 方法

| 方法名                   | 说明                               | 返回值         |
| ------------------------ | ---------------------------------- | -------------- |
| `getTreeNodes`           | 获取组件 NzTreeNode 节点           | `NzTreeNode[]` |
| `getTreeNodeByKey`       | 按 key 获取 NzTreeNode 节点        | `NzTreeNode`   |
| `getCheckedNodeList`     | 获取组件 checkbox 被点击选中的节点 | `NzTreeNode[]` |
| `getSelectedNodeList`    | 获取组件被选中的节点               | `NzTreeNode[]` |
| `getHalfCheckedNodeList` | 获取组件半选状态节点               | `NzTreeNode[]` |
| `getExpandedNodeList`    | 获取组件展开状态节点               | `NzTreeNode[]` |
| `getMatchedNodeList`     | 获取组搜索匹配到的节点             | `NzTreeNode[]` |

## FAQ

### Q：滚动时浮层元素没有跟随滚动位置

默认情况下，浮层元素使用 `body` 作为滚动容器，如果使用了其他滚动容器，在自定义滚动容器元素上添加 [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) 指令。
注意：您需要从 `@angular/cdk/scrolling` 导入 `CdkScrollable` 指令或 `ScrollingModule` 模块。
