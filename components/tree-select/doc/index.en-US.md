---
category: Components
type: Data Entry
title: TreeSelect
---

Tree selection control.

## When To Use

`TreeSelect` is similar to `Select`, but the values are provided in a tree like structure.
Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

## API

### nz-tree-select

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzAllowClear]` | Whether allow clear | boolean | false |
| `[nzPlaceHolder]` | Placeholder of the select input | string | - |
| `[nzDisabled]` | Disabled or not | boolean | false |
| `[nzShowSearch]` | Whether to display a search input in the dropdown menu(valid only in the single mode) | boolean | false |
| `[nzDropdownMatchSelectWidth]` | Determine whether the dropdown menu and the select input are the same width | boolean | true |
| `[nzDropdownStyle]` | To set the style of the dropdown menu | object | - |
| `[nzMultiple]` | Support multiple or not, will be `true` when enable `nzCheckable`. | boolean | false |
| `[nzSize]` | To set the size of the select input, options: `large` `small` | string | 'default' |
| `[nzCheckable]` | Whether to show checkbox on the treeNodes | boolean | false |
| `[nzShowExpand]` | Show a Expand Icon before the treeNodes | boolean | true |
| `[nzShowLine]` | Shows a connecting line | boolean | false |
| `[nzAsyncData]` | Load data asynchronously (should be used with NzTreeNode.addChildren(...)) | boolean | false |
| `[nzNodes]` | Data of the treeNodes | NzTreeNode\[] | \[] |
| `[nzDefaultExpandAll]` | Whether to expand all treeNodes by default | boolean | false |
| `[nzDefaultExpandedKeys]` | Default expanded treeNodes | string\[] | - |
| `(nzExpandChange)` | Callback function for when a treeNode is expanded or collapsed |EventEmitter<NzFormatEmitEvent\> | - |
