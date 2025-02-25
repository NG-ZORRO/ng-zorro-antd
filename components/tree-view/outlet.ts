/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CDK_TREE_NODE_OUTLET_NODE, CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { Directive, ViewContainerRef, forwardRef, inject } from '@angular/core';

@Directive({
  selector: '[nzTreeNodeOutlet]',
  providers: [
    {
      provide: CdkTreeNodeOutlet,
      useExisting: forwardRef(() => NzTreeNodeOutletDirective)
    }
  ]
})
export class NzTreeNodeOutletDirective implements CdkTreeNodeOutlet {
  _node = inject(CDK_TREE_NODE_OUTLET_NODE, { optional: true });

  constructor(public viewContainer: ViewContainerRef) {}
}
