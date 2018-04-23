---
category: Components
type: Data Display
title: Tree
subtitle: 树形控件
---

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ngModel | 元数据,NzTreeNode数组,单个节点原始结构参考NzTreeNodeOptions | array | \[] |
| nzCheckable | 节点前添加 Checkbox 复选框 | boolean | false |
| nzShowExpand | 节点前添加展开图标 | boolean | true |
| nzShowLine | 是否展示连接线 | boolean | false |
| nzAsyncData | 是否异步加载(显示加载状态) | boolean | false |
| nzDraggable | 设置节点可拖拽（IE>8） | boolean | false |
| nzMultiple | 支持点选多个节点（节点本身） | boolean | false |
| nzCheckStrictly | checkable状态下节点选择完全受控（父子节点选中状态不再关联） | boolean | false |
| nzDefaultExpandAll | 默认展开所有树节点 | boolean | false |
| nzDefaultExpandedKeys | 默认展开指定的树节点 | string\[] | \[] |
| nzDefaultCheckedKeys | 默认选中复选框的树节点 | string\[] | \[] |
| nzDefaultSelectedKeys | 默认选中的树节点(nzMultiple为true) | string\[] | \[] |
| nzSearchValue | 按需筛选树高亮节点(结合搜索控件) | string | null |
| nzBeforeDrop | drop前二次校验,允许用户自行决定是否允许放置 | `(confirm: NzFormatBeforeDropEvent) => Observable<boolean>` | - |
| nzClick | 点击树节点触发 | EventEmitter<NzFormatEmitEvent\> | - |
| nzDblClick | 双击树节点触发 | EventEmitter<NzFormatEmitEvent\> | - |
| nzContextMenu | 右键树节点触发 | EventEmitter<NzFormatEmitEvent\> | - |
| nzCheckBoxChange | 点击树节点 Checkbox 触发 | EventEmitter<NzFormatEmitEvent\> | - |
| nzExpandChange | 点击展开树节点图标触发 |EventEmitter<NzFormatEmitEvent\> | - |
| nzOnSearchNode | 搜索节点时调用(与nzSearchValue配合使用) | EventEmitter<NzFormatEmitEvent\> | - |
| nzOnDragStart | 开始拖拽时调用 | EventEmitter<NzFormatEmitEvent\> | - |
| nzOnDragEnter | dragenter 触发时调用 | EventEmitter<NzFormatEmitEvent\> | - |
| nzOnDragOver | dragover 触发时调用 | EventEmitter<NzFormatEmitEvent\> | - |
| nzOnDragLeave | dragleave 触发时调用 | EventEmitter<NzFormatEmitEvent\> | - |
| nzOnDrop | drop 触发时调用 | EventEmitter<NzFormatEmitEvent\> | - |
| nzOnDragEnd | dragend 触发时调用 | EventEmitter<NzFormatEmitEvent\> | - |
| getCheckedNodeList | 获取组件 checkBox 被点击选中的节点 | NzTreeNode[] | [] |
| getSelectedNodeList | 获取组件被选中的节点 | NzTreeNode[] | [] |

### NzTreeNodeOptions props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | '---' |
| key | 整个树范围内的所有节点的 key 值不能重复且不为空！ | string | null |
| children | 子节点 | array<NzTreeNodeOptions\> | \[] |
| isLeaf | 设置为叶子节点(叶子节点不可被拖拽模式放置) | boolean | false |
| checked | 设置节点 Checkbox 是否选中 | boolean | false |
| selected | 设置节点本身是否选中 | boolean | false |
| expanded | 设置节点是否展开(叶子节点无效) | boolean | false |
| selectable | 设置节点是否可被选中 | boolean | true |
| disabled | 设置是否禁用节点(不可进行任何操作) | boolean | false |
| disableCheckbox | 设置节点禁用 Checkbox | boolean | false |

### NzFormatEmitEvent props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| eventName | 事件名 | enum: `click` `dblclick` `contextmenu` `check` `expand` `search` & `dragstart` `dragenter` `dragover` `dragleave` `drop` `dragend` | '' |
| node | 当前操作节点(拖拽时表示目标节点) | NzTreeNode | null |
| event | 原生事件 | enum: `MouseEvent` `DragEvent` | null |
| dragNode? | 当前拖拽节点(拖拽时存在) | NzTreeNode | null |
| selectedKeys? | 已选中的节点(单击时存在) | array<NzTreeNode\> | [] |
| checkedKeys? | checkBox 已选中的节点(点击 checkBox 存在) | array<NzTreeNode\> | [] |
| matchededKeys? | 搜索时匹配到的节点 | array<NzTreeNode\> | [] |

### NzFormatBeforeDropEvent props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dragNode | 当前拖拽节点(拖拽时存在) | NzTreeNode | - |
| node | 当前操作节点(拖拽时表示目标节点) | NzTreeNode | - |
| pos | 放置位置(-1:目标节点前面, 0: 目标节点内部, 1: 目标节点后面) | number | - |

### NzTreeNode props

| 方法 | 说明 | 类型 | 返回值类型 |
| --- | --- | --- | --- |
| title | 标题 | string | NzTreeNodeOptions.title |
| key | key值 | string | NzTreeNodeOptions.key |
| level | 层级(最顶层为0,子节点逐层加1) | number | number |
| children | 子节点 | array<NzTreeNode\> | array<NzTreeNode\> |
| origin | 原始节点树结构(用户提供,用于展示额外信息) | NzTreeNodeOptions | - |
| getParentNode | 获取父节点 | function | `NzTreeNode` 或 `null` |
| isLeaf | 是否为叶子节点 | boolean |  `true` 或 `false` |
| isExpanded | 是否已展开 | boolean | `true` 或 `false` |
| isDisabled | 是否禁用 | boolean | `true` 或 `false` |
| isDisableCheckbox | 是否禁用 checkBox | boolean | `true` 或 `false` |
| isSelectable | 是否可选中 | boolean | `true` 或 `false` |
| isChecked | 是否选中 checkBox | boolean | `true` 或 `false` |
| isAllChecked | 子节点是否全选 | boolean | `true` 或 `false` |
| isHalfChecked | 子节点有选中但未全选 | boolean | `true` 或 `false` |
| isSelected | 是否已选中 | boolean | `true` 或 `false` |
| isLoading | 是否异步加载状态(影响展开图标展示) | boolean | `true` 或 `false` |
| isMatched | title是否包含nzSearchValue(搜索使用) | boolean | `true` 或 `false` |
| getChildren | 获取子节点,返回NzTreeNode数组 | function | NzTreeNode[] |
| addChildren | 添加子节点,接收NzTreeNode或NzTreeNodeOptions数组,第二个参数为插入的索引位置 | (children: array, index?: number )=>{} | void |
| clearChildren | 清除子节点 | function | void |

## 注意
