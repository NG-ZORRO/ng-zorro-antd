/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';

export interface NzGraphBaseSource<T, K> {
  /** The saved graph nodes data for `expandAll` action. */
  dataSource: T;

  /** The expansion model */
  expansionModel: SelectionModel<K>;

  /** Whether the data node is expanded or collapsed. Return true if it's expanded. */
  isExpanded(dataNode: K): boolean;

  /** Expand or collapse data node */
  toggle(dataNode: K): void;

  /** Expand one data node */
  expand(dataNode: K): void;

  /** Collapse one data node */
  collapse(dataNode: K): void;

  /** Expand all the dataNodes in the tree */
  expandAll(): void;

  /** Collapse all the dataNodes in the tree */
  collapseAll(): void;
}
