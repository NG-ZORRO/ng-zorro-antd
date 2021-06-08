---
category: Components
type: Data Display
title: Graph
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
npm install dagre-compound dagre d3-transition d3-zoom d3-selection d3-shape d3-drag @types/d3
```

### svg[nz-svg-container]

Defines an SVG container.

### g[nzZoom]

```typescript
@Directive({
  selector: 'g[nzZoom], svg:g[nzZoom]',
  exportAs: 'NzSvgGZoom',
})
```

Defines a scalable and translatable SVG Graph element that must be in `svg[nz-svg-container]`.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzZoomMaxScale]` | The maximum zoom scale | `number` | `Infinity` |
| `[nzZoomMinScale]` | The minimum zoom scale | `number` | `-Infinity` |
| `(nzBeforeZoomEvents)` | Events before the zoom occurs, the zoom can be prevented by calling `preventDefault`. | `EventEmitter<WheelEvent \| MouseEvent>` | - |

**Instance Methods**

| Method | Description |
| --- | --- |
| `scale(scale: number, duration: number = 0): Promise<void>` | Zoom to specified scale. |
| `fitCenter(duration: number = 0, fitScale: number = 1): Promise<void>` | Zoom to the fit size and center of the svg container. The `fitScale` is based on the scale after fitting. |
| `centerByElement(element: SVGGElement, duration: number = 0): Promise<void>` | Zoom a child node to the center of the svg container, The `element` type is SVGGElement. |
| `fitCenterByElement(element: SVGGElement, fitScale: number = 1, duration: number = 0): Promise<void>` | Zoom a child node to the fit size and center of the svg container. The `fitScale` is based on the scale after fitting, and the `element` type is SVGGElement.   |


### g[nz-graph]
| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `[nzGraphData]` | Data source | `NzGraphData(data: NzGraphDataDef?)` | `` |
| `[nzRankDirection]` | Graph Direction | `TB` \| `BT` \| `LR` \| `RL` | `LR` |
| `[nzAutoSize]` | Whether to automatically adjust the height of the node, the default equal height | `boolean` | `false` |
| `[nzGraphLayoutConfig]` | Global config of graph | `NzGraphLayoutConfig` | `` |

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

### NzGraphLayoutConfig
| Method | Description | Type |
| --- | --- | --- |
| `layout` | graph layout config | `{ nodeSep: number; rankSep: number; edgeSep: number; }` |
| `subScene` | group node config | `{ paddingTop: number; paddingBottom: number; paddingLeft: number; paddingRight: number; labelHeight: number; }` |
| `defaultCompoundNode` | group node size | `{ width: number; height: number; maxLabelWidth: number; }` |
| `defaultNode` | default node size | `{ width: number; height: number; labelOffset: number; maxLabelWidth: number; }` |


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
| `xOffset` | x-offset | `number` |
| `yOffset` | y-offset | `number` |
| `width` | width | `number` |
| `height` | height | `number` |
| `[key: string]`| user inputs | `any` |


#### NzGraphEdge

| Parameter | Description | Type |
| --- | --- | --- |
| `id` | id | `string` |
| `v` | source node | `number\|string` |
| `w` | target node | `number\|string` |
| `label?` | edge content | `string` |
| `points` | points | `Array<{ x: number; y: number; }>` |

#### NzGraphGroupNode

| Parameter | Type |
| --- | --- |
| `expanded` | `boolean` |
| `nodes` | `Array<NzGraphNode\|NzGraphGroupNode>` |
| `edges` | `NzGraphEdge[]` |

### [nzGraphNode]
Customize the graph node template

```html
<svg nz-svg-container>
  <g nz-graph [nzGraphData]="data">
    <ng-container *nzGraphNode="let node">
      <span>{{ node.name }} - {{ node.label }}</span>
    </ng-container>
  </g>
</svg>
```

### [nzGraphGroupNode]
Customize the graph group-node template

```html
<svg nz-svg-container>
  <g nz-graph [nzGraphData]="data">
    <ng-container *nzGraphGroupNode="let node">
      <span>{{ node.name }} - {{ node.label }}</span>
    </ng-container>
  </g>
</svg>
```

### [nzGraphEdge]
Customize the graph edge template

```html
<svg nz-svg-container>
  <g nz-graph [nzGraphData]="data">
    <ng-container *nzGraphEdge="let edge">
      <svg:g>
        <path></path>
      </svg:g>
    </ng-container>
  </g>
</svg>
```

### Styling

The Component styles only contain the necessary positional properties and simple styles, you can customize the style by overriding the following class.

- `.nz-graph` `nz-graph` The `nz-graph` component namespace
- `.nz-graph-nodes` The class name of container covered all nodes
  * `.nz-graph-node` The class name of `nz-graph-node`
  * `.nz-graph-node-expanded` The class name of expanded node
  * `.nz-graph-group-node` The class name of group node
  * `.nz-graph-base-node` The class name of leaf(OP) node
- `.nz-graph-edges` The class name of container covered edges in the target node
  * `.nz-graph-edge` The class name of edge
    * `path.nz-graph-edge-line` The class name of svg:path element
    * `.nz-graph-edge-text` The class name of svg:text element

## More
- [dagre-compound](https://www.npmjs.com/package/dagre-compound): Dagre-based nested layout calculation library
- [SelectionModel](https://github.com/angular/components/blob/master/src/cdk/collections/selection-model.ts)