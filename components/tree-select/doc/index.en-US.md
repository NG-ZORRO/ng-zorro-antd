---
category: Components
type: Data Entry
title: TreeSelect
---

Tree selection control.

## When To Use

`TreeSelect` is similar to `Select`, but the values are provided in a tree like structure.
Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

## Import this Component Individually

You can get more detail [here](/docs/getting-started/en#import-a-component-individually).

```ts
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
```

## API

### nz-tree-select

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzAllowClear]` | Whether allow clear | `boolean` | `false` |
| `[nzPlaceHolder]` | Placeholder of the select input | `string` | - |
| `[nzDisabled]` | Disabled or not | `boolean` | `false` |
| `[nzShowIcon]` | Shows the icon before a TreeNode's title. There is no default style | `boolean` | `false` |
| `[nzShowSearch]` | Whether to display a search input in the dropdown menu(valid only in the single mode) | `boolean` | `false` | ✅ |
| `[nzNotFoundContent]` | Specify content to show when no result matches. | `string` | - |
| `[nzDropdownMatchSelectWidth]` | Determine whether the dropdown menu and the select input are the same width | `boolean` | `true` | ✅ |
| `[nzDropdownStyle]` | To set the style of the dropdown menu | `object` | - |
| `[nzMultiple]` | Support multiple or not, will be `true` when enable `nzCheckable`. | `boolean` | `false` |
| `[nzHideUnMatched]` | Hide unmatched nodes while searching | `boolean` | `false` | ✅ |
| `[nzSize]` | To set the size of the select input | `'large' \| 'small' \| 'default'` | `'default'` | ✅ |
| `[nzCheckable]` | Whether to show checkbox on the treeNodes | `boolean` | `false` |
| `[nzCheckStrictly]` | Check treeNode precisely; parent treeNode and children treeNodes are not associated | `boolean` | `false` |
| `[nzShowExpand]` | Show a Expand Icon before the treeNodes | `boolean` | `true` | |
| `[nzShowLine]` | Shows a connecting line | `boolean` | `false` | |
| `[nzAsyncData]` | Load data asynchronously (should be used with NzTreeNode.addChildren(...)) | `boolean` | `false` |
| `[nzNodes]` | Data of the treeNodes | `NzTreeNodeOptions[]` | `[]` |
| `[nzDefaultExpandAll]` | Whether to expand all treeNodes by default | `boolean` | `false` |
| `[nzExpandedKeys]` | Default expanded treeNodes | `string[]` | - |
| `[nzDisplayWith]` | How to display the selected node value in the trigger | `(node: NzTreeNode) => string` | `(node: NzTreeNode) => node.title` |
| `[nzMaxTagCount]` | Max tag count to show| number | - |
| `[nzMaxTagPlaceholder]` | Placeholder for not showing tags | TemplateRef<{ $implicit: NzTreeNode[] }> | - |
| `[nzTreeTemplate]` | Custom Nodes | `TemplateRef<{ $implicit: NzTreeNode }>` | - |
| `(nzExpandChange)` | Callback function for when a treeNode is expanded or collapsed |`EventEmitter<NzFormatEmitEvent>` | - |

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
