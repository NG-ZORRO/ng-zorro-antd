import { NzTreeNode } from './nz-tree-node';

export interface NzFormatEmitEvent {
    eventName: string;
    node: NzTreeNode;
    event: MouseEvent | DragEvent;
    dragNode?: NzTreeNode;
    selectedKeys?: NzTreeNode[];
    checkedKeys?: NzTreeNode[];
}

export interface NzFormatPosition {
    top: number;
    left: number;
}
export interface NzTreeNodeOptions {
    title?: string;
    key?: string;
    children?: NzTreeNodeOptions[];
    isLeaf?: boolean;
    checked?: boolean;
    selected?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    expanded?: boolean;
}

export interface NzFormatClickEvent {
    event: MouseEvent;
    node: NzTreeNode;
}
