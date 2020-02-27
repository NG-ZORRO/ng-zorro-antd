/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'td[nzRight],th[nzRight]',
  host: {
    '[class.ant-table-cell-fix-right]': `true`,
    '[class.ant-table-cell-fix-right-first]': `isFirstRight`,
    '[style.position]': `'sticky'`,
    '[style.right]': 'nzRight'
  }
})
export class NzFixedRightCellDirective {
  @Input() nzRight: string | null = null;
  changes$ = new Subject<void>();
  isFirstRight = false;
  setIsFirstRight(isRightFirst: boolean): void {
    if (this.isFirstRight !== isRightFirst) {
      this.isFirstRight = isRightFirst;
      this.cdr.markForCheck();
    }
  }
  constructor(private cdr: ChangeDetectorRef) {}
}
