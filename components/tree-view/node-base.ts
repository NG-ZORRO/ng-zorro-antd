/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNode } from '@angular/cdk/tree';

export abstract class NzNodeBase<T> extends CdkTreeNode<T> {
  abstract setIndents(indents: boolean[]): void;
  abstract isLeaf: boolean;
}
