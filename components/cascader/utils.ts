/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzTreeNode } from 'ng-zorro-antd/core/tree';

export function isChildNode(node: NzTreeNode): boolean {
  return node.isLeaf || !node.children || !node.children.length;
}

export function isParentNode(node: NzTreeNode): boolean {
  return !!node.children && !!node.children.length && !node.isLeaf;
}
