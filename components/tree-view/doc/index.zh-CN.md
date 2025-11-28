---
category: Components
type: 数据展示
title: TreeView
subtitle: 树视图
tag: 更新
cover: 'https://gw.alipayobjects.com/zos/alicdn/Xh-oWqg9k/Tree.svg'
description: 树视图组件，相比封装好的 Tree 组件具有更高的定制度和更好的性能。
---

## 何时使用

更基础的 Tree 组件，允许在模版中定义每个组成部分，并手动管理状态。

> ⚠️ `nzTreeControl` 在 `v21.0.0` 中被移除，请使用 `nzLevelAccessor` 或 `nzChildrenAccessor` 替代。二者必须存在其一，否则无法正确构建视图。

## API

### nz-tree-view

| 参数                   | 说明                                                                                                       | 类型                                                                                                               | 默认值                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `[nzDataSource]`       | 用于渲染树的数组数据                                                                                       | `DataSource<T> \| Observable<T[]> \| T[]`, [DataSource](https://material.angular.io/cdk/tree/overview#data-source) | -                                   |
| `[nzLevelAccessor]`    | 树层级访问方法（[levelAccessor](https://material.angular.io/cdk/tree/api#CdkTree)），结合扁平数据使用      | `(dataNode: T) => number`                                                                                          | -                                   |
| `[nzChildrenAccessor]` | 树子节点访问方法（[childrenAccessor](https://material.angular.io/cdk/tree/api#CdkTree)），结合嵌套数据使用 | `(dataNode: T) => T[]`                                                                                             | -                                   |
| `[nzTrackBy]`          | 用于检查数据变化的差异，使用方式类似于 ngFor 的 trackBy 函数                                               | `TrackByFunction`                                                                                                  | `(_index, dataNode: T) => dataNode` |
| `[nzDirectoryTree]`    | 节点是否以文件夹样式显示                                                                                   | `boolean`                                                                                                          | `false`                             |
| `[nzBlockNode]`        | 节点是否占据整行                                                                                           | `boolean`                                                                                                          | `false`                             |

### nz-tree-virtual-scroll-view

虚拟滚动的树视图，可以通过组件实例上的 `virtualScrollViewport` 成员访问 [CdkVirtualScrollViewport](https://material.angular.io/cdk/scrolling/api#CdkVirtualScrollViewport) 实例。

| 参数                   | 说明                                                                                                       | 类型                                                                                                               | 默认值                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `[nzDataSource]`       | 用于渲染树的数组数据                                                                                       | `DataSource<T> \| Observable<T[]> \| T[]`, [DataSource](https://material.angular.io/cdk/tree/overview#data-source) | -                                   |
| `[nzLevelAccessor]`    | 树层级访问方法（[levelAccessor](https://material.angular.io/cdk/tree/api#CdkTree)），结合扁平数据使用      | `(dataNode: T) => number`                                                                                          | -                                   |
| `[nzChildrenAccessor]` | 树子节点访问方法（[childrenAccessor](https://material.angular.io/cdk/tree/api#CdkTree)），结合嵌套数据使用 | `(dataNode: T) => T[]`                                                                                             | -                                   |
| `[nzTrackBy]`          | 用于检查数据变化的差异，使用方式类似于 ngFor 的 trackBy 函数                                               | `TrackByFunction`                                                                                                  | `(_index, dataNode: T) => dataNode` |
| `[nzDirectoryTree]`    | 节点是否以文件夹样式显示                                                                                   | `boolean`                                                                                                          | `false`                             |
| `[nzBlockNode]`        | 节点是否占据整行                                                                                           | `boolean`                                                                                                          | `false`                             |
| `[nzItemSize]`         | 节点的尺寸(px)                                                                                             | `number`                                                                                                           | `28`                                |
| `[nzMinBufferPx]`      | 超出渲染区的最小缓存区大小(px)                                                                             | `number`                                                                                                           | `28 * 5`                            |
| `[nzMaxBufferPx]`      | 需要渲染新节点时的缓冲区大小(px)                                                                           | `number`                                                                                                           | `28 * 10`                           |

### [nzTreeNodeDef]

用于定义 `nz-tree-node` 的指令。

| 参数                  | 说明                                                                                                                   | 类型                                      | 默认值 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------ |
| `[nzTreeNodeDefWhen]` | 用于定义是否使用此节点的方法，优先匹配第一个返回 `true` 的节点。如果没有返回 `true` 的节点，则匹配未定义此方法的节点。 | `(index: number, nodeData: T) => boolean` | -      |

### nz-tree-node

树节点容器组件，需要通过 `nzTreeNodeDef` 指令定义。

| 参数             | 说明                                                                                                                                            | 类型      | 默认值  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `[nzExpandable]` | [节点是否可展开](https://material.angular.io/cdk/tree/api#CdkTreeNode)，使用 `nzLevelAccessor` 或 `nzChildrenAccessor` 时需要明确指定该参数值。 | `boolean` | `false` |

### [nzTreeNodePadding]

以添加 `padding` 的方式显示节点缩进 **性能最好**。

```html
<nz-tree-node nzTreeNodePadding></nz-tree-node>
```

### nzTreeNodeIndentLine

以添加缩进线的方式显示节点缩进。

```html
<nz-tree-node nzTreeNodeIndentLine></nz-tree-node>
```

### nz-tree-node-toggle

切换部分，用于节点的展开/收起。

| 参数                          | 说明                | 类型      | 默认值  |
| ----------------------------- | ------------------- | --------- | ------- |
| `[nzTreeNodeToggleRecursive]` | 是否为递归展开/收起 | `boolean` | `false` |

### nz-tree-node-toggle[nzTreeNodeNoopToggle]

不做任何操作的切换部分，可用于占位或者显示图标。

### [nzTreeNodeToggleRotateIcon]

定义切换部分中的图标，会随着展开收起状态自动旋转。

### [nzTreeNodeToggleActiveIcon]

定义切换部分中的图标，使其具有激活状态的样式，可用于 loading 图标。

### nz-tree-node-option

定义节点中的可选择部分。

| 参数           | 说明         | 类型                       | 默认值  |
| -------------- | ------------ | -------------------------- | ------- |
| `[nzSelected]` | 是否选中     | `boolean`                  | `false` |
| `[nzDisabled]` | 是否禁用     | `boolean`                  | `false` |
| `(nzClick)`    | 点击时的事件 | `EventEmitter<MouseEvent>` | -       |

### nz-tree-node-checkbox

定义节点中的可勾选的部分。

| 参数                | 说明         | 类型                       | 默认值  |
| ------------------- | ------------ | -------------------------- | ------- |
| `[nzChecked]`       | 是否勾选     | `boolean`                  | `false` |
| `[nzIndeterminate]` | 是否为半选   | `boolean`                  | `false` |
| `[nzDisabled] `     | 是否禁用     | `boolean`                  | `false` |
| `(nzClick)`         | 点击时的事件 | `EventEmitter<MouseEvent>` | -       |

## Classes

### NzTreeViewFlatDataSource extends DataSource

用于扁平数据的 `dataSource`，能够自动响应视图、数据变化，结合 `nzLevelAccessor` 使用。

**构造参数**

| 名称                                   | 说明                                               |
| -------------------------------------- | -------------------------------------------------- |
| `tree: NzTreeView<T, F>`               | Tree View 组件实例                                 |
| `treeFlattener: NzTreeFlattener<T, F>` | 用于将嵌套节点 `<T>` 转化为扁平节点 `<F>` 的展平器 |
| `initialData: T[] = []`                | 初始数据 `<T>`                                     |

**方法**

| 名称                                                           | 说明                                              |
| -------------------------------------------------------------- | ------------------------------------------------- |
| `connect(collectionViewer: CollectionViewer): Observable<F[]>` | TreeView 组件中调用，发射 flattenData 给 TreeView |
| `disconnect(): void`                                           | TreeView 组件销毁时调用                           |
| `setData(value: T[]): void`                                    | 设置初始数据 `<T>`                                |
| `getData(): T[]`                                               | 获取初始数据 `<T>`                                |
| `setFlattenedData(nodes: F[]): void`                           | 设置扁平数据 `<F>`                                |
| `getFlattenData(): F[]`                                        | 获取扁平数据 `<F>`                                |

### NzTreeViewNestedDataSource extends DataSource

用于嵌套数据的 `dataSource`，能够自动响应视图、数据变化，结合 `nzChidrenAccessor` 使用。

**构造参数**

| 名称                    | 说明               |
| ----------------------- | ------------------ |
| `tree: NzTreeView<T>`   | Tree View 组件实例 |
| `initialData: T[] = []` | 初始数据 `<T>`     |

**方法**

| 名称                                                           | 说明                                       |
| -------------------------------------------------------------- | ------------------------------------------ |
| `connect(collectionViewer: CollectionViewer): Observable<T[]>` | TreeView 组件中调用，发射 data 给 TreeView |
| `disconnect(): void`                                           | TreeView 组件销毁时调用                    |
| `setData(value: T[]): void`                                    | 设置初始数据 `<T>`                         |
| `getData(): T[]`                                               | 获取初始数据 `<T>`                         |

### NzTreeFlattener

将具有子节点的嵌套数据转换为具有级别（level）信息的转换器类。

**构造参数**

| 名称                                                                    | 说明                                        |
| ----------------------------------------------------------------------- | ------------------------------------------- |
| `transformFunction: (node: T, level: number) => F`                      | 接收一个嵌套节点 `<T>`，返回扁平节点 `<F>`  |
| `getLevel: (node: F) => number`                                         | 定义从扁平节点数据中获取 `level` 属性的方法 |
| `isExpandable: (node: F) => boolean`                                    | 定义是否为可展开节点的方法                  |
| `getChildren: (node: T) => Observable<T[]> \| T[] \| undefined \| null` | 定义从嵌套数据 `<T>` 中获取子节点的方法     |

**方法**

| 名称                                     | 说明                                   |
| ---------------------------------------- | -------------------------------------- |
| `flattenNodes(structuredData: T[]): F[]` | 接收嵌套数据 `<T>`，返回扁平数据 `<F>` |

## utils

Tree View 中常用的工具类。提供获取当前树节点的父亲、兄弟、子孙节点等方法，包含两套方法以分别用于**扁平**和**嵌套**数据结构。

**扁平数据**

| 名称                                                                                                   | 说明                                                           |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `getParent: (nodes: F[], node: F, getLevel: (dataNode: F) => number): F \| null`                       | 返回当前节点的父节点                                           |
| `getDescendants: (nodes: F[], node: F, getLevel: (dataNode: F) => number): F[]`                        | 返回当前节点的所有子孙节点                                     |
| `getNextSibling: (nodes: F[], node: F, getLevel: (dataNode: F) => number, _index?: number): F \| null` | 返回当前节点的下一个兄弟节点（或 `_index` 后的第一个兄弟节点） |

**嵌套数据**

| 名称                                                                                               | 说明                                             |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `getParentForNestedData: (nodes: T[], node: T, getChildren: (dataNode: T) => T[]): T \| null`      | 返回当前节点的父节点                             |
| `getDescendantsForNestedData: (node: T, getChildren: (dataNode: T) => T[]): T[]`                   | 返回当前节点的所有子孙节点                       |
| `getNextSiblingForNestedData: (nodes: T[], node: T, getChildren: (dataNode: T) => T[]): T \| null` | 返回当前节点的下一个兄弟节点                     |
| `flattenNestedNodes: (nodes: T[], getChildren: (dataNode: T) => T[]): T[]`                         | 铺平嵌套数据，返回扁平数组，但不会改变节点属性。 |
