import { Injectable } from '@angular/core';

import { NzFormatEmitEvent, NzFormatPosition, NzTreeNodeOptions } from './interface';
import { NzTreeNode } from './nz-tree-node';

@Injectable()
export class NzTreeService {
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
  initTreeNodes(root: NzTreeNodeOptions[]): NzTreeNode[] {
    this.rootNodes = [];
    if (root.length > 0) {
      root.forEach((node) => {
        const currentNode = new NzTreeNode(node);
        this.initParentNode(currentNode);
        this.rootNodes.push(currentNode);
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

  // add node to select list
  setSelectedNodeList(node: NzTreeNode, isMultiple: boolean): void {
    if (isMultiple) {
      let sIndex = -1;
      this.selectedNodeList.forEach((cNode, index) => {
        if (node.key === cNode.key) {
          sIndex = index;
        }
      });
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

  // add node to checkbox list
  setCheckedNodeList(node: NzTreeNode): void {
    let isExist = false;
    this.checkedNodeList.forEach((cNode) => {
      if (node.key === cNode.key && node.title === cNode.title) {
        isExist = true;
      }
    });
    if (node.isChecked && !isExist) {
      this.checkedNodeList.push(node);
    }
    const removeChild = (rNode) => {
      let rIndex = -1;
      this.checkedNodeList.forEach((cNode, index) => {
        if (rNode.key === cNode.key && rNode.title === cNode.title) {
          rIndex = index;
        }
      });
      if (rIndex > -1) {
        this.checkedNodeList.splice(rIndex, 1);
      }
      rNode.children.forEach(child => {
        removeChild(child);
      });
    };
    this.rootNodes.forEach((rNode) => {
      const loopNode = (lNode) => {
        let cIndex = -1;
        this.checkedNodeList.forEach((cNode, index) => {
          if (lNode.key === cNode.key) {
            cIndex = index;
          }
        });
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
      isSelectedRootNode.children.splice(isSelectedRootNode.children.indexOf(this.selectedNode), 1);
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
    const offsetTop = this.getOffset(e.srcElement as HTMLElement).top;
    const offsetHeight = (e.srcElement as HTMLElement).offsetHeight;
    const pageY = e.pageY;
    const gapHeight = offsetHeight * 0.1; // TODO: remove hard code
    if (pageY > offsetTop + offsetHeight * 0.9) {
      return 1;
    }
    if (pageY < offsetTop + gapHeight) {
      return -1;
    }
    return 0;
  }

  getOffset(ele: Element): NzFormatPosition {
    if (!ele || !ele.getClientRects().length) {
      return { top: 0, left: 0 };
    }
    const rect = ele.getBoundingClientRect();
    if (rect.width || rect.height) {
      const doc = ele.ownerDocument;
      const win = doc.defaultView;
      const docElem = doc.documentElement;

      return {
        top : rect.top + win.pageYOffset - docElem.clientTop,
        left: rect.left + win.pageXOffset - docElem.clientLeft
      };
    }
    return rect;
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
