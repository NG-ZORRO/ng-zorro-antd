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

export interface NzTreeNodeOptions {
  title: string;
  key: string;
  isLeaf?: boolean;
  checked?: boolean;
  selected?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  expanded?: boolean;
  children?: NzTreeNodeOptions[];
}
