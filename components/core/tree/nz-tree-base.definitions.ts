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
  setClassMap(): void;
  markForCheck(): void;
}
