---
category: Components
type: 数据展示
title: Tree
subtitle: 树形控件
cover: 'https://gw.alipayobjects.com/zos/alicdn/Xh-oWqg9k/Tree.svg'
description: 多层次的结构列表。
---

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## API

### nz-tree

> 说明: 根据目前的数据结构设计，需要保证优先设置 `nzData`，否则各属性不会生效。异步操作待数据返回后，重新赋值其他各属性触发渲染(`nzExpandAll` `nzExpandedKeys` `nzCheckedKeys` `nzSelectedKeys` `nzSearchValue`)。重构优化工作请追踪 [#5152](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5152)。

| 参数                     | 说明                                                                                                                 | 类型                                                        | 默认值  | 全局配置 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------- | -------- |
| `[nzData]`               | 元数据                                                                                                               | `NzTreeNodeOptions[] \| NzTreeNode[]`                       | `[]`    |
| `[nzBlockNode]`          | 是否节点占据一行                                                                                                     | `boolean`                                                   | `false` | ✅       |
| `[nzCheckable]`          | 节点前添加 checkbox 复选框                                                                                           | `boolean`                                                   | `false` |
| `[nzShowExpand]`         | 节点前添加展开图标                                                                                                   | `boolean`                                                   | `true`  |          |
| `[nzShowLine]`           | 是否展示连接线                                                                                                       | `boolean`                                                   | `false` |          |
| `[nzExpandedIcon]`       | 自定义展开图标                                                                                                       | `TemplateRef<{ $implicit: NzTreeNode }>`                    | -       |
| `[nzShowIcon]`           | 是否展示 TreeNode title 前的图标，没有默认样式                                                                       | `boolean`                                                   | `false` | ✅       |
| `[nzAsyncData]`          | 是否异步加载(显示加载状态)                                                                                           | `boolean`                                                   | `false` |
| `[nzDraggable]`          | 设置节点可拖拽                                                                                                       | `boolean`                                                   | `false` |
| `[nzMultiple]`           | 支持点选多个节点（节点本身）                                                                                         | `boolean`                                                   | `false` |
| `[nzHideUnMatched]`      | 搜索隐藏未匹配的节点                                                                                                 | `boolean`                                                   | `false` | ✅       |
| `[nzCheckStrictly]`      | checkable 状态下节点选择完全受控（父子节点选中状态不再关联）                                                         | `boolean`                                                   | `false` |
| `[nzTreeTemplate]`       | 自定义节点                                                                                                           | `TemplateRef<{ $implicit: NzTreeNode }>`                    | -       |
| `[nzExpandAll]`          | 默认展开所有树节点                                                                                                   | `boolean`                                                   | `false` |
| `[nzExpandedKeys]`       | 展开指定的树节点                                                                                                     | `string[]`                                                  | `[]`    |
| `[nzCheckedKeys]`        | 指定选中复选框的树节点                                                                                               | `string[]`                                                  | `[]`    |
| `[nzSelectedKeys]`       | 指定选中的树节点                                                                                                     | `string[]`                                                  | `[]`    |
| `[nzSearchValue]`        | 按需筛选树高亮节点(参考可搜索的树),双向绑定                                                                          | `string`                                                    | `null`  |
| `[nzSearchFunc]`         | 自定义匹配方法，配合 `nzSearchValue` 使用                                                                            | `(node: NzTreeNodeOptions) => boolean`                      | `null`  |
| `[nzBeforeDrop]`         | drop 前二次校验,允许用户自行决定是否允许放置                                                                         | `(confirm: NzFormatBeforeDropEvent) => Observable<boolean>` | -       |
| `[nzVirtualHeight]`      | 虚拟滚动的总高度                                                                                                     | `string`                                                    | `-`     |
| `[nzVirtualItemSize]`    | 虚拟滚动时每一列的高度，与 [cdk itemSize](https://material.angular.io/cdk/scrolling/api) 相同                        | `number`                                                    | `28`    |
| `[nzVirtualMaxBufferPx]` | 缓冲区最大像素高度，与 [cdk maxBufferPx](https://material.angular.io/cdk/scrolling/api) 相同                         | `number`                                                    | `500`   |
| `[nzVirtualMinBufferPx]` | 缓冲区最小像素高度，低于该值时将加载新结构，与 [cdk minBufferPx](https://material.angular.io/cdk/scrolling/api) 相同 | `number`                                                    | `28`    |
| `(nzClick)`              | 点击树节点触发                                                                                                       | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzDblClick)`           | 双击树节点触发                                                                                                       | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzContextMenu)`        | 右键树节点触发                                                                                                       | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzCheckboxChange)`     | 点击树节点 checkbox 触发                                                                                             | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzExpandChange)`       | 点击展开树节点图标触发                                                                                               | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzSearchValueChange)`  | 搜索节点时调用(`nzSearchValue` 配合使用)                                                                             | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzOnDragStart)`        | 开始拖拽时调用                                                                                                       | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzOnDragEnter)`        | dragenter 触发时调用                                                                                                 | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzOnDragOver)`         | dragover 触发时调用                                                                                                  | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzOnDragLeave)`        | dragleave 触发时调用                                                                                                 | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzOnDrop)`             | drop 触发时调用                                                                                                      | `EventEmitter<NzFormatEmitEvent>`                           | -       |
| `(nzOnDragEnd)`          | dragend 触发时调用                                                                                                   | `EventEmitter<NzFormatEmitEvent>`                           | -       |

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

#### NzTreeNodeOptions props

| 参数              | 说明                                              | 类型                  | 默认值  |
| ----------------- | ------------------------------------------------- | --------------------- | ------- |
| `title`           | 标题                                              | `string`              | -       |
| `key`             | 整个树范围内的所有节点的 key 值不能重复且不为空！ | `string`              | -       |
| `icon`            | 节点前的图标，与 `nzShowIcon` 组合使用            | `string`              | -       |
| `children`        | 子节点                                            | `NzTreeNodeOptions[]` | -       |
| `isLeaf`          | 设置为叶子节点(叶子节点不可被拖拽模式放置)        | `boolean`             | `false` |
| `checked`         | 设置节点 checkbox 是否选中                        | `boolean`             | `false` |
| `selected`        | 设置节点本身是否选中                              | `boolean`             | `false` |
| `expanded`        | 设置节点是否展开(叶子节点无效)                    | `boolean`             | `false` |
| `selectable`      | 设置节点是否可被选中                              | `boolean`             | `true`  |
| `disabled`        | 设置是否禁用节点(不可进行任何操作)                | `boolean`             | `false` |
| `disableCheckbox` | 设置节点禁用 checkbox                             | `boolean`             | `false` |
| `[key: string]`   | 自定义数据,可通过 NzTreeNode 的 origin 字段获取   | `any `                | -       |

#### NzFormatEmitEvent props

| 属性            | 说明                                          | 类型                                                                                                                                                                | 默认值 |
| --------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `eventName`     | 事件名                                        | enum: `'click' \| 'dblclick' \| 'contextmenu' \| 'check' \| 'expand' \| 'search' \| 'dragstart' \| 'dragenter' \| 'dragover' \| 'dragleave' \| 'drop' \| 'dragend'` | -      |
| `node`          | 当前操作节点(拖拽时表示目标节点)              | `NzTreeNode`                                                                                                                                                        | `null` |
| `event`         | 原生事件                                      | `'MouseEvent' \| 'DragEvent'`                                                                                                                                       | `null` |
| `dragNode?`     | 当前拖拽节点(拖拽时存在)                      | `NzTreeNode`                                                                                                                                                        | `null` |
| `selectedKeys?` | 已选中的节点 key(单击时存在)                  | `NzTreeNode[]`                                                                                                                                                      | `[]`   |
| `checkedKeys?`  | checkbox 已选中的节点 key(点击 checkbox 存在) | `NzTreeNode[]`                                                                                                                                                      | `[]`   |
| `matchedKeys?`  | 搜索时匹配到的节点 key                        | `NzTreeNode[]`                                                                                                                                                      | `[]`   |
| `keys?`         | 非拖拽事件相关的全部节点的 key 数组           | `string[]`                                                                                                                                                          | `[]`   |
| `nodes?`        | 非拖拽事件相关的全部节点                      | `NzTreeNode[]`                                                                                                                                                      | `[]`   |

#### NzFormatBeforeDropEvent props

| 属性     | 说明                                                        | 类型         | 默认值 |
| -------- | ----------------------------------------------------------- | ------------ | ------ |
| dragNode | 当前拖拽节点(拖拽时存在)                                    | `NzTreeNode` | -      |
| node     | 当前操作节点(拖拽时表示目标节点)                            | `NzTreeNode` | -      |
| pos      | 放置位置(-1:目标节点前面, 0: 目标节点内部, 1: 目标节点后面) | `number`     | -      |

#### NzTreeNode props

| 属性                | 说明                                                                                          | 类型                                     | 默认值                    |
| ------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------- |
| `title`             | 标题                                                                                          | `string`                                 | `NzTreeNodeOptions.title` |
| `key`               | key 值                                                                                        | `string`                                 | `NzTreeNodeOptions.key`   |
| `level`             | 层级(最顶层为 0，子节点逐层加 1)                                                              | `number`                                 | `number`                  |
| `children`          | 子节点                                                                                        | `NzTreeNode[]`                           | `[]`                      |
| `origin`            | 原始节点树结构(用户提供,用于展示额外信息)                                                     | `NzTreeNodeOptions`                      | -                         |
| `getParentNode`     | 获取父节点                                                                                    | `function`                               | `null`                    |
| `isLeaf`            | 是否为叶子节点                                                                                | `boolean`                                | `false`                   |
| `isExpanded`        | 是否已展开                                                                                    | `boolean`                                | `false`                   |
| `isDisabled`        | 是否禁用                                                                                      | `boolean`                                | `false`                   |
| `isDisableCheckbox` | 是否禁用 checkbox                                                                             | `boolean`                                | `false`                   |
| `isSelectable`      | 是否可选中                                                                                    | `boolean`                                | `true`                    |
| `isChecked`         | 是否选中 checkbox                                                                             | `boolean`                                | `false`                   |
| `isHalfChecked`     | 子节点有选中但未全选                                                                          | `boolean`                                | `false`                   |
| `isSelected`        | 是否已选中                                                                                    | `boolean`                                | `false`                   |
| `isLoading`         | 是否异步加载状态(影响展开图标展示)                                                            | `boolean`                                | `false`                   |
| `isMatched`         | title 是否包含 nzSearchValue(搜索使用)                                                        | `boolean`                                | `false`                   |
| `setSyncChecked`    | 设置 checked 状态并同步其他节点状态                                                           | `function`                               | -                         |
| `getChildren`       | 获取子节点,返回 NzTreeNode 数组                                                               | `function`                               | -                         |
| `addChildren`       | 添加子节点,接收 NzTreeNode 或 NzTreeNodeOptions 数组,第二个参数为插入的索引位置，默认插入末尾 | `(children: array, index?: number )=>{}` | -                         |
| `clearChildren`     | 清除子节点                                                                                    | `function`                               | -                         |
| `remove`            | 清除当前节点(非根节点)                                                                        | `function`                               | -                         |

## 注意

- 当前请确保 `nzData` 在其他数据相关的属性之前被初始化:

```typescript
// 示例
this.nzExpandAll = false;
const nodes = []; // 源数据
this.nzData = [...nodes];
// nzData 值异步获取变化后重新渲染一下属性
this.nzExpandedKeys = [...this.nzExpandedKeys];
// this.nzExpandAll = true;
this.nzCheckedKeys = [...this.nzCheckedKeys];
this.nzSelectedKeys = [...this.nzSelectedKeys];
```

- `NzTreeNodeOptions` 可以接受用户自定义属性，可通过 `NzTreeNode.origin` 属性取得。
- 使用 ViewChild 时，Tree 方法需要在 ngAfterViewInit 中调用。
- `nzData` 属性请传递 NzTreeNodeOptions 数组。
