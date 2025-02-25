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
  HierarchyGraphOption,
  LayoutConfig
} from 'dagre-compound';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export enum NzGraphEdgeType {
  LINE = 'line',
  CURVE = 'curve'
}

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

export interface NzLayoutSetting extends LayoutConfig {}

export interface NzGraphBaseLayout {
  layout: {
    nodeSep: number;
    rankSep: number;
    edgeSep: number;
  };
  subScene: {
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    labelHeight: number;
  };
  defaultCompoundNode: {
    width: number;
    height: number;
    maxLabelWidth: number;
  };
  defaultNode: {
    width: number;
    height: number;
    labelOffset: number;
    maxLabelWidth: number;
  };
  defaultEdge: {
    type: NzGraphEdgeType | string; // Need to support extensions
  };
}

export function nzTypeDefinition<T>(): (item: unknown) => T {
  return item => item as T;
}

export type NzDeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<NzDeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<NzDeepPartial<U>>
      : NzDeepPartial<T[P]>;
};

export type NzGraphLayoutConfig = NzDeepPartial<NzGraphBaseLayout>;
export const NZ_GRAPH_LAYOUT_SETTING: NzLayoutSetting = {
  graph: {
    meta: {
      nodeSep: 50,
      rankSep: 50,
      edgeSep: 5
    }
  },
  subScene: {
    meta: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      labelHeight: 20
    }
  },
  nodeSize: {
    meta: {
      width: 50,
      maxLabelWidth: 0,
      height: 50
    },
    node: {
      width: 50,
      height: 50,
      labelOffset: 10,
      maxLabelWidth: 40
    },
    bridge: {
      width: 5,
      height: 5,
      radius: 2,
      labelOffset: 0
    }
  }
};

// Zoom interface

export interface NzZoomTransform {
  x: number;
  y: number;
  k: number;
}

export interface RelativePositionInfo {
  topLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}
