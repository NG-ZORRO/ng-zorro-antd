---
category: Components
type: Data Display
title: Hierarchy Graph
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO experiments are features that are released but not yet considered stable or production ready</p>
<p>Developers and users can opt-in into these features before they are fully released. But <strong>breaking changes</strong> may occur with any release.</p>
</blockquote>

## When To Use

When you want to use graph in Angular.

### Import Module

> Now, the graph depends on d3-drag d3-zoom d3-selection d3-transition d3-shape (may be removed in next major version)

```ts
import { NzGraphModule } from 'ng-zorro-antd/graph';
```

### Import Style

```less
@import "node_modules/ng-zorro-antd/graph/style/entry.less";
```

## API

Dependencies:

```sh
npm install @nx-component/hierarchy-graph && npm install d3-* @types/d3
```

### nz-graph
| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzGraphData]` | Data source | `NzGraphData(data: NzGraphDataDef?)` | `` |
| `[nzRankDirection]` | Graph Direction | `TB` \| `BT` \| `LR` \| `RL` | `LR` |
| `[nzAutoFit]` | Whether to automatically adjust the height of the node, the default equal height | `boolean` | `false` |


#### Methods

| Method | Description |
| --- | --- |
| `autoFit()` | Move graph to center |

#### NzGraphData

| Method | Description | Type |
| --- | --- | --- |
| `setData` | set data source | `(data: NzGraphDataDef) => void` |
| `toggle` | toggle group node | `(nodeName: string) => void` |
| `expand` | expand group node | `(nodeName: string) => void` |
| `expandAll` | expand all group nodes | `(nodeName: string) => void` |
| `collapse` | collapse group node | `(nodeName: string) => void` |
| `isExpand` | get if expanded of node | `(nodeName: string) => boolean` |
| `expansionModel` | model of expanded nodes' info | `SelectionModel<string>` |


#### NzGraphDataDef

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `nodes` | nodes | `Array<{ id: number\|string; label?: string; width?: number; height?: number; [key: string]: any; }>` | `[]` |
| `edges` | edges | `Array<{ v: number\|string; w: number\|string; [key: string]: any; }>` | `[]` |
| `compound` | group | `{ [parent: string]: string[]; }` | `null` |

#### NzGraphNode

| Parameter | Description | Type |
| --- | --- | --- |
| `id` | id | `number\|string` |
| `label?` | node content | `string` |
| `name` | node name | `number\|string` |
| `type` | node type(group: 0, node: 1) | `number` |
| `parentNodeName` | parentNode name | `string` |
| `coreBox` | coreBox | `{ width: number;  height: number; }` |
| `x` | x-offset | `number` |
| `y` | y-offset | `number` |
| `width` | width | `number` |
| `height` | height | `number` |
| `[key: string]`| user inputs | `any` |


#### NzGraphEdge

| Parameter | Description | Type |
| --- | --- |
| `id` | id | `string` |
| `v` | source node | `number\|string` |
| `w` | target node | `number\|string` |
| `label?` | edge content | `string` |
| `points` | points | `Array<{ x: number; y: number; }>` |
| `adjoiningEdge` | adjoiningEdge | `{ v: string; w: string; points: points>; } \| null` |

#### NzGraphGroupNode

| Parameter | Type |
| --- | --- |
| `expanded` | `boolean` |
| `nodes` | `Array<NzGraphNode\|NzGraphGroupNode>` |
| `edges` | `NzGraphEdge[]` |

### nzGraphNode
Customize the graph node template

```html
<nz-graph [nzGraphData]="data">
  <ng-container *nzGraphNode="let node">
    <span>{{ node.name }} - {{ node.label }}</span>
  </ng-container>
</nz-graph>
```

## More
- [@nx-component/hierarchy-graph](https://www.npmjs.com/package/@nx-component/hierarchy-graph): Auto-layout graph library
- [SelectionModel](https://github.com/angular/components/blob/master/src/cdk/collections/selection-model.ts)