/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Directive, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
  host: {
    '[class.ant-table-cell-fix-right]': `rightPx`,
    '[class.ant-table-cell-fix-left]': `leftPx`,
    '[class.ant-table-cell-fix-right-first]': `isFirstRight`,
    '[class.ant-table-cell-fix-left-last]': `isLastLeft`,
    '[style.position]': `isFixed? 'sticky' : null`,
    '[style.right]': `rightPx`,
    '[style.left]': `leftPx`
  }
})
export class NzFixedCellDirective implements OnChanges {
  @Input() nzRight: string | boolean = false;
  @Input() nzLeft: string | boolean = false;
  @Input() colspan: number | null = null;
  changes$ = new Subject<void>();
  isFirstRight = false;
  isLastLeft = false;
  isAutoLeft = false;
  isAutoRight = false;
  isFixed = false;
  leftPx: string | null = null;
  rightPx: string | null = null;

  setIsFirstRight(isRightFirst: boolean): void {
    this.isFirstRight = isRightFirst;
    this.cdr.markForCheck();
  }

  setIsLastLeft(isLeftLast: boolean): void {
    this.isLastLeft = isLeftLast;
    this.cdr.markForCheck();
  }

  setAutoLeftWidth(autoLeft: string): void {
    this.leftPx = autoLeft;
    this.cdr.markForCheck();
  }

  setAutoRightWidth(autoRight: string): void {
    this.rightPx = autoRight;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.isFirstRight = false;
    this.isLastLeft = false;
    this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
    this.isAutoRight = this.nzRight === '' || this.nzRight === true;
    this.isFixed = this.nzRight !== false || this.nzLeft !== false;
    const validatePx = (value: string | boolean): string | null => {
      if (typeof value === 'string' && value !== '') {
        return value;
      } else {
        return null;
      }
    };
    this.leftPx = validatePx(this.nzLeft);
    this.rightPx = validatePx(this.nzRight);
    this.changes$.next();
  }
}
