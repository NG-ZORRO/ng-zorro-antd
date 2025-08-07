---
category: Components
type: 数据展示
title: TreeView
subtitle: 树视图
cover: 'https://gw.alipayobjects.com/zos/alicdn/Xh-oWqg9k/Tree.svg'
description: 树视图组件，相比封装好的 Tree 组件具有更高的定制度和更好的性能。
---

## 何时使用

更基础的 Tree 组件，允许在模版中定义每个组成部分，并手动管理状态。

## API

### nz-tree-view

| 参数                | 说明                     | 类型                                                                                                               | 默认值  |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------- |
| `[nzTreeControl]`   | 树控制器                 | [TreeControl](https://material.angular.io/cdk/tree/api#TreeControl)                                                | -       |
| `[nzDataSource]`    | 用于渲染树的数组数据     | `DataSource<T> \| Observable<T[]> \| T[]`, [DataSource](https://material.angular.io/cdk/tree/overview#data-source) | -       |
| `[nzDirectoryTree]` | 节点是否以文件夹样式显示 | `boolean`                                                                                                          | `false` |
| `[nzBlockNode]`     | 节点是否占据整行         | `boolean`                                                                                                          | `false` |

### nz-tree-virtual-scroll-view

虚拟滚动的树视图，可以通过组件实例上的 `virtualScrollViewport` 成员访问 [CdkVirtualScrollViewport](https://material.angular.io/cdk/scrolling/api#CdkVirtualScrollViewport) 实例。

| 参数                | 说明                             | 类型                                                                                                               | 默认值    |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------- |
| `[nzTreeControl]`   | 树控制器                         | [TreeControl](https://material.angular.io/cdk/tree/api#TreeControl)                                                | -         |
| `[nzDataSource]`    | 用于渲染树的数组数据             | `DataSource<T> \| Observable<T[]> \| T[]`, [DataSource](https://material.angular.io/cdk/tree/overview#data-source) | -         |
| `[nzDirectoryTree]` | 节点是否以文件夹样式显示         | `boolean`                                                                                                          | `false`   |
| `[nzBlockNode]`     | 节点是否占据整行                 | `boolean`                                                                                                          | `false`   |
| `[nzItemSize]`      | 节点的尺寸(px)                   | `number`                                                                                                           | `28`      |
| `[nzMinBufferPx]`   | 超出渲染区的最小缓存区大小(px)   | `number`                                                                                                           | `28 * 5`  |
| `[nzMaxBufferPx]`   | 需要渲染新节点时的缓冲区大小(px) | `number`                                                                                                           | `28 * 10` |

### [nzTreeNodeDef]

用于定义 `nz-tree-node` 的指令。

| 参数                  | 说明                                                                                                                   | 类型                                      | 默认值 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------ |
| `[nzTreeNodeDefWhen]` | 用于定义是否使用此节点的方法，优先匹配第一个返回 `true` 的节点。如果没有返回 `true` 的节点，则匹配未定义此方法的节点。 | `(index: number, nodeData: T) => boolean` | -      |

### nz-tree-node

树节点容器组件，需要通过 `nzTreeNodeDef` 指令定义。

### [nzTreeNodePadding]

```html
<nz-tree-node nzTreeNodePadding></nz-tree-node>
```

以添加 `padding` 的方式显示节点缩进 **性能最好**。

### nzTreeNodeIndentLine

```html
<nz-tree-node nzTreeNodeIndentLine></nz-tree-node>
```

以添加缩进线的方式显示节点缩进。

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

### NzTreeFlatDataSource extends DataSource

**构造参数**

| 名称                                      | 说明                                           |
| ----------------------------------------- | ---------------------------------------------- |
| `treeControl: FlatTreeControl<F, K>`      | Tree 控制器                                    |
| `treeFlattener: NzTreeFlattener<T, F, K>` | 用于将嵌套节点 `T` 处理为扁平节点 `F` 的展平器 |
| `initialData: T[] = []`                   | 初始化数据                                     |

**方法**

| 名称                                                           | 说明                                    |
| -------------------------------------------------------------- | --------------------------------------- |
| `connect(collectionViewer: CollectionViewer): Observable<F[]>` | TreeView 组件中调用，用于获取数据的更新 |
| `disconnect(): void`                                           | TreeView 组件销毁时调用                 |
| `setData(value: T[]): void`                                    | 设置原始数据                            |
| `getData(): T[]`                                               | 获取原始数据                            |

### NzTreeFlattener

将具有子节点的嵌套数据转换为具有级别（level）信息的转换器类。

**构造参数**

| 名称                                                                    | 说明                             |
| ----------------------------------------------------------------------- | -------------------------------- |
| `transformFunction: (node: T, level: number) => F`                      | 接收一个嵌套节点，返回扁平节点   |
| `getLevel: (node: F) => number`                                         | 定义获取 `level` 属性的方法      |
| `isExpandable: (node: F) => boolean`                                    | 定义是否为可展开节点的方法       |
| `getChildren: (node: T) => Observable<T[]> \| T[] \| undefined \| null` | 定义从嵌套数据中获取子节点的方法 |

**方法**

| 名称                                                                    | 说明                                |
| ----------------------------------------------------------------------- | ----------------------------------- |
| `flattenNodes(structuredData: T[]): F[]`                                | 接收嵌套数据，返回扁平数据          |
| `expandFlattenedNodes(nodes: F[], treeControl: TreeControl<F, K>): F[]` | 按 TreeControl 中的展开状态获取节点 |
