/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Directive, Input } from '@angular/core';

@Directive({
  selector: 'td[nzLeft],th[nzLeft]',
  host: {
    '[class.ant-table-cell-fix-left]': `true`,
    '[class.ant-table-cell-fix-left-last]': `isLastLeft`,
    '[style.position]': `'sticky'`,
    '[style.left]': 'nzLeft'
  }
})
export class NzFixedLeftCellDirective {
  @Input() nzLeft: string | null = null;
  isLastLeft = false;
  setIsLastLeft(isLeftLast: boolean): void {
    if (this.isLastLeft !== isLeftLast) {
      this.isLastLeft = isLeftLast;
      this.cdr.markForCheck();
    }
  }
  constructor(private cdr: ChangeDetectorRef) {}
}
