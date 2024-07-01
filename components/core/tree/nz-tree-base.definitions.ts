/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzTreeNode } from './nz-tree-base-node';

export interface NzFormatEmitEvent {
  eventName: string;
  node?: NzTreeNode | null;
  event?: MouseEvent | DragEvent | null;
  dragNode?: NzTreeNode;
  selectedKeys?: NzTreeNode[];
  checkedKeys?: NzTreeNode[];
  matchedKeys?: NzTreeNode[];
  nodes?: NzTreeNode[];
  keys?: string[];
}

export interface NzFormatBeforeDropEvent {
  dragNode: NzTreeNode;
  node: NzTreeNode;
  pos: number;
}

export interface NzTreeNodeBaseComponent {
  markForCheck(): void;
}
