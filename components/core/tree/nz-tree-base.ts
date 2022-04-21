/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTreeNode } from './nz-tree-base-node';
import { NzTreeBaseService } from './nz-tree-base.service';

export class NzTreeBase {
  constructor(public nzTreeService: NzTreeBaseService) {}

  /**
   * Coerces a value({@link any[]}) to a TreeNodes({@link NzTreeNode[]})
   */
  coerceTreeNodes(value: NzSafeAny[]): NzTreeNode[] {
    let nodes: NzTreeNode[] = [];
    if (!this.nzTreeService.isArrayOfNzTreeNode(value)) {
      // has not been new NzTreeNode
      nodes = value.map(item => new NzTreeNode(item, null, this.nzTreeService));
    } else {
      nodes = value.map((item: NzTreeNode) => {
        item.service = this.nzTreeService;
        return item;
      });
    }
    return nodes;
  }

  /**
   * Get all nodes({@link NzTreeNode})
   */
  getTreeNodes(): NzTreeNode[] {
    return this.nzTreeService.rootNodes;
  }

  /**
   * Get {@link NzTreeNode} with key
   */
  getTreeNodeByKey(key: string): NzTreeNode | null {
    // flat tree nodes
    const nodes: NzTreeNode[] = [];
    const getNode = (node: NzTreeNode): void => {
      nodes.push(node);
      node.getChildren().forEach(n => {
        getNode(n);
      });
    };
    this.getTreeNodes().forEach(n => {
      getNode(n);
    });
    return nodes.find(n => n.key === key) || null;
  }

  /**
   * Get checked nodes(merged)
   */
  getCheckedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getCheckedNodeList();
  }

  /**
   * Get selected nodes
   */
  getSelectedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getSelectedNodeList();
  }

  /**
   * Get half checked nodes
   */
  getHalfCheckedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getHalfCheckedNodeList();
  }

  /**
   * Get expanded nodes
   */
  getExpandedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getExpandedNodeList();
  }

  /**
   * Get matched nodes(if nzSearchValue is not null)
   */
  getMatchedNodeList(): NzTreeNode[] {
    return this.nzTreeService.getMatchedNodeList();
  }
}
