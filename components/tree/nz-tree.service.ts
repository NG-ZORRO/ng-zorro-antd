import { Injectable } from '@angular/core';

import { NzFormatEmitEvent } from './interface';
import { NzTreeNode } from './nz-tree-node';

@Injectable()
export class NzTreeService {
  DRAG_SIDE_RANGE = 0.25;
  DRAG_MIN_GAP = 2;

  selectedNode: NzTreeNode;
  targetNode: NzTreeNode;
  rootNodes: NzTreeNode[] = [];
  selectedNodeList: NzTreeNode[] = [];
  checkedNodeList: NzTreeNode[] = [];
  matchedNodeList: NzTreeNode[] = [];

  /**
   * init data to NzTreeNode
   * @param {any[]} root
   */
  initTreeNodes(root: NzTreeNode[]): NzTreeNode[] {
    this.rootNodes = root;
    if (root.length > 0) {
      root.forEach((node) => {
        const currentNode = node;
        this.initParentNode(currentNode);
      });
    }
    return this.rootNodes;
  }

  /**
   * init checkBox state
   * @param {NzTreeNode} node
   * @returns {NzTreeNode}
   */
  initParentNode(node: NzTreeNode): void {
    if (node.children.length === 0) {
      // until root
      this.checkTreeNodeParents(node);
    } else {
      node.children.forEach((child) => {
        this.initParentNode(child);
      });
    }
  }

  setSelectedNode(node: NzTreeNode | null): void {
    this.selectedNode = node;
  }

  getSelectedNode(): NzTreeNode | null {
    return this.selectedNode;
  }

  // if node is clicked, add or remove node to select list
  setSelectedNodeList(node: NzTreeNode, isMultiple: boolean): void {
    if (isMultiple) {
      const sIndex = this.selectedNodeList.findIndex(cNode => node.key === cNode.key);
      if (node.isSelected && sIndex === -1) {
        this.selectedNodeList.push(node);
      } else if (sIndex > -1) {
        this.selectedNodeList.splice(sIndex, 1);
      }
    } else {
      if (node.isSelected) {
        this.selectedNodeList = [ node ];
      } else {
        this.selectedNodeList = [];
      }
    }
  }

  getSelectedNodeList(): NzTreeNode[] {
    return this.selectedNodeList;
  }

  // if checkbox is clicked, add or remove node to checkbox list
  setCheckedNodeList(node: NzTreeNode): void {
    if (node.isChecked && this.checkedNodeList.findIndex(cNode => (node.key === cNode.key && node.title === cNode.title)) === -1) {
      this.checkedNodeList.push(node);
    }
    const removeChild = (rNode: NzTreeNode) => {
      const rIndex = this.checkedNodeList.findIndex(cNode => (rNode.key === cNode.key && rNode.title === cNode.title));
      if (rIndex > -1) {
        this.checkedNodeList.splice(rIndex, 1);
      }
      rNode.children.forEach(child => {
        removeChild(child);
      });
    };
    // refresh tree nodes check state, merge child node checked
    this.rootNodes.forEach((rNode: NzTreeNode) => {
      const loopNode = (lNode: NzTreeNode) => {
        const cIndex = this.checkedNodeList.findIndex(cNode => (lNode.key === cNode.key && lNode.title === cNode.title));
        if (lNode.isChecked) {
          if (cIndex === -1) {
            this.checkedNodeList.push(lNode);
          }
          // reset child state
          lNode.children.forEach((child) => {
            removeChild(child);
          });
        } else {
          if (cIndex > -1) {
            this.checkedNodeList.splice(cIndex, 1);
          }
          lNode.children.forEach(child => {
            loopNode(child);
          });
        }
      };
      loopNode(rNode);
    });
  }

  getCheckedNodeList(): NzTreeNode[] {
    return this.checkedNodeList;
  }

  getMatchedNodeList(): NzTreeNode[] {
    return this.matchedNodeList;
  }

  /**
   * keep selected state if isMultiple is true
   * @param {NzTreeNode} node
   * @param {boolean} isMultiple
   */
  initNodeActive(node: NzTreeNode, isMultiple: boolean = false): void {
    if (node.isDisabled) {
      return;
    }
    const isSelected = node.isSelected;
    if (!isMultiple) {
      this.rootNodes.forEach((child) => {
        this.resetNodeActive(child);
      });
    }
    node.isSelected = !isSelected;
    this.setSelectedNodeList(node, isMultiple);
  }

  // reset all nodes to unselected
  resetNodeActive(node: NzTreeNode): void {
    node.isSelected = false;
    node.children.forEach((child) => {
      this.resetNodeActive(child);
    });
  }

  /**
   * click checkbox
   * @param {NzTreeNode} checkedNode
   */
  checkTreeNode(node: NzTreeNode, defaultValue?: boolean): void {
    node.isChecked = typeof(defaultValue) === 'undefined' ? !node.isChecked : defaultValue;
    node.isAllChecked = node.isChecked;
    const isChecked = node.isChecked;
    this.checkTreeNodeChildren(node, isChecked);
    this.checkTreeNodeParents(node);
    this.setCheckedNodeList(node);
  }

  /**
   * reset child check state
   * @param {NzTreeNode} node
   * @param {boolean} value
   */
  checkTreeNodeChildren(node: NzTreeNode, value: boolean): void {
    if (!node.isDisabled && !node.isDisableCheckbox) {
      node.isChecked = value;
      node.isAllChecked = value;
      if (value) {
        node.isHalfChecked = false;
      }
      for (const n of node.children) {
        this.checkTreeNodeChildren(n, value);
      }
    }
  }

  /**
   * 1、children half checked
   * 2、children all checked, parent checked
   * 3、no children checked
   * @param node
   * @returns {boolean}
   */
  checkTreeNodeParents(node: NzTreeNode): void {
    const parentNode = node.getParentNode();
    if (parentNode) {
      if (parentNode.children.every(child => child.isDisabled || child.isDisableCheckbox || (!child.isHalfChecked && child.isAllChecked))) {
        parentNode.isChecked = true;
        parentNode.isAllChecked = true;
        parentNode.isHalfChecked = false;
      } else if (parentNode.children.some(child => child.isHalfChecked || child.isAllChecked)) {
        parentNode.isChecked = false;
        parentNode.isAllChecked = false;
        parentNode.isHalfChecked = true;
      } else {
        parentNode.isChecked = false;
        parentNode.isAllChecked = false;
        parentNode.isHalfChecked = false;
      }
      this.checkTreeNodeParents(parentNode);
    }
  }

  /**
   * search & expand node
   */
  searchExpand(value: string): void {
    this.matchedNodeList = [];
    const loopParent = (node: NzTreeNode) => {
      // expand parent node
      if (node.getParentNode()) {
        node.getParentNode().isExpanded = true;
        loopParent(node.getParentNode());
      }
    };
    const loopChild = (node: NzTreeNode) => {
      if (value && node.title.includes(value)) {
        // match the node
        this.matchedNodeList.push(node);
        // expand parentNode
        loopParent(node);
      } else {
        node.isExpanded = false;
      }
      node.children.forEach(cNode => {
        loopChild(cNode);
      });
    };
    this.rootNodes.forEach(node => {
      loopChild(node);
    });
  }

  /**
   * drop
   * 0: inner -1: pre 1: next
   */
  dropAndApply(targetNode: NzTreeNode, dragPos: number = -1): void {
    if (!targetNode || dragPos > 1) {
      return;
    }
    const targetParent = targetNode.getParentNode();
    const isSelectedRootNode = this.selectedNode.getParentNode();
    // remove the dragNode
    if (isSelectedRootNode) {
      isSelectedRootNode.getChildren().splice(isSelectedRootNode.getChildren().indexOf(this.selectedNode), 1);
    } else {
      this.rootNodes.splice(this.rootNodes.indexOf(this.selectedNode), 1);
    }
    switch (dragPos) {
      case 0:
        targetNode.addChildren([ this.selectedNode ]);
        this.resetNodeLevel(targetNode);
        break;
      case -1:
      case 1:
        const tIndex = dragPos === 1 ? 1 : 0;
        if (targetParent) {
          targetParent.addChildren([ this.selectedNode ], targetParent.children.indexOf(targetNode) + tIndex);
          this.resetNodeLevel(this.selectedNode.getParentNode());
        } else {
          const targetIndex = this.rootNodes.indexOf(targetNode) + tIndex;
          // 根节点插入
          this.rootNodes.splice(targetIndex, 0, this.selectedNode);
          this.rootNodes[ targetIndex ].parentNode = null;
          this.rootNodes[ targetIndex ].level = 0;
        }
        break;
    }
    // flush all nodes
    this.rootNodes.forEach((child) => {
      this.initParentNode(child);
    });
  }

  // reset node level
  resetNodeLevel(node: NzTreeNode): void {
    if (node.getParentNode()) {
      node.level = node.getParentNode().level + 1;
    } else {
      node.level = 0;
    }
    for (const child of node.getChildren()) {
      this.resetNodeLevel(child);
    }
  }

  /**
   * @param {DragEvent} e
   * @returns {number}
   */
  calcDropPosition(e: DragEvent): number {
    const { clientY } = e;
    const { top, bottom, height } = e.srcElement.getBoundingClientRect();
    const des = Math.max(height * this.DRAG_SIDE_RANGE, this.DRAG_MIN_GAP);

    if (clientY <= top + des) {
      return -1;
    } else if (clientY >= bottom - des) {
      return 1;
    }

    return 0;
  }

  /**
   * emit Structure
   * eventName
   * node
   * event: MouseEvent / DragEvent
   * dragNode
   */
  formatEvent(eventName: string, node: NzTreeNode, event: MouseEvent | DragEvent): NzFormatEmitEvent {
    const emitStructure = {
      'eventName': eventName,
      'node'     : node,
      'event'    : event
    };
    switch (eventName) {
      case 'dragstart':
      case 'dragenter':
      case 'dragover':
      case 'dragleave':
      case 'drop':
      case 'dragend':
        Object.assign(emitStructure, { 'dragNode': this.getSelectedNode() });
        break;
      case 'click':
        Object.assign(emitStructure, { 'selectedKeys': this.getSelectedNodeList() });
        break;
      case 'check':
        Object.assign(emitStructure, { 'checkedKeys': this.getCheckedNodeList() });
        break;
      case 'search':
        Object.assign(emitStructure, { 'matchedKeys': this.getMatchedNodeList() });
        break;
    }
    return emitStructure;
  }
}
