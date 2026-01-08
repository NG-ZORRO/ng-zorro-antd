---
category: Components
type: Data Display
title: TreeView
tag: updated
cover: 'https://gw.alipayobjects.com/zos/alicdn/Xh-oWqg9k/Tree.svg'
description: Tree view component with better performance and customizability.
---

## When To Use

More basic Tree component, allowing each of its parts to be defined in the template, and state to be managed manually.

> ⚠️ `nzTreeControl` has been removed in `v21.0.0`. Please use either `nzLevelAccessor` or `nzChildrenAccessor` instead, one of them must exist.

## API

### nz-tree-view

| Property               | Description                                                                                                                       | Type                                                                                                               | Default                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `[nzDataSource]`       | The data array to render                                                                                                          | `DataSource<T> \| Observable<T[]> \| T[]`, [DataSource](https://material.angular.io/cdk/tree/overview#data-source) | -                                   |
| `[nzLevelAccessor]`    | The level accessor of tree node ([levelAccessor](https://material.angular.io/cdk/tree/api#CdkTree)), used with flat data.         | `(dataNode: T) => number`                                                                                          | -                                   |
| `[nzChildrenAccessor]` | The children accessor of tree node ([childrenAccessor](https://material.angular.io/cdk/tree/api#CdkTree)), used with nested data. | `(dataNode: T) => T[]`                                                                                             | -                                   |
| `[nzTrackBy]`          | Tracking function that will be used to check the differences in data changes. Used similarly to ngFor trackBy function.           | `TrackByFunction`                                                                                                  | `(_index, dataNode: T) => dataNode` |
| `[nzDirectoryTree]`    | Whether nodes are displayed as directory style                                                                                    | `boolean`                                                                                                          | `false`                             |
| `[nzBlockNode]`        | Whether tree nodes fill remaining horizontal space                                                                                | `boolean`                                                                                                          | `false`                             |

### nz-tree-virtual-scroll-view

The virtual scroll tree view, which can be accessed from
the [CdkVirtualScrollViewport](https://material.angular.io/cdk/scrolling/api#CdkVirtualScrollViewport) instance through
the `virtualScrollViewport` member of the component instance.

| Property               | Description                                                                                                                       | Type                                                                                                               | Default                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `[nzDataSource]`       | The data array to render                                                                                                          | `DataSource<T> \| Observable<T[]> \| T[]`, [DataSource](https://material.angular.io/cdk/tree/overview#data-source) | -                                   |
| `[nzLevelAccessor]`    | The level accessor of tree node ([levelAccessor](https://material.angular.io/cdk/tree/api#CdkTree)), used with flat data.         | `(dataNode: T) => number`                                                                                          | -                                   |
| `[nzChildrenAccessor]` | The children accessor of tree node ([childrenAccessor](https://material.angular.io/cdk/tree/api#CdkTree)), used with nested data. | `(dataNode: T) => T[]`                                                                                             | -                                   |
| `[nzTrackBy]`          | Tracking function that will be used to check the differences in data changes. Used similarly to ngFor trackBy function.           | `TrackByFunction`                                                                                                  | `(_index, dataNode: T) => dataNode` |
| `[nzDirectoryTree]`    | Whether nodes are displayed as directory style                                                                                    | `boolean`                                                                                                          | `false`                             |
| `[nzBlockNode]`        | Whether tree nodes fill remaining horizontal space                                                                                | `boolean`                                                                                                          | `false`                             |
| `[nzItemSize]`         | The size of nodes in the tree (in pixels)                                                                                         | `number`                                                                                                           | `28`                                |
| `[nzMinBufferPx]`      | The minimum amount of buffer rendered allowed outside the viewport (in pixels)                                                    | `number`                                                                                                           | `28 * 5`                            |
| `[nzMaxBufferPx]`      | The amount of buffer required for rendering new nodes (in pixels)                                                                 | `number`                                                                                                           | `28 * 10`                           |

### [nzTreeNodeDef]

Directive to define `nz-tree-node`.

| Property              | Description                                                                                                                                                                                                                                                                 | Type                                      | Default |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------- |
| `[nzTreeNodeDefWhen]` | A matching function which indicates whether inputted node should be used. It matches the very first node that makes this function return `true`. If no nodes that makes this function return `true`, the node which does not define this function would be matched instead. | `(index: number, nodeData: T) => boolean` | -       |

### nz-tree-node

The tree node container component, which needs to be defined by the `nzTreeNodeDef` directive.

| Property         | Description                                                                                                                                                                                | Type      | Default |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- |
| `[nzExpandable]` | [Whether or not this tree node is expandable](https://material.angular.io/cdk/tree/api#CdkTreeNode). Please set this parameter value when using `nzLevelAccessor` or `nzChildrenAccessor`. | `boolean` | `false` |

### [nzTreeNodePadding]

Show node indentation by adding `padding` **Best Performance**.

```html
<nz-tree-node nzTreeNodePadding></nz-tree-node>
```

### nzTreeNodeIndentLine

Show node indentation by adding indent lines.

```html
<nz-tree-node nzTreeNodeIndentLine></nz-tree-node>
```

### nz-tree-node-toggle

A toggle which is used to expand / collapse the node.

| Property                      | Description                         | Type      | Default |
| ----------------------------- | ----------------------------------- | --------- | ------- |
| `[nzTreeNodeToggleRecursive]` | Is it recursively expand / collapse | `boolean` | `false` |

### nz-tree-node-toggle[nzTreeNodeNoopToggle]

A toggle that does no actions. This can be used for placeholders or displays icons.

### [nzTreeNodeToggleRotateIcon]

Define an icon in the toggle, which it will automatically rotate depending on the collapse/expand state.

### [nzTreeNodeToggleActiveIcon]

Define an icon in the toggle for an active style, which it can be used for the loading state.

### nz-tree-node-option

Define the selectable feature of a node.

| Property       | Description                     | Type                       | Default |
| -------------- | ------------------------------- | -------------------------- | ------- |
| `[nzSelected]` | Whether the option is selected. | `boolean`                  | `false` |
| `[nzDisabled]` | Whether the option is disabled. | `boolean`                  | `false` |
| `(nzClick)`    | Event on click.                 | `EventEmitter<MouseEvent>` | -       |

### nz-tree-node-checkbox

Define the checkbox feature of a node.

| Property            | Description                            | Type                       | Default |
| ------------------- | -------------------------------------- | -------------------------- | ------- |
| `[nzChecked]`       | Whether the checkbox is checked.       | `boolean`                  | `false` |
| `[nzDisabled]`      | Whether the checkbox is disabled.      | `boolean`                  | `false` |
| `[nzIndeterminate]` | Whether the checkbox is indeterminate. | `boolean`                  | `false` |
| `(nzClick)`         | Event on click.                        | `EventEmitter<MouseEvent>` | -       |

## Classes

### NzTreeViewFlatDataSource extends DataSource

The `dataSource` for flat data that automatically responds to view and data changes, used with `nzLevelAccessor`.

**Construction Parameters**

| Name                                   | Description                                                          |
| -------------------------------------- | -------------------------------------------------------------------- |
| `tree: NzTreeView<T, F>`               | Tree View component instance.                                        |
| `treeFlattener: NzTreeFlattener<T, F>` | Flattener for convert nested nodes `<T>` into flattened nodes `<F>`. |
| `initialData: T[] = []`                | Initialized data `<T>`.                                              |

**Methods**

| Name                                                           | Description                                                        |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| `connect(collectionViewer: CollectionViewer): Observable<F[]>` | Called in the TreeView component, emit flattenData to the TreeView |
| `disconnect(): void`                                           | Call when TreeView component is destroyed.                         |
| `setData(value: T[]): void`                                    | Set the origin data `<T>`.                                         |
| `getData(): T[]`                                               | Get the origin data `<T>`.                                         |
| `setFlattenedData(nodes: F[]): void`                           | Set the flattened data `<F>`.                                      |
| `getFlattenData(): F[]`                                        | Get the flattened data `<F>`.                                      |

### NzTreeViewNestedDataSource extends DataSource

The `dataSource` for nested data that automatically responds to view and data changes, used with `nzChildrenAccessor`.

**Construction Parameters**

| Name                    | Description                   |
| ----------------------- | ----------------------------- |
| `tree: NzTreeView<T>`   | Tree View component instance. |
| `initialData: T[] = []` | Initialized data `<T>`.       |

**Methods**

| Name                                                           | Description                                                 |
| -------------------------------------------------------------- | ----------------------------------------------------------- |
| `connect(collectionViewer: CollectionViewer): Observable<T[]>` | Called in the TreeView component, emit data to the TreeView |
| `disconnect(): void`                                           | Call when TreeView component is destroyed.                  |
| `setData(value: T[]): void`                                    | Set the origin data `<T>`                                   |
| `getData(): T[]`                                               | Get the origin data `<T>`                                   |

### NzTreeFlattener

Convert nested data with child nodes into node data with level information.

**Construction Parameters**

| Name                                                                    | Description                                                    |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `transformFunction: (node: T, level: number) => F`                      | Receive a nested node `<T>` and return a flattened node `<F>`. |
| `getLevel: (node: F) => number`                                         | Define the method to get the `level` property.                 |
| `isExpandable: (node: F) => boolean`                                    | Methods for defining whether a node is expandable.             |
| `getChildren: (node: T) => Observable<T[]> \| T[] \| undefined \| null` | Define methods to get children nodes from nested node `<T>`.   |

**Methods**

| Name                                     | Description                                                |
| ---------------------------------------- | ---------------------------------------------------------- |
| `flattenNodes(structuredData: T[]): F[]` | Receive nested data `<T>` and return flattened data `<F>`. |

## utils

Common utility classes in the Tree View component. Provides methods for getting the father, brother, and descendant nodes of the current tree node, including two sets of methods for **flat** and **nested** data structures respectively.

**Flat Data**

| Name                                                                                                   | Description                                                                                    |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `getParent: (nodes: F[], node: F, getLevel: (dataNode: F) => number): F \| null`                       | Return parent of the node.                                                                     |
| `getDescendants: (nodes: F[], node: F, getLevel: (dataNode: F) => number): F[]`                        | Return descendants of the node.                                                                |
| `getNextSibling: (nodes: F[], node: F, getLevel: (dataNode: F) => number, _index?: number): F \| null` | Return the next sibling of the node, or the first sibling of the node after `_index` position. |

**Nested Data**

| Name                                                                                               | Description                                                                                  |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `getParentForNestedData: (nodes: T[], node: T, getChildren: (dataNode: T) => T[]): T \| null`      | Return parent of the node.                                                                   |
| `getDescendantsForNestedData: (node: T, getChildren: (dataNode: T) => T[]): T[]`                   | Return descendants of the node.                                                              |
| `getNextSiblingForNestedData: (nodes: T[], node: T, getChildren: (dataNode: T) => T[]): T \| null` | Return the next sibling of the node.                                                         |
| `flattenNestedNodes: (nodes: T[], getChildren: (dataNode: T) => T[]): T[]`                         | Flatten nested data and returns flat arrays, but does not change the nested node properties. |
