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
| `[ngModel]` | Tree data(nzData instead) | NzTreeNode[] | \[] |
| `[nzDefaultExpandAll]` | Whether to expand all treeNodes <font color=red>`Deprecated`</font> | boolean | false |
| `[nzDefaultExpandedKeys]` | Specify the keys of the default expanded treeNodes <font color=red>`Deprecated`</font> | string\[] | \[] |
| `[nzDefaultCheckedKeys]` | Specifies the keys of the default checked treeNodes <font color=red>`Deprecated`</font> | string\[] | \[] |
| `[nzDefaultSelectedKeys]` | Specifies the keys of the default selected treeNodes <font color=red>`Deprecated`</font> | string\[] | \[] |
| `[nzData]` | Tree data (Reference NzTreeNode) | NzTreeNode\[] | \[] |
| `[nzCheckable]` | Adds a Checkbox before the treeNodes| boolean | false |
| `[nzShowExpand]` | Show a Expand Icon before the treeNodes | boolean | true |
| `[nzShowLine]` | Shows a connecting line | boolean | false |
| `[nzShowIcon]` | Shows the icon before a TreeNode's title. There is no default style | boolean | false |
| `[nzAsyncData]` | Load data asynchronously (should be used with NzTreeNode.addChildren(...)) | boolean | false |
| `[nzDraggable]` | Specifies whether this Tree is draggable (IE > 8) | boolean | false |
| `[nzMultiple]` | Allows selecting multiple treeNodes | boolean | false |
| `[nzCheckStrictly]` | Check treeNode precisely; parent treeNode and children treeNodes are not associated | boolean | false |
| `[nzExpandAll]` | Whether to expand all treeNodes | boolean | false |
| `[nzExpandedKeys]` | Specify the keys of the default expanded treeNodes, two-way binding | string\[] | \[] |
| `[nzCheckedKeys]` | Specifies the keys of the default checked treeNodes, two-way binding | string\[] | \[] |
| `[nzSelectedKeys]` | Specifies the keys of the default selected treeNodes, two-way binding | string\[] | \[] |
| `[nzSearchValue]` | Filter (highlight) treeNodes (see demo `Searchable`), two-way binding | string | null |
| `[nzBeforeDrop]` | Drop before the second check, allowing the user to decide whether to allow placement | `(confirm: NzFormatBeforeDropEvent) => Observable<boolean>` | - |
| `(nzClick)` | Callback function for when the user clicks a treeNode | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzDblClick)` | Callback function for when the user double clicks a treeNode | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzContextMenu)` | Callback function for when the user right clicks a treeNode | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzCheckBoxChange)` | Callback function for when user clicks the Checkbox | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzExpandChange)` | Callback function for when a treeNode is expanded or collapsed |EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnSearchNode)` | Callback function for when filter treeNodes(used with nzSearchValue)  <font color=red>`Deprecated`</font>| EventEmitter<NzFormatEmitEvent\> | - |
| `(nzSearchValueChange)` | Callback function for when filter treeNodes(used with nzSearchValue) | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragStart)` | Callback function for when the onDragStart event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragEnter)` | Callback function for when the onDragEnter event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragOver)` | Callback function for when the onDragOver event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragLeave)` | Callback function for when the onDragLeave event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDrop)` | Callback function for when the onDrop event occurs | EventEmitter<NzFormatEmitEvent\> | - |
| `(nzOnDragEnd)` | Callback function for when the onDragEnd event occurs | EventEmitter<NzFormatEmitEvent\> | - |

#### Methods

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| getTreeNodes | get all nodes(NzTreeNode) | NzTreeNode[] | [] |
| getCheckedNodeList | get checked nodes(merged) | NzTreeNode[] | [] |
| getSelectedNodeList | get selected nodes | NzTreeNode[] | [] |
| getHalfCheckedNodeList | get half checked nodes | NzTreeNode[] | [] |
| getExpandedNodeList | get expanded nodes | NzTreeNode[] | [] |
| getMatchedNodeList | get matched nodes(if nzSearchValue is not null) | NzTreeNode[] | [] |

#### NzTreeNodeOptions props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | string | '---' |
| key | Must be unique！| string | null |
| children | TreeNode's children | NzTreeNodeOptions[] | \[] |
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
| dragNode? | Current drag node (existing if dragged) | NzTreeNode | null |
| selectedKeys? | Selected nodes list | NzTreeNode[] | [] |
| checkedKeys? | Checked nodes list | NzTreeNode[] | [] |
| matchedKeys? | Matched keys list while searching | NzTreeNode[] | [] |
| keys? | All nodes's keys list related event(except drag events) | string[] | [] |
| nodes? | All nodes related event(except drag events) | NzTreeNode[] | [] |

#### NzFormatBeforeDropEvent props

| Property | Description | Type | Default |
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
| setChecked | set isChecked & isHalfChecked state，params: checked , halfChecked | (checked: boolean, halfChecked: boolean=false)=>{} | void |
| setExpanded | set isExpanded state | (value: boolean)=>{} | void |
| setSelected | set isSelected state | (value: boolean)=>{} | void |

## Note
`NzTreeNodeOptions` accepts your customized properties，use NzTreeNode.origin to get them.
