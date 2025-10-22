/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTreeNode, NzTreeNodeKey } from './nz-tree-base-node';
import { flattenTreeData, isCheckDisabled, isInArray } from './nz-tree-base-util';
import { NzFormatEmitEvent } from './nz-tree-base.definitions';

@Injectable()
export class NzTreeBaseService {
  DRAG_SIDE_RANGE = 0.25;
  DRAG_MIN_GAP = 2;

  isCheckStrictly: boolean = false;
  isMultiple: boolean = false;
  selectedNode!: NzTreeNode;
  rootNodes: NzTreeNode[] = [];
  flattenNodes$ = new BehaviorSubject<NzTreeNode[]>([]);
  selectedNodeList: NzTreeNode[] = [];
  expandedNodeList: NzTreeNode[] = [];
  checkedNodeList: NzTreeNode[] = [];
  halfCheckedNodeList: NzTreeNode[] = [];
  matchedNodeList: NzTreeNode[] = [];
  /**
   * handle to post process a tree node when it's instantiating, note that its children haven't been initiated yet
   */
  treeNodePostProcessor?: (node: NzTreeNode) => void;

  /**
   * reset tree nodes will clear default node list
   */
  initTree(nzNodes: NzTreeNode[]): void {
    this.rootNodes = nzNodes;
    this.expandedNodeList = [];
    this.selectedNodeList = [];
    this.halfCheckedNodeList = [];
    this.checkedNodeList = [];
    this.matchedNodeList = [];
  }

  flattenTreeData(nzNodes: NzTreeNode[], expandedKeys: NzTreeNodeKey[] | true = []): void {
    this.flattenNodes$.next(flattenTreeData(nzNodes, expandedKeys).map(item => item.data));
  }

  getSelectedNode(): NzTreeNode | null {
    return this.selectedNode;
  }

  /**
   * get some list
   */
  getSelectedNodeList(): NzTreeNode[] {
    return this.conductNodeState('select');
  }

  /**
   * get checked node keys
   */
  getCheckedNodeKeys(): NzTreeNodeKey[] {
    const keys: NzTreeNodeKey[] = [];
    const checkedNodes = this.getCheckedNodeList();

    const calc = (nodes: NzTreeNode[]): void => {
      nodes.forEach(node => {
        keys.push(node.key);
        if (node.children.length < 1) return;
        calc(node.children);
      });
    };

    calc(checkedNodes);

    return keys;
  }

  /**
   * return checked nodes
   */
  getCheckedNodeList(): NzTreeNode[] {
    return this.conductNodeState('check');
  }

  getHalfCheckedNodeList(): NzTreeNode[] {
    return this.conductNodeState('halfCheck');
  }

  /**
   * return expanded nodes
   */
  getExpandedNodeList(): NzTreeNode[] {
    return this.conductNodeState('expand');
  }

  /**
   * return search matched nodes
   */
  getMatchedNodeList(): NzTreeNode[] {
    return this.conductNodeState('match');
  }

  isArrayOfNzTreeNode(value: NzSafeAny[]): boolean {
    return value.every(item => item instanceof NzTreeNode);
  }

  /**
   * set drag node
   */
  setSelectedNode(node: NzTreeNode): void {
    this.selectedNode = node;
  }

  /**
   * set node selected status
   */
  setNodeActive(node: NzTreeNode): void {
    if (!this.isMultiple && node.isSelected) {
      this.selectedNodeList.forEach(n => {
        if (node.key !== n.key) {
          // reset other nodes
          n.isSelected = false;
        }
      });
      // single mode: remove pre node
      this.selectedNodeList = [];
    }
    this.setSelectedNodeList(node, this.isMultiple);
  }

  /**
   * add or remove node to selectedNodeList
   */
  setSelectedNodeList(node: NzTreeNode, isMultiple: boolean = false): void {
    const index = this.getIndexOfArray(this.selectedNodeList, node.key);
    if (isMultiple) {
      if (node.isSelected && index === -1) {
        this.selectedNodeList.push(node);
      }
    } else {
      if (node.isSelected && index === -1) {
        this.selectedNodeList = [node];
      }
    }
    if (!node.isSelected) {
      this.selectedNodeList = this.selectedNodeList.filter(n => n.key !== node.key);
    }
  }

  /**
   * merge checked nodes
   */
  setHalfCheckedNodeList(node: NzTreeNode): void {
    const index = this.getIndexOfArray(this.halfCheckedNodeList, node.key);
    if (node.isHalfChecked && index === -1) {
      this.halfCheckedNodeList.push(node);
    } else if (!node.isHalfChecked && index > -1) {
      this.halfCheckedNodeList = this.halfCheckedNodeList.filter(n => node.key !== n.key);
    }
  }

  setCheckedNodeList(node: NzTreeNode): void {
    const index = this.getIndexOfArray(this.checkedNodeList, node.key);
    if (node.isChecked && index === -1) {
      this.checkedNodeList.push(node);
    } else if (!node.isChecked && index > -1) {
      this.checkedNodeList = this.checkedNodeList.filter(n => node.key !== n.key);
    }
  }

  /**
   * conduct checked/selected/expanded keys
   */
  conductNodeState(type: string = 'check'): NzTreeNode[] {
    let resultNodesList: NzTreeNode[] = [];
    switch (type) {
      case 'select':
        resultNodesList = this.selectedNodeList;
        break;
      case 'expand':
        resultNodesList = this.expandedNodeList;
        break;
      case 'match':
        resultNodesList = this.matchedNodeList;
        break;
      case 'check': {
        resultNodesList = this.checkedNodeList;
        const isIgnore = (node: NzTreeNode): boolean => {
          const parentNode = node.getParentNode();
          if (parentNode) {
            if (this.checkedNodeList.findIndex(n => n.key === parentNode.key) > -1) {
              return true;
            } else {
              return isIgnore(parentNode);
            }
          }
          return false;
        };
        // merge checked
        if (!this.isCheckStrictly) {
          resultNodesList = this.checkedNodeList.filter(n => !isIgnore(n));
        }
        break;
      }
      case 'halfCheck':
        if (!this.isCheckStrictly) {
          resultNodesList = this.halfCheckedNodeList;
        }
        break;
    }
    return resultNodesList;
  }

  /**
   * set expanded nodes
   */
  setExpandedNodeList(node: NzTreeNode): void {
    if (node.isLeaf) {
      return;
    }
    const index = this.getIndexOfArray(this.expandedNodeList, node.key);
    if (node.isExpanded && index === -1) {
      this.expandedNodeList.push(node);
    } else if (!node.isExpanded && index > -1) {
      this.expandedNodeList.splice(index, 1);
    }
  }

  setMatchedNodeList(node: NzTreeNode): void {
    const index = this.getIndexOfArray(this.matchedNodeList, node.key);
    if (node.isMatched && index === -1) {
      this.matchedNodeList.push(node);
    } else if (!node.isMatched && index > -1) {
      this.matchedNodeList.splice(index, 1);
    }
  }

  /**
   * check state
   *
   * @param isCheckStrictly
   */
  refreshCheckState(isCheckStrictly: boolean = false): void {
    if (isCheckStrictly) {
      return;
    }
    this.checkedNodeList.forEach(node => {
      this.conduct(node, isCheckStrictly);
    });
  }

  // reset other node checked state based current node
  conduct(node: NzTreeNode, isCheckStrictly: boolean = false): void {
    const isChecked = node.isChecked;
    if (node && !isCheckStrictly) {
      this.conductUp(node);
      this.conductDown(node, isChecked);
    }
  }

  /**
   * 1、children half checked
   * 2、children all checked, parent checked
   * 3、no children checked
   */
  conductUp(node: NzTreeNode): void {
    const parentNode = node.getParentNode();
    if (parentNode) {
      if (!isCheckDisabled(parentNode)) {
        if (parentNode.children.every(child => isCheckDisabled(child) || (!child.isHalfChecked && child.isChecked))) {
          parentNode.isChecked = true;
          parentNode.isHalfChecked = false;
        } else if (parentNode.children.some(child => child.isHalfChecked || child.isChecked)) {
          parentNode.isChecked = false;
          parentNode.isHalfChecked = true;
        } else {
          parentNode.isChecked = false;
          parentNode.isHalfChecked = false;
        }
      }
      this.setCheckedNodeList(parentNode);
      this.setHalfCheckedNodeList(parentNode);
      this.conductUp(parentNode);
    }
  }

  /**
   * reset child check state
   */
  conductDown(node: NzTreeNode, value: boolean): void {
    if (!isCheckDisabled(node)) {
      node.isChecked = value;
      node.isHalfChecked = false;
      this.setCheckedNodeList(node);
      this.setHalfCheckedNodeList(node);
      node.children.forEach(n => {
        this.conductDown(n, value);
      });
    }
  }

  /**
   * flush after delete node
   */
  afterRemove(nodes: NzTreeNode[]): void {
    // to reset selectedNodeList & expandedNodeList
    const loopNode = (node: NzTreeNode): void => {
      // remove selected node
      this.selectedNodeList = this.selectedNodeList.filter(n => n.key !== node.key);
      // remove expanded node
      this.expandedNodeList = this.expandedNodeList.filter(n => n.key !== node.key);
      // remove checked node
      this.checkedNodeList = this.checkedNodeList.filter(n => n.key !== node.key);
      if (node.children) {
        node.children.forEach(child => {
          loopNode(child);
        });
      }
    };
    nodes.forEach(n => {
      loopNode(n);
    });
    this.refreshCheckState(this.isCheckStrictly);
  }

  /**
   * drag event
   */
  refreshDragNode(node: NzTreeNode): void {
    if (node.children.length === 0) {
      // until root
      this.conductUp(node);
    } else {
      node.children.forEach(child => {
        this.refreshDragNode(child);
      });
    }
  }

  // reset node level
  resetNodeLevel(node: NzTreeNode): void {
    const parentNode = node.getParentNode();
    if (parentNode) {
      node.level = parentNode.level + 1;
    } else {
      node.level = 0;
    }
    for (const child of node.children) {
      this.resetNodeLevel(child);
    }
  }

  calcDropPosition(event: DragEvent): number {
    const { clientY } = event;
    // to fix firefox undefined
    const { top, bottom, height } = (event.target as Element).getBoundingClientRect();
    const des = Math.max(height * this.DRAG_SIDE_RANGE, this.DRAG_MIN_GAP);

    if (clientY <= top + des) {
      return -1;
    } else if (clientY >= bottom - des) {
      return 1;
    }

    return 0;
  }

  /**
   * drop
   * 0: inner -1: pre 1: next
   */
  dropAndApply(targetNode: NzTreeNode, dragPos: number = -1): void {
    if (!targetNode || dragPos > 1) {
      return;
    }
    const treeService = targetNode.treeService;
    const targetParent = targetNode.getParentNode();
    const isSelectedRootNode = this.selectedNode.getParentNode();
    // remove the dragNode
    if (isSelectedRootNode) {
      isSelectedRootNode.children = isSelectedRootNode.children.filter(n => n.key !== this.selectedNode.key);
    } else {
      this.rootNodes = this.rootNodes.filter(n => n.key !== this.selectedNode.key);
    }
    switch (dragPos) {
      case 0:
        targetNode.addChildren([this.selectedNode]);
        this.resetNodeLevel(targetNode);
        break;
      case -1:
      case 1: {
        const tIndex = dragPos === 1 ? 1 : 0;
        if (targetParent) {
          targetParent.addChildren([this.selectedNode], targetParent.children.indexOf(targetNode) + tIndex);
          const parentNode = this.selectedNode.getParentNode();
          if (parentNode) {
            this.resetNodeLevel(parentNode);
          }
        } else {
          const targetIndex = this.rootNodes.indexOf(targetNode) + tIndex;
          // Insert root node.
          this.rootNodes.splice(targetIndex, 0, this.selectedNode);
          this.rootNodes[targetIndex].parentNode = null;
          this.resetNodeLevel(this.rootNodes[targetIndex]);
        }
        break;
      }
    }
    // flush all nodes
    this.rootNodes.forEach(child => {
      if (!child.treeService) {
        child.service = treeService;
      }
      this.refreshDragNode(child);
    });
  }

  /**
   * emit Structure
   * eventName
   * node
   * event: MouseEvent / DragEvent
   * dragNode
   */
  formatEvent(eventName: string, node: NzTreeNode | null, event: MouseEvent | DragEvent | null): NzFormatEmitEvent {
    const emitStructure: NzFormatEmitEvent = {
      eventName,
      node,
      event
    };
    switch (eventName) {
      case 'dragstart':
      case 'dragenter':
      case 'dragover':
      case 'dragleave':
      case 'drop':
      case 'dragend':
        Object.assign(emitStructure, { dragNode: this.getSelectedNode() });
        break;
      case 'click':
      case 'dblclick':
        Object.assign(emitStructure, { selectedKeys: this.selectedNodeList });
        Object.assign(emitStructure, { nodes: this.selectedNodeList });
        Object.assign(emitStructure, { keys: this.selectedNodeList.map(n => n.key) });
        break;
      case 'check': {
        const checkedNodeList = this.getCheckedNodeList();
        Object.assign(emitStructure, { checkedKeys: checkedNodeList });
        Object.assign(emitStructure, { nodes: checkedNodeList });
        Object.assign(emitStructure, { keys: checkedNodeList.map(n => n.key) });
        break;
      }
      case 'search':
        Object.assign(emitStructure, { matchedKeys: this.getMatchedNodeList() });
        Object.assign(emitStructure, { nodes: this.getMatchedNodeList() });
        Object.assign(emitStructure, { keys: this.getMatchedNodeList().map(n => n.key) });
        break;
      case 'expand':
        Object.assign(emitStructure, { nodes: this.expandedNodeList });
        Object.assign(emitStructure, { keys: this.expandedNodeList.map(n => n.key) });
        break;
    }
    return emitStructure;
  }

  /**
   * New functions for flatten nodes
   */

  getIndexOfArray(list: NzTreeNode[], key: string): number {
    return list.findIndex(v => v.key === key);
  }

  /**
   * Render by nzCheckedKeys
   * When keys equals null, just render with checkStrictly
   *
   * @param keys
   * @param checkStrictly
   */
  conductCheck(keys: NzTreeNodeKey[] | null, checkStrictly: boolean): void {
    this.checkedNodeList = [];
    this.halfCheckedNodeList = [];
    const calc = (nodes: NzTreeNode[]): void => {
      nodes.forEach(node => {
        if (keys === null) {
          // render tree if no default checked keys found
          node.isChecked = !!node.origin.checked;
        } else {
          if (isInArray(node.key, keys || [])) {
            node.isChecked = true;
            node.isHalfChecked = false;
          } else {
            node.isChecked = false;
            node.isHalfChecked = false;
          }
        }
        if (node.children.length > 0) {
          calc(node.children);
        }
      });
    };
    calc(this.rootNodes);
    this.refreshCheckState(checkStrictly);
  }

  conductExpandedKeys(keys: NzTreeNodeKey[] | true = []): void {
    const expandedKeySet = new Set(keys === true ? [] : keys);
    this.expandedNodeList = [];
    const calc = (nodes: NzTreeNode[]): void => {
      nodes.forEach(node => {
        node.setExpanded(keys === true || expandedKeySet.has(node.key) || node.isExpanded === true);
        if (node.isExpanded) {
          this.setExpandedNodeList(node);
        }
        if (node.children.length > 0) {
          calc(node.children);
        }
      });
    };
    calc(this.rootNodes);
  }

  conductSelectedKeys(keys: NzTreeNodeKey[], isMulti: boolean): void {
    this.selectedNodeList.forEach(node => (node.isSelected = false));
    this.selectedNodeList = [];
    const calc = (nodes: NzTreeNode[]): boolean =>
      nodes.every(node => {
        if (isInArray(node.key, keys)) {
          node.isSelected = true;
          this.setSelectedNodeList(node);
          if (!isMulti) {
            // if not support multi select
            return false;
          }
        } else {
          node.isSelected = false;
        }
        if (node.children.length > 0) {
          // Recursion
          return calc(node.children);
        }
        return true;
      });
    calc(this.rootNodes);
  }

  /**
   * Expand parent nodes by child node
   *
   * @param node
   */
  expandNodeAllParentBySearch(node: NzTreeNode): void {
    const calc = (n: NzTreeNode | null): void => {
      if (n) {
        n.canHide = false;
        n.setExpanded(true);
        this.setExpandedNodeList(n);
        if (n.getParentNode()) {
          return calc(n.getParentNode());
        }
      }
    };
    calc(node.getParentNode());
  }
}
