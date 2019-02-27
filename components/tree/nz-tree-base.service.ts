import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { isNotNil } from '../core/util/check';
import { NzFormatEmitEvent } from './interface';
import { NzTreeNode } from './nz-tree-node';
import { isCheckDisabled, isInArray } from './nz-tree-util';

@Injectable()
export class NzTreeBaseService implements OnDestroy {
  DRAG_SIDE_RANGE = 0.25;
  DRAG_MIN_GAP = 2;

  isCheckStrictly: boolean = false;
  isMultiple: boolean = false;
  selectedNode: NzTreeNode;
  rootNodes: NzTreeNode[] = [];
  selectedNodeList: NzTreeNode[] = [];
  expandedNodeList: NzTreeNode[] = [];
  checkedNodeList: NzTreeNode[] = [];
  halfCheckedNodeList: NzTreeNode[] = [];
  matchedNodeList: NzTreeNode[] = [];
  $statusChange = new Subject<NzFormatEmitEvent>();

  statusChanged(): Observable<NzFormatEmitEvent> {
    return this.$statusChange.asObservable();
  }

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
    // refresh node checked state
    setTimeout(() => {
      this.refreshCheckState(this.isCheckStrictly);
    });
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

  // tslint:disable-next-line:no-any
  isArrayOfNzTreeNode(value: any[]): boolean {
    return value.every(item => item instanceof NzTreeNode);
  }

  /**
   * reset selectedNodeList
   */
  calcSelectedKeys(selectedKeys: string[], nzNodes: NzTreeNode[], isMulti: boolean = false): void {
    const calc = (nodes: NzTreeNode[]): boolean => {
      return nodes.every(node => {
        if (isInArray(node.key, selectedKeys)) {
          node.setSelected(true, isMulti);
          if (!isMulti) {
            // if not support multi select
            return false;
          }
        } else {
          node.setSelected(false, isMulti);
        }
        if (node.getChildren().length > 0) {
          // Recursion
          return calc(node.getChildren());
        }
        return true;
      });
    };
    calc(nzNodes);
  }

  /**
   * reset expandedNodeList
   */
  calcExpandedKeys(expandedKeys: string[], nzNodes: NzTreeNode[]): void {
    this.expandedNodeList = [];
    const calc = (nodes: NzTreeNode[]) => {
      nodes.forEach(node => {
        if (isInArray(node.key, expandedKeys)) {
          node.setExpanded(true);
          this.setExpandedNodeList(node);
        } else {
          node.setExpanded(false);
        }
        if (node.getChildren().length > 0) {
          calc(node.getChildren());
        }
      });
    };
    calc(nzNodes);
  }

  /**
   * reset checkedNodeList
   */
  calcCheckedKeys(checkedKeys: string[], nzNodes: NzTreeNode[], isCheckStrictly: boolean = false): void {
    this.checkedNodeList = [];
    this.halfCheckedNodeList = [];
    const calc = (nodes: NzTreeNode[]) => {
      nodes.forEach(node => {
        if (isInArray(node.key, checkedKeys)) {
          node.setChecked(true);
        } else {
          node.setChecked(false);
        }
        if (node.getChildren().length > 0) {
          calc(node.getChildren());
        }
      });
    };
    calc(nzNodes);
    // controlled state
    this.refreshCheckState(isCheckStrictly);
  }

  /**
   * set drag node
   */
  setSelectedNode(node?: NzTreeNode): void {
    this.selectedNode = null;
    if (node) {
      this.selectedNode = node;
    }
  }

  /**
   * set node selected status
   */
  setNodeActive(node: NzTreeNode, isMultiple: boolean = false): void {
    if (!isMultiple && node.isSelected) {
      this.selectedNodeList.forEach(n => {
        if (node.key !== n.key) {
          // reset other nodes
          n.origin.selected = false;
          n.isSelected = false;
        }
      });
      // single mode: remove pre node
      this.selectedNodeList = [];
    }
    this.setSelectedNodeList(node, isMultiple);
  }

  /**
   * add or remove node to selectedNodeList
   */
  setSelectedNodeList(node: NzTreeNode, isMultiple: boolean = false): void {
    const index = this.selectedNodeList.findIndex(n => node.key === n.key);
    if (isMultiple) {
      if (node.isSelected && index === -1) {
        this.selectedNodeList.push(node);
      }
    } else {
      if (node.isSelected && index === -1) {
        this.selectedNodeList = [ node ];
      }
    }
    if (!node.isSelected && index > -1) {
      this.selectedNodeList.splice(index, 1);
    }
  }

  /**
   * merge checked nodes
   */
  setHalfCheckedNodeList(node: NzTreeNode): void {
    const index = this.halfCheckedNodeList.findIndex(n => node.key === n.key);
    if (node.isHalfChecked && index === -1) {
      this.halfCheckedNodeList.push(node);
    } else if (!node.isHalfChecked && index > -1) {
      this.halfCheckedNodeList.splice(index, 1);
    }
  }

  setCheckedNodeList(node: NzTreeNode): void {
    const index = this.checkedNodeList.findIndex(n => node.key === n.key);
    if (node.isChecked && index === -1) {
      this.checkedNodeList.push(node);
    } else if (!node.isChecked && index > -1) {
      this.checkedNodeList.splice(index, 1);
    }
  }

  /**
   * conduct checked/selected/expanded keys
   */
  conductNodeState(type: string = 'check'): NzTreeNode[] {
    let resultNodesList = [];
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
      case 'check':
        resultNodesList = this.checkedNodeList;
        const isIgnore = (node: NzTreeNode): boolean => {
          if (node.getParentNode()) {
            if (this.checkedNodeList.findIndex(v => v.key === node.getParentNode().key) > -1) {
              return true;
            } else {
              return isIgnore(node.getParentNode());
            }
          }
          return false;
        };
        // merge checked
        if (!this.isCheckStrictly) {
          resultNodesList = this.checkedNodeList.filter(n => !isIgnore(n));
        }
        break;
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
    const index = this.expandedNodeList.findIndex(n => node.key === n.key);
    if (node.isExpanded && index === -1) {
      this.expandedNodeList.push(node);
    } else if (!node.isExpanded && index > -1) {
      this.expandedNodeList.splice(index, 1);
    }
  }

  /**
   * check state
   * @param node
   */
  refreshCheckState(isCheckStrictly: boolean = false): void {
    if (isCheckStrictly) {
      return;
    }
    this.checkedNodeList.forEach(node => {
      this.conduct(node);
    });
  }

  conduct(node: NzTreeNode): void {
    const isChecked = node.isChecked;
    if (node) {
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
    // 全禁用节点不选中
    if (parentNode) {
      if (!isCheckDisabled(parentNode)) {
        if (parentNode.getChildren().every(child => isCheckDisabled(child) || (!child.isHalfChecked && child.isChecked))) {
          parentNode.setChecked(true);
        } else if (parentNode.getChildren().some(child => child.isHalfChecked || child.isChecked)) {
          parentNode.setChecked(false, true);
        } else {
          parentNode.setChecked(false);
        }
      }
      this.conductUp(parentNode);
    }
  }

  /**
   * reset child check state
   */
  conductDown(node: NzTreeNode, value: boolean): void {
    if (!isCheckDisabled(node)) {
      node.setChecked(value);
      node.children.forEach(n => {
        this.conductDown(n, value);
      });
    }
  }

  /**
   * search value & expand node
   * should add expandlist
   */
  searchExpand(value: string): void {
    this.matchedNodeList = [];
    const expandedKeys = [];
    if (!isNotNil(value)) {
      return;
    }
    // to reset expandedNodeList
    const expandParent = (p: NzTreeNode) => {
      // expand parent node
      if (p.getParentNode()) {
        expandedKeys.push(p.getParentNode().key);
        expandParent(p.getParentNode());
      }
    };
    const searchChild = (n: NzTreeNode) => {
      if (value && n.title.includes(value)) {
        // match the node
        n.isMatched = true;
        this.matchedNodeList.push(n);
        // expand parentNode
        expandParent(n);
      } else {
        n.isMatched = false;
      }
      n.getChildren().forEach(child => {
        searchChild(child);
      });
    };
    this.rootNodes.forEach(child => {
      searchChild(child);
    });
    // expand matched keys
    this.calcExpandedKeys(expandedKeys, this.rootNodes);
  }

  /**
   * flush after delete node
   */
  afterRemove(node: NzTreeNode, removeSelf: boolean = true): void {
    let index: number;
    // to reset selectedNodeList & expandedNodeList
    const loopNode = (n: NzTreeNode) => {
      // remove selected node
      index = this.selectedNodeList.findIndex(v => v.key === n.key);
      if (index > -1) {
        this.selectedNodeList.splice(index, 1);
      }
      // remove expanded node
      index = this.expandedNodeList.findIndex(v => v.key === n.key);
      if (index > -1) {
        this.expandedNodeList.splice(index, 1);
      }
      // remove checked node
      index = this.checkedNodeList.findIndex(v => v.key === n.key);
      if (index > -1) {
        this.checkedNodeList.splice(index, 1);
      }

      if (n.getChildren()) {
        n.getChildren().forEach(child => {
          loopNode(child);
        });
      }
    };
    loopNode(node);
    if (removeSelf) {
      this.refreshCheckState(this.isCheckStrictly);
    }
  }

  /**
   * drag event
   */
  refreshDragNode(node: NzTreeNode): void {
    if (node.getChildren().length === 0) {
      // until root
      this.conductUp(node);
    } else {
      node.getChildren().forEach((child) => {
        this.refreshDragNode(child);
      });
    }
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

  calcDropPosition(event: DragEvent): number {
    const { clientY } = event;
    // to fix firefox undefined
    const { top, bottom, height } = event.srcElement ? event.srcElement.getBoundingClientRect() : (event.target as Element).getBoundingClientRect();
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
          if (this.selectedNode.getParentNode()) {
            this.resetNodeLevel(this.selectedNode.getParentNode());
          }
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
      case 'dblclick':
        Object.assign(emitStructure, { 'selectedKeys': this.selectedNodeList });
        Object.assign(emitStructure, { 'nodes': this.selectedNodeList });
        Object.assign(emitStructure, { 'keys': this.selectedNodeList.map(n => n.key) });
        break;
      case 'check':
        const checkedNodeList = this.getCheckedNodeList();
        Object.assign(emitStructure, { 'checkedKeys': checkedNodeList });
        Object.assign(emitStructure, { 'nodes': checkedNodeList });
        Object.assign(emitStructure, { 'keys': checkedNodeList.map(n => n.key) });
        break;
      case 'search':
        Object.assign(emitStructure, { 'matchedKeys': this.getMatchedNodeList() });
        Object.assign(emitStructure, { 'nodes': this.getMatchedNodeList() });
        Object.assign(emitStructure, { 'keys': this.getMatchedNodeList().map(n => n.key) });
        break;
      case 'expand':
        Object.assign(emitStructure, { 'nodes': this.expandedNodeList });
        Object.assign(emitStructure, { 'keys': this.expandedNodeList.map(n => n.key) });
        break;
    }
    return emitStructure;
  }

  ngOnDestroy(): void {
    this.$statusChange.complete();
    this.$statusChange = null;
  }

}
