/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

import { NzTreeBaseService, NzTreeNode, NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { arraysEqual, isNotNil } from 'ng-zorro-antd/core/util';

import { NzCascaderOption } from './typings';

interface InternalFieldNames {
  label: string;
  value: string;
}

@Injectable()
export class NzCascaderTreeService extends NzTreeBaseService {
  fieldNames: InternalFieldNames = {
    label: 'label',
    value: 'value'
  };

  override treeNodePostProcessor = (node: NzTreeNode): void => {
    node.key = this.getOptionValue(node);
    node.title = this.getOptionLabel(node);
  };

  getOptionValue(node: NzTreeNode): NzSafeAny {
    return node.origin[this.fieldNames.value || 'value'];
  }

  getOptionLabel(node: NzTreeNode): string {
    return node.origin[this.fieldNames.label || 'label'];
  }

  get children(): NzTreeNode[] {
    return this.rootNodes;
  }

  set children(value: Array<NzTreeNode | NzSafeAny>) {
    this.rootNodes = value.map(v => (v instanceof NzTreeNode ? v : new NzTreeNode(v, null)));
  }

  /**
   * Map list of nodes to list of option
   */
  toOptions(nodes: NzTreeNode[]): NzCascaderOption[] {
    return nodes.map(node => node.origin);
  }

  getAncestorNodeList(node: NzTreeNode | null): NzTreeNode[] {
    if (!node) {
      return [];
    }
    if (node.parentNode) {
      return [...this.getAncestorNodeList(node.parentNode), node];
    }
    return [node];
  }

  /**
   * Render by nzCheckedKeys
   * When keys equals null, just render with checkStrictly
   *
   * @param paths
   * @param checkStrictly
   */
  conductCheckPaths(paths: NzTreeNodeKey[][] | null, checkStrictly: boolean): void {
    this.checkedNodeList = [];
    this.halfCheckedNodeList = [];
    const existsPathList: NzTreeNodeKey[][] = [];
    const calc = (nodes: NzTreeNode[]): void => {
      nodes.forEach(node => {
        if (paths === null) {
          // render tree if no default checked keys found
          node.isChecked = !!node.origin.checked;
        } else {
          // if node is in checked path
          const nodePath = this.getAncestorNodeList(node).map(n => this.getOptionValue(n));
          if (paths.some(keys => arraysEqual(nodePath, keys))) {
            node.isChecked = true;
            node.isHalfChecked = false;
            existsPathList.push(nodePath);
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
    // handle missing node
    this.handleMissingNodeList(paths, existsPathList);
  }

  conductSelectedPaths(paths: NzTreeNodeKey[][]): void {
    this.selectedNodeList.forEach(node => (node.isSelected = false));
    this.selectedNodeList = [];
    const existsPathList: NzTreeNodeKey[][] = [];
    const calc = (nodes: NzTreeNode[]): boolean =>
      nodes.every(node => {
        // if node is in selected path
        const nodePath = this.getAncestorNodeList(node).map(n => this.getOptionValue(n));
        if (paths.some(keys => arraysEqual(nodePath, keys))) {
          node.isSelected = true;
          this.setSelectedNodeList(node);
          existsPathList.push(nodePath);
          return false;
        } else {
          node.isSelected = false;
        }
        if (node.children.length > 0) {
          return calc(node.children);
        }
        return true;
      });
    calc(this.rootNodes);
    this.handleMissingNodeList(paths, existsPathList);
  }

  private handleMissingNodeList(paths: NzTreeNodeKey[][] | null, existsPathList: NzTreeNodeKey[][]): void {
    const missingNodeList = this.getMissingNodeList(paths, existsPathList);
    missingNodeList.forEach(node => {
      this.setSelectedNodeList(node);
    });
  }

  private getMissingNodeList(paths: NzTreeNodeKey[][] | null, existsPathList: NzTreeNodeKey[][]): NzTreeNode[] {
    if (!paths) {
      return [];
    }
    return paths
      .filter(path => !existsPathList.some(keys => arraysEqual(path, keys)))
      .map(path => this.createMissingNode(path))
      .filter(isNotNil);
  }

  private createMissingNode(path: NzTreeNodeKey[]): NzTreeNode | null {
    if (!path?.length) {
      return null;
    }

    const createOption = (key: NzTreeNodeKey): NzSafeAny => {
      return {
        [this.fieldNames.value || 'value']: key,
        [this.fieldNames.label || 'label']: key
      };
    };

    let node = new NzTreeNode(createOption(path[0]), null, this);

    for (let i = 1; i < path.length; i++) {
      const childNode = new NzTreeNode(createOption(path[i]));
      node.addChildren([childNode]);
      node = childNode;
    }

    if (this.isMultiple) {
      node.isChecked = true;
      node.isHalfChecked = false;
    } else {
      node.isSelected = true;
    }
    return node;
  }
}
