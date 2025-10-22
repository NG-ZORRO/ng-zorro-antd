/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { Directive, forwardRef } from '@angular/core';

@Directive({
  selector: '[nzTreeNodeOutlet]',
  providers: [
    {
      provide: CdkTreeNodeOutlet,
      useExisting: forwardRef(() => NzTreeNodeOutletDirective)
    }
  ]
})
export class NzTreeNodeOutletDirective extends CdkTreeNodeOutlet {}
