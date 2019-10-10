---
category: Components
type: Data Display
title: Tree
---

## When To Use

Almost anything can be represented in a tree structure. Examples include directories, organization hierarchies, biological classifications, countries, etc. The `Tree` component is a way of representing the hierarchical relationship between these things. You can also  expand, collapse, and select a treeNode within a `Tree`.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzTreeModule } from 'ng-zorro-antd/tree';
```

## API

### nz-tree

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzData]` | Tree data (Reference NzTreeNode) | `NzTreeNodeOptions[] \| NzTreeNode[]` | `[]` |
| `[nzBlockNode]` | Whether treeNode fill remaining horizontal space | `boolean` | `false` | ✅ |
| `[nzCheckable]` | Adds a Checkbox before the treeNodes| `boolean` | `false` |
| `[nzShowExpand]` | Show a Expand Icon before the treeNodes | `boolean` | `true` | |
| `[nzShowLine]` | Shows a connecting line | `boolean` | `false` | |
| `[nzExpandedIcon]` | Customize an expand icon | `TemplateRef<{ $implicit: NzTreeNode }>` | - |
| `[nzShowIcon]` | Shows the icon before a TreeNode's title. There is no default style | `boolean` | `false` | ✅ |
| `[nzAsyncData]` | Load data asynchronously (should be used with NzTreeNode.addChildren(...)) | `boolean` | `false` |
| `[nzDraggable]` | Specifies whether this Tree is draggable (IE > 8) | `boolean` | `false` |
| `[nzMultiple]` | Allows selecting multiple treeNodes | `boolean` | `false` |
| `[nzHideUnMatched]` | Hide unmatched nodes while searching | `boolean` | `false` | ✅ |
| `[nzCheckStrictly]` | Check treeNode precisely; parent treeNode and children treeNodes are not associated | `boolean` | `false` |
| `[nzTreeTemplate]` | Custom Nodes | `TemplateRef<{ $implicit: NzTreeNode }>` | - |
| `[nzExpandAll]` | Whether to expand all treeNodes | `boolean` | `false` |
| `[nzExpandedKeys]` | Specify the keys of the default expanded treeNodes | `string[]` | `[]` |
| `[nzCheckedKeys]` | Specifies the keys of the default checked treeNodes | `string[]` | `[]` |
| `[nzSelectedKeys]` | Specifies the keys of the default selected treeNodes | `string[]` | `[]` |
| `[nzSearchValue]` | Filter (highlight) treeNodes (see demo `Searchable`), two-way binding | `string` | `null` |
| `[nzBeforeDrop]` | Drop before the second check, allowing the user to decide whether to allow placement | `(confirm: NzFormatBeforeDropEvent) => Observable<boolean>` | - |
| `(nzClick)` | Callback function for when the user clicks a treeNode | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzDblClick)` | Callback function for when the user double clicks a treeNode | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzContextMenu)` | Callback function for when the user right clicks a treeNode | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzCheckBoxChange)` | Callback function for when user clicks the Checkbox | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzExpandChange)` | Callback function for when a treeNode is expanded or collapsed |`EventEmitter<NzFormatEmitEvent>` | - |
| `(nzSearchValueChange)` | Callback function for when filter treeNodes(used with nzSearchValue) | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzOnDragStart)` | Callback function for when the onDragStart event occurs | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzOnDragEnter)` | Callback function for when the onDragEnter event occurs | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzOnDragOver)` | Callback function for when the onDragOver event occurs | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzOnDragLeave)` | Callback function for when the onDragLeave event occurs | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzOnDrop)` | Callback function for when the onDrop event occurs | `EventEmitter<NzFormatEmitEvent>` | - |
| `(nzOnDragEnd)` | Callback function for when the onDragEnd event occurs | `EventEmitter<NzFormatEmitEvent>` | - |

#### Methods

| Property | Description | Type |
| -------- | ----------- | ---- |
| getTreeNodes | get all nodes(NzTreeNode) | `NzTreeNode[]` |
| getTreeNodeByKey | get NzTreeNode with key | `NzTreeNode` |
| getCheckedNodeList | get checked nodes(merged) | `NzTreeNode[]` |
| getSelectedNodeList | get selected nodes | `NzTreeNode[]` |
| getHalfCheckedNodeList | get half checked nodes | `NzTreeNode[]` |
| getExpandedNodeList | get expanded nodes | `NzTreeNode[]` |
| getMatchedNodeList | get matched nodes(if nzSearchValue is not null) | `NzTreeNode[]` |

#### NzTreeNodeOptions props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | `'---'` |
| key | Must be unique！| `string` | `null` |
| icon | icon before the treeNode，used with `nzShowIcon` | `string` | `null` |
| children | TreeNode's children | `NzTreeNodeOptions[]` | `[]` |
| isLeaf | Determines if this is a leaf node(can not be dropped to) | `boolean` | `false` |
| checked | Set the treeNode be checked | `boolean` | `false` |
| selected | Set the treeNode be selected | `boolean` | `false` |
| expanded | Set the treeNode be expanded () | `boolean` | `false` |
| selectable | Set whether the treeNode can be selected	 | `boolean` | `true` |
| disabled | Disables the treeNode | `boolean` | `false` |
| disableCheckbox | Disables the checkbox of the treeNode | `boolean` | `false` |
| [key: string] | Indexable Types, can be used with NzTreeNode.origin | `any ` | - |

#### NzFormatEmitEvent props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| eventName | Event Name | enum: `click` `dblclick` `contextmenu` `check` `expand` `search` & `dragstart` `dragenter` `dragover` `dragleave` `drop` `dragend` | - |
| node | The current operation node (such as the target node to drop while dragging) | `NzTreeNode` | `null` |
| event | MouseEvent or DragEvent | `'MouseEvent' \| 'DragEvent'` | `null` |
| dragNode? | Current drag node (existing if dragged) | `NzTreeNode` | `null` |
| selectedKeys? | Selected nodes list | `NzTreeNode[]` | `[]` |
| checkedKeys? | Checked nodes list | `NzTreeNode[]` | `[]` |
| matchedKeys? | Matched keys list while searching | `NzTreeNode[]` | `[]` |
| keys? | All nodes's keys list related event(except drag events) | `string[]` | `[]` |
| nodes? | All nodes related event(except drag events) | `NzTreeNode[]` | `[]` |

#### NzFormatBeforeDropEvent props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dragNode | Current drag node (existing when dragged) | `NzTreeNode` | - |
| node | The current operation node (such as the target node to drop while dragging) | `NzTreeNode` | - |
| pos | position to drop(-1: before the target node, 0: inside the target node, 1: behind the target node) | `number` | - |

#### NzTreeNode props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | NzTreeNodeOptions.title |
| key | Key | `string` | NzTreeNodeOptions.key |
| level | TreeNode's level relative to the root node | `number` | `number` |
| children | Children | NzTreeNode[] | `[]` |
| origin | treeNode's raw data of NzTreeNodeOptions(user provided to show more datas) | NzTreeNodeOptions | - |
| getParentNode | Get parentNode | function | `null` |
| isLeaf | Whether treeNode is a Leaf Node | `boolean` | `false` |
| isExpanded | Whether treeNode is expanded | `boolean` | `false` |
| isDisabled | Whether treeNode is disabled | `boolean` | `false` |
| isDisableCheckbox | Whether treeNode's checkbox can not be clicked | `boolean` | `false` |
| isSelectable | Set whether the treeNode can be selected | `boolean` | `true` |
| isChecked | Whether treeNode is checked | `boolean` | `false` |
| isHalfChecked | Part of treeNode's children are checked  | `boolean` | `false` |
| isSelected | Whether treeNode is selected | `boolean` | `false` |
| isLoading | Whether treeNode is loading(when nzAsyncData is true) | `boolean` | `false` |
| isMatched | Whether treeNode's title contains nzSearchValue | `boolean` | `false` |
| setSyncChecked | set isChecked value and sync other nodes' state of checkBox | function | - |
| getChildren | Get all children | function | - |
| addChildren | Add child nodes, receive NzTreeNode or NzTreeNodeOptions array, the second parameter is the inserted index position | (children: array, index?: number )=>{} | - |
| clearChildren | Clear the treeNode's children | function | - |
| remove | Clear current node(not root node) | function | - |

## Note
* `NzTreeNodeOptions` accepts your customized properties，use NzTreeNode.origin to get them.
* If Tree Methods used with ViewChild, should be used in ngAfterViewInit.
* Setting NzData with NzTreeNodeOptions[] is better，if you set nzData with NzTreeNode[], it will be deprecated in next major version(8.x).
