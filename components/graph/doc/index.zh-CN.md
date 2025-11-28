---
category: Components
subtitle: 流程图
type: 数据展示
title: Graph
cols: 1
experimental: true
description: 渲染流程图。
---

## 何时使用

需要在网页上渲染 GRAPH 图时使用。

> 目前组件依赖 d3-drag d3-zoom d3-selection d3-transition d3-shape 用于绘制相关属性（可能会在之后的版本中逐步替换）

### 引入样式

```less
@import 'node_modules/ng-zorro-antd/graph/style/entry.less';
```

## API

安装依赖：

```sh
npm install dagre-compound dagre d3-transition d3-zoom d3-selection d3-shape d3-drag @types/d3
```

### nz-graph

| 参数                    | 说明                                 | 类型                                 | 默认值  |
| ----------------------- | ------------------------------------ | ------------------------------------ | ------- |
| `[nzGraphData]`         | 数据源                               | `NzGraphData(data: NzGraphDataDef?)` | ``      |
| `[nzRankDirection]`     | 图方向                               | `TB` \| `BT` \| `LR` \| `RL`         | `LR`    |
| `[nzAutoSize]`          | 是否根据节点内容自适应高度(默认等高) | `boolean`                            | `false` |
| `[nzGraphLayoutConfig]` | 全局配置                             | `NzGraphLayoutConfig`                | ``      |

#### 组件方法

| 名称          | 描述                                                       |
| ------------- | ---------------------------------------------------------- |
| `fitCenter()` | 居中图并自适应缩放（如使用缩放功能请使用 `nz-graph-zoom`） |

### [nz-graph-zoom]

| 参数                 | 说明               | 类型                                         | 默认值 |
| -------------------- | ------------------ | -------------------------------------------- | ------ |
| `[(nzZoom)]`         | 缩放比例           | `number`                                     | `1`    |
| `[nzMinZoom]`        | 最小缩放           | `number`                                     | `0.1`  |
| `[nzMaxZoom]`        | 最大缩放           | `number`                                     | `10`   |
| `(nzTransformEvent)` | 缩放事件           | `() => NzZoomTransform`                      | ``     |
| `(fitCenter)`        | 居中图并自适应缩放 | `() => void`                                 | `void` |
| `(focus)`            | 居中单个节点       | `(e: SVGGElement, duration: number) => void` | `void` |

#### NzGraphData

| 属性/方法        | 说明                    | 类型                             |
| ---------------- | ----------------------- | -------------------------------- |
| `setData`        | 设置数据源              | `(data: NzGraphDataDef) => void` |
| `toggle`         | 收起/展开 group 节点    | `(nodeName: string) => void`     |
| `expand`         | 展开 group 节点         | `(nodeName: string) => void`     |
| `expandAll`      | 展开全部 group 节点     | `(nodeName: string) => void`     |
| `collapse`       | 收起全部 group 节点     | `(nodeName: string) => void`     |
| `isExpand`       | 获取 group 节点展开状态 | `(nodeName: string) => boolean`  |
| `expansionModel` | 展开节点存储对象        | `SelectionModel<string>`         |

### NzGraphLayoutConfig

| 属性                  | 说明            | 类型                                                                                                             |
| --------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------- |
| `layout`              | 布局参数        | `{ nodeSep: number; rankSep: number; edgeSep: number; }`                                                         |
| `subScene`            | group 节点      | `{ paddingTop: number; paddingBottom: number; paddingLeft: number; paddingRight: number; labelHeight: number; }` |
| `defaultCompoundNode` | group 节点 size | `{ width: number; height: number; maxLabelWidth: number; }`                                                      |
| `defaultNode`         | 默认节点 size   | `{ width: number; height: number; labelOffset: number; maxLabelWidth: number; }`                                 |

#### NzGraphDataDef

| 属性       | 说明 | 类型                                                                                                  | 默认值 |
| ---------- | ---- | ----------------------------------------------------------------------------------------------------- | ------ |
| `nodes`    | 节点 | `Array<{ id: number\|string; label?: string; width?: number; height?: number; [key: string]: any; }>` | `[]`   |
| `edges`    | 线   | `Array<{ v: number\|string; w: number\|string; [key: string]: any; }>`                                | `[]`   |
| `compound` | 分组 | `{ [parent: string]: string[]; }`                                                                     | `null` |

#### NzGraphNode

| 属性             | 说明                     | 类型                                 |
| ---------------- | ------------------------ | ------------------------------------ |
| `id`             | id                       | `number\|string`                     |
| `label?`         | 节点内容                 | `string`                             |
| `name`           | 节点名称                 | `number\|string`                     |
| `type`           | 节点类型(组: 0, 节点: 1) | `number`                             |
| `parentNodeName` | 父节点名称               | `string`                             |
| `coreBox`        | 布局高宽                 | `{ width: number; height: number; }` |
| `xOffset`        | x 偏移                   | `number`                             |
| `yOffset`        | y 偏移                   | `number`                             |
| `width`          | 宽度                     | `number`                             |
| `height`         | 高度                     | `number`                             |
| `[key: string]`  | 用户输入                 | `any`                                |

#### NzGraphEdge

| 属性     | 说明     | 类型                               |
| -------- | -------- | ---------------------------------- |
| `id`     | id       | `string`                           |
| `v`      | 起始节点 | `number\|string`                   |
| `w`      | 目标节点 | `number\|string`                   |
| `label?` | 线内容   | `string`                           |
| `points` | points   | `Array<{ x: number; y: number; }>` |

#### NzGraphGroupNode

| 属性       | 类型                                   |
| ---------- | -------------------------------------- |
| `expanded` | `boolean`                              |
| `nodes`    | `Array<NzGraphNode\|NzGraphGroupNode>` |
| `edges`    | `NzGraphEdge[]`                        |

### [nzGraphNode]

自定义叶子节点渲染模板

```html
<nz-graph [nzGraphData]="data">
  <ng-container *nzGraphNode="let node">
    <span>{{ node.name }} - {{ node.label }}</span>
  </ng-container>
</nz-graph>
```

### [nzGraphGroupNode]

自定义组节点渲染模板

```html
<nz-graph [nzGraphData]="data">
  <ng-container *nzGraphGroupNode="let node">
    <span>{{ node.name }} - {{ node.label }}</span>
  </ng-container>
</nz-graph>
```

### [nzGraphEdge]

自定义边渲染模板

```html
<nz-graph [nzGraphData]="data">
  <ng-container *nzGraphEdge="let edge">
    <svg:g>
      <path></path>
    </svg:g>
  </ng-container>
</nz-graph>
```

### 样式

组件样式包含了必要的属性和简单的样式，你可以通过覆写下列类名自定义样式。

- `.nz-graph` `nz-graph` 组件命名空间
- `.nz-graph-nodes` 节点
  - `.nz-graph-node` 单个节点
  - `.nz-graph-node-expanded` 展开节点
  - `.nz-graph-group-node` 组节点
  - `.nz-graph-base-node` 叶子节点
- `.nz-graph-edges` 连接线
  - `.nz-graph-edge` 单条线
    - `path.nz-graph-edge-line` 线 path 元素
    - `.nz-graph-edge-text` 线文本元素

## 说明

- [dagre-compound](https://www.npmjs.com/package/dagre-compound): 基于 Dagre 的 嵌套布局计算库
- [SelectionModel](https://github.com/angular/components/blob/master/src/cdk/collections/selection-model.ts)
