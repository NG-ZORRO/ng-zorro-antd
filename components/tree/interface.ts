import { NzTreeNode } from './nz-tree-node';

export interface NzFormatEmitEvent {
  eventName: string;
  node: NzTreeNode;
  event: MouseEvent | DragEvent;
  dragNode?: NzTreeNode;
  selectedKeys?: NzTreeNode[];
  checkedKeys?: NzTreeNode[];
  matchedKeys?: NzTreeNode[];
}

export interface NzFormatBeforeDropEvent {
  dragNode: NzTreeNode;
  node: NzTreeNode;
  pos: number;
}
