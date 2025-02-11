/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TreeControl } from '@angular/cdk/tree';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { NzTreeView } from './tree';

export class NzTreeFlattener<T, F, K = F> {
  constructor(
    public transformFunction: (node: T, level: number) => F,
    public getLevel: (node: F) => number,
    public isExpandable: (node: F) => boolean,
    public getChildren: (node: T) => Observable<T[]> | T[] | undefined | null
  ) {}

  private flattenNode(node: T, level: number, resultNodes: F[], parentMap: boolean[]): F[] {
    const flatNode = this.transformFunction(node, level);
    resultNodes.push(flatNode);

    if (this.isExpandable(flatNode)) {
      const childrenNodes = this.getChildren(node);
      if (childrenNodes) {
        if (Array.isArray(childrenNodes)) {
          this.flattenChildren(childrenNodes, level, resultNodes, parentMap);
        } else {
          childrenNodes.pipe(take(1)).subscribe(children => {
            this.flattenChildren(children, level, resultNodes, parentMap);
          });
        }
      }
    }
    return resultNodes;
  }

  private flattenChildren(children: T[], level: number, resultNodes: F[], parentMap: boolean[]): void {
    children.forEach((child, index) => {
      const childParentMap: boolean[] = parentMap.slice();
      childParentMap.push(index !== children.length - 1);
      this.flattenNode(child, level + 1, resultNodes, childParentMap);
    });
  }

  /**
   * Flatten a list of node type T to flattened version of node F.
   * Please note that type T may be nested, and the length of `structuredData` may be different
   * from that of returned list `F[]`.
   */
  flattenNodes(structuredData: T[]): F[] {
    const resultNodes: F[] = [];
    structuredData.forEach(node => this.flattenNode(node, 0, resultNodes, []));
    return resultNodes;
  }

  /**
   * Expand flattened node with current expansion status.
   * `tree` parameter must have the `isExpand` method
   * The returned list may have different length.
   */
  expandFlattenedNodes(nodes: F[], tree: TreeControl<F, K>): F[];
  expandFlattenedNodes(nodes: F[], tree: NzTreeView<F, K>): F[];
  expandFlattenedNodes(nodes: F[], tree: TreeControl<F, K> | NzTreeView<F, K>): F[] {
    const results: F[] = [];
    const currentExpand: boolean[] = [];
    currentExpand[0] = true;

    nodes.forEach(node => {
      let expand = true;
      for (let i = 0; i <= this.getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (this.isExpandable(node)) {
        currentExpand[this.getLevel(node) + 1] = tree?.isExpanded(node) ?? false;
      }
    });
    return results;
  }
}
