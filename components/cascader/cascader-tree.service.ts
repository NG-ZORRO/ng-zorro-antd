/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

import { NzCascaderOption } from 'ng-zorro-antd/cascader/typings';
import { NzTreeBaseService, NzTreeNode, NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
import { arraysEqual } from 'ng-zorro-antd/core/util';

interface InternalFieldNames extends Required<Pick<NzCascaderOption, 'label' | 'value'>> {}

@Injectable()
export class NzCascaderTreeService extends NzTreeBaseService {
  fieldNames: InternalFieldNames = {
    label: 'label',
    value: 'value'
  };

  override treeNodePostProcessor = (node: NzTreeNode): void => {
    // if (node.parentNode) {
    //   // node.key = toPathKey([node.parentNode.key, node.origin[this.fieldNames.value]]);
    // } else {
    //   node.key = toPathKey([node.origin[this.fieldNames.value]]);
    // }
    node.key = node.origin[this.fieldNames.value];
    node.title = node.origin[this.fieldNames.label];
  };

  constructor() {
    super();
  }

  toOption(option: NzTreeNode): NzCascaderOption {
    return option.origin;
  }

  toOptions(options: NzTreeNode[]): NzCascaderOption[] {
    return options.map(option => this.toOption(option));
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
    const calc = (nodes: NzTreeNode[]): void => {
      nodes.forEach(node => {
        if (paths === null) {
          // render tree if no default checked keys found
          node.isChecked = !!node.origin.checked;
        } else {
          // if node is in checked path
          const nodePath = this.getAncestorNodeList(node).map(n => n.key);
          if (paths.some(keys => arraysEqual(nodePath, keys))) {
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

  conductSelectedPaths(paths: NzTreeNodeKey[][], isMulti: boolean): void {
    this.selectedNodeList.forEach(node => (node.isSelected = false));
    this.selectedNodeList = [];
    const calc = (nodes: NzTreeNode[]): boolean =>
      nodes.every(node => {
        // if node is in selected path
        const nodePath = this.getAncestorNodeList(node).map(n => n.key);
        if (paths.some(keys => arraysEqual(nodePath, keys))) {
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
}
