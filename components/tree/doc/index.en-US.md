---
category: Components
type: Data Display
title: Tree
---

## When To Use

Almost anything can be represented in a tree structure. Examples include directories, organization hierarchies, biological classifications, countries, etc. The `Tree` component is a way of representing the hierarchical relationship between these things. You can also  expand, collapse, and select a treeNode within a `Tree`.

## API

### nz-tree

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[ngModel]` | Tree data (Reference NzTreeNode) | NzTreeNode\[] | \[] |
| `[nzCheckable]` | Adds a Checkbox before the treeNodes| boolean | false |
| `[nzShowExpand]` | Show a Expand Icon before the treeNodes | boolean | true |
| `[nzShowLine]` | Shows a connecting line | boolean | false |
| `[nzAsyncData]` | Load data asynchronously (should be used with NzTreeNode.addChildren(...)) | boolean | false |
| `[nzDraggable]` | Specifies whether this Tree is draggable (IE > 8) | boolean | false |
| `[nzMultiple]` | Allows selecting multiple treeNodes | boolean | false |
| `[nzCheckStrictly]` | Check treeNode precisely; parent treeNode and children treeNodes are not associated | boolean | false |
| `[nzDefaultExpandAll]` | Whether to expand all treeNodes by default | boolean | false |
| `[nzDefaultExpandedKeys]` | Specify the keys of the default expanded treeNodes | string\[] | \[] |
| `[nzDefaultCheckedKeys]` | Specifies the keys of the default checked treeNodes | string\[] | \[] |
| `[nzDefaultSelectedKeys]` | Specifies the keys of the default selected treeNodes(set nzMultiple to be true) | string\[] | \[] |
| `[nzSearchValue]` | Filter (highlight) treeNodes (see demo `Searchable`) | string | null |
| `[nzBeforeDrop]` | Drop before the second check, allowing the user to decide whether to allow placement | `(confirm: NzFormatBeforeDropEvent) => Observable<boolean>` | - |
| `(nzClick)` | Callback function for when the user clicks a treeNode | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzDblClick)` | Callback function for when the user double clicks a treeNode | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzContextMenu)` | Callback function for when the user right clicks a treeNode | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzCheckBoxChange)` | Callback function for when user clicks the Checkbox | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzExpandChange)` | Callback function for when a treeNode is expanded or collapsed |EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnSearchNode)` | Callback function for when filter treeNodes(used with nzSearchValue) | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragStart)` | Callback function for when the onDragStart event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragEnter)` | Callback function for when the onDragEnter event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragOver)` | Callback function for when the onDragOver event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragLeave)` | Callback function for when the onDragLeave event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDrop)` | Callback function for when the onDrop event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragEnd)` | Callback function for when the onDragEnd event occurs | EventEmitter<NzFormatEmitEvent\> | - |

#### Methods

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| getCheckedNodeList | get checked nodes(merged) | NzTreeNode[] | [] |
| getSelectedNodeList | get selected nodes | NzTreeNode[] | [] |

#### NzTreeNodeOptions props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | string | '---' |
| key | Used with nzDefaultExpandedKeys / nzDefaultCheckedKeys / nzDefaultSelectedKeys. P.S.: It must be unique in all of treeNodes of the tree！| string | null |
| children | treeNode's children | array<NzTreeNodeOptions\> | \[] |
| isLeaf | Determines if this is a leaf node(can not be dropped to) | boolean | false |
| checked | Set the treeNode be checked | boolean | false |
| selected | Set the treeNode be selected | boolean | false |
| expanded | Set the treeNode be expanded () | boolean | false |
| selectable | Set whether the treeNode can be selected	 | boolean | true |
| disabled | Disables the treeNode | boolean | false |
| disableCheckbox | Disables the checkbox of the treeNode | boolean | false |

#### NzFormatEmitEvent props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| eventName | Event Name | enum: `click` `dblclick` `contextmenu` `check` `expand` `search` & `dragstart` `dragenter` `dragover` `dragleave` `drop` `dragend` | '' |
| node | The current operation node (such as the target node to drop while dragging) | NzTreeNode | null |
| event | MouseEvent or DragEvent | enum: `MouseEvent` `DragEvent` | null |
| dragNode? | Current drag node (existing when dragged) | NzTreeNode | null |
| selectedKeys? | Selected node list (exist when clicked) | array<NzTreeNode\> | [] |
| checkedKeys? | Checked node list (exist when click checkbox) | array<NzTreeNode\> | [] |
| flatCheckedKeys? | Flatten the Checked nodes list (exist when click checkbox) | array<NzTreeNode\> | [] |
| matchededKeys? | matched nodes while searching | array<NzTreeNode\> | [] |

#### NzFormatBeforeDropEvent props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dragNode | Current drag node (existing when dragged) | NzTreeNode | - |
| node | The current operation node (such as the target node to drop while dragging) | NzTreeNode | - |
| pos | position to drop(-1: before the target node, 0: inside the target node, 1: behind the target node) | number | - |

#### NzTreeNode props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | string | NzTreeNodeOptions.title |
| key | Key | string | NzTreeNodeOptions.key |
| level | TreeNode's level relative to the root node | number | number |
| children | Children | array<NzTreeNode\> | array<NzTreeNode\> |
| origin | treeNode's raw data of NzTreeNodeOptions(user provided to show more datas) | NzTreeNodeOptions | - |
| getParentNode | Get parentNode | function | `NzTreeNode` / `null` |
| isLeaf | Whether treeNode is a Leaf Node | boolean |  `true` / `false` |
| isExpanded | Whether treeNode is expanded | boolean | `true` / `false` |
| isDisabled | Whether treeNode is disabled | boolean | `true` / `false` |
| isDisableCheckbox | Whether treeNode's checkbox can not be clicked | boolean | `true` / `false` |
| isSelectable | Set whether the treeNode can be selected | boolean | `true` 或 `false` |
| isChecked | Whether treeNode is checked | boolean | `true` / `false` |
| isAllChecked | Whether all treeNode's children are checked | boolean | `true` / `false` |
| isHalfChecked | Part of treeNode's children are checked  | boolean | `true` / `false` |
| isSelected | Whether treeNode is selected | boolean | `true` / `false` |
| isLoading | Whether treeNode is loading(when nzAsyncData is true) | boolean | `true` / `false` |
| isMatched | Whether treeNode's title contains nzSearchValue | boolean | `true` / `false` |
| getChildren | Get all children | function | NzTreeNode[] |
| addChildren | Add child nodes, receive NzTreeNode or NzTreeNodeOptions array, the second parameter is the inserted index position | (children: array, index?: number )=>{} | void |
| clearChildren | clear the treeNode's children | function | void |

## Note
`NzTreeNodeOptions` accepts your customized properties，use NzTreeNode.origin to get them.
