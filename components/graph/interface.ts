/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  HierarchyBaseEdgeInfo,
  HierarchyBaseNodeInfo,
  HierarchyGraphDef,
  HierarchyGraphEdgeDef,
  HierarchyGraphNodeDef,
  HierarchyGraphNodeInfo,
  HierarchyGraphOption
} from '@nx-component/hierarchy-graph';
import { LayoutSetting } from '@nx-component/hierarchy-graph/dist/types';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export interface NzGraphDataDef extends HierarchyGraphDef {
  nodes: NzGraphNodeDef[];
  edges: NzGraphEdgeDef[];
}

export interface NzGraphNodeDef extends HierarchyGraphNodeDef {
  label?: string;
}

export interface NzGraphEdgeDef extends HierarchyGraphEdgeDef {
  label?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface NzGraphOption extends HierarchyGraphOption {}
export declare type NzRankDirection = 'TB' | 'BT' | 'LR' | 'RL';

export interface NzGraphGroupNode extends HierarchyGraphNodeInfo {
  nodes: Array<NzGraphNode | NzGraphGroupNode>;
  edges: NzGraphEdge[];
  [key: string]: NzSafeAny;
}

export interface NzGraphNode extends HierarchyBaseNodeInfo {
  id: NzSafeAny;
  // TODO
  name: NzSafeAny;
  label?: string;
  [key: string]: NzSafeAny;
}

export interface NzGraphEdge extends HierarchyBaseEdgeInfo {
  id: NzSafeAny;
  v: NzSafeAny;
  w: NzSafeAny;
  label?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface NzLayoutSetting extends LayoutSetting {}

export function nzTypeDefinition<T>(): (item: unknown) => T {
  return item => item as T;
}

// tslint:disable:no-shadowed-variable
export type NzDeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<NzDeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<NzDeepPartial<U>>
    : NzDeepPartial<T[P]>;
};

export type NzGraphLayoutSetting = NzDeepPartial<NzLayoutSetting>;
export const NZ_GRAPH_LAYOUT_SETTING: NzLayoutSetting = {
  animation: {
    /** Default duration for graph animations in ms. */
    duration: 250
  },
  graph: {
    /** Graph parameter for metanode. */
    meta: {
      /**
       * Dagre's nodesep param - number of pixels that
       * separate nodes horizontally in the layout.
       *
       * See https://github.com/cpettitt/dagre/wiki#configuring-the-layout
       */
      nodeSep: 50,
      /**
       * Dagre's ranksep param - number of pixels
       * between each rank in the layout.
       *
       * See https://github.com/cpettitt/dagre/wiki#configuring-the-layout
       */
      rankSep: 40,
      /**
       * Dagre's edgesep param - number of pixels that separate
       * edges horizontally in the layout.
       */
      edgeSep: 5
    },
    /**
     * Padding is used to correctly position the graph SVG inside of its parent
     * element. The padding amounts are applied using an SVG transform of X and
     * Y coordinates.
     */
    padding: { paddingTop: 10, paddingLeft: 0 }
  },
  subscene: {
    meta: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      /**
       * Used to leave room for the label on top of the highest node in
       * the groupCore graph.
       */
      labelHeight: 20,
      /** X-space between each extracted node and the groupCore graph. */
      extractXOffset: 0,
      /** Y-space between each extracted node. */
      extractYOffset: 0
    }
  },
  nodeSize: {
    /** Size of meta nodes. */
    meta: {
      radius: 2,
      width: 160,
      maxLabelWidth: 0,
      /** A scale for the node's height based on number of nodes inside */
      // Hack - set this as an any type to avoid issues in exporting a type
      // from an external module.
      height: 100,
      /** The radius of the circle denoting the expand button. */
      expandButtonRadius: 3
    },
    /** Size of op nodes. */
    op: {
      width: 160,
      height: 100,
      radius: 1, // for making annotation touching ellipse
      labelOffset: 10,
      maxLabelWidth: 40
    },
    /** Size of bridge nodes. */
    bridge: {
      // NOTE: bridge nodes will normally be invisible, but they must
      // take up some space so that the layout step leaves room for
      // their edges.
      width: 10,
      height: 10,
      radius: 2,
      labelOffset: 0
    }
  },
  shortcutSize: {
    /** Size of shortcuts for op nodes */
    op: { width: 10, height: 4 },
    /** Size of shortcuts for meta nodes */
    meta: { width: 12, height: 4, radius: 1 },
    /** Size of shortcuts for series nodes */
    series: {
      width: 14,
      height: 4
    }
  },
  annotations: {
    /** Maximum possible width of the bounding box for in annotations */
    inboxWidth: 50,
    /** Maximum possible width of the bounding box for out annotations */
    outboxWidth: 50,
    /** X-space between the shape and each annotation-node. */
    xOffset: 10,
    /** Y-space between each annotation-node. */
    yOffset: 3,
    /** X-space between each annotation-node and its label. */
    labelOffset: 2,
    /** Defines the max width for annotation label */
    maxLabelWidth: 120
  },
  constant: { size: { width: 4, height: 4 } },
  minimap: {
    /** The maximum width/height the minimap can have. */
    size: 150
  }
};
