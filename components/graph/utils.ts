/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzGraphEdge, NzGraphGroupNode, NzGraphNode } from './interface';

export function flattenNodes(renderInfo: NzGraphGroupNode): Array<NzGraphGroupNode | NzGraphNode> {
  const nodes: Array<NzGraphNode | NzGraphGroupNode> = [];
  let edges: NzGraphEdge[] = [];
  const dig = (node: NzGraphGroupNode | NzGraphNode): void => {
    nodes.push(node);
    if (node.type === 0) {
      edges = edges.concat(node.edges);
      (node as NzGraphGroupNode).nodes.forEach(n => dig(n));
    }
  };
  dig(renderInfo);
  return [...nodes];
}
