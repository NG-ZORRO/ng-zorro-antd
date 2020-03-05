/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Directive, Input } from '@angular/core';

@Directive({
  selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
  host: {
    '[class.ant-table-cell-fix-right]': `nzRight !== null`,
    '[class.ant-table-cell-fix-left]': `nzLeft !== null`,
    '[class.ant-table-cell-fix-right-first]': `isFirstRight`,
    '[class.ant-table-cell-fix-left-last]': `isLastLeft`,
    '[style.position]': `'sticky'`,
    '[style.right]': 'nzRight',
    '[style.left]': 'nzLeft'
  }
})
export class NzFixedCellDirective {
  @Input() nzRight: string | null = null;
  @Input() nzLeft: string | null = null;
  @Input() colspan: number | null = null;
  isFirstRight = false;
  isLastLeft = false;
  setIsFirstRight(isRightFirst: boolean): void {
    if (this.isFirstRight !== isRightFirst) {
      this.isFirstRight = isRightFirst;
      this.cdr.markForCheck();
    }
  }
  setIsLastLeft(isLeftLast: boolean): void {
    if (this.isLastLeft !== isLeftLast) {
      this.isLastLeft = isLeftLast;
      this.cdr.markForCheck();
    }
  }
  setAutoLeftWidth(value: string): void {
    this.nzLeft = value;
    this.cdr.markForCheck();
  }
  setAutoRightWidth(value: string): void {
    this.nzRight = value;
    this.cdr.markForCheck();
  }
  constructor(private cdr: ChangeDetectorRef) {}
}
