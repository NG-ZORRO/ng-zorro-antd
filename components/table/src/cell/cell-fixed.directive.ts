/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
  host: {
    '[class.ant-table-cell-fix-right]': `isFixedRight`,
    '[class.ant-table-cell-fix-left]': `isFixedLeft`,
    '[style.position]': `isFixed? 'sticky' : null`
  }
})
export class NzCellFixedDirective implements OnChanges {
  @Input() nzRight: string | boolean = false;
  @Input() nzLeft: string | boolean = false;
  @Input() colspan: number | null = null;
  changes$ = new Subject<void>();
  isAutoLeft = false;
  isAutoRight = false;
  isFixedLeft = false;
  isFixedRight = false;
  isFixed = false;

  setAutoLeftWidth(autoLeft: string | null): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
  }

  setAutoRightWidth(autoRight: string | null): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
  }

  setIsFirstRight(isFirstRight: boolean): void {
    this.setFixClass(isFirstRight, 'ant-table-cell-fix-right-first');
  }

  setIsLastLeft(isLastLeft: boolean): void {
    this.setFixClass(isLastLeft, 'ant-table-cell-fix-left-last');
  }

  private setFixClass(flag: boolean, className: string): void {
    // the setFixClass function may call many times, so remove it first.
    this.renderer.removeClass(this.elementRef.nativeElement, className);

    if (flag) {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    }
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(): void {
    this.setIsFirstRight(false);
    this.setIsLastLeft(false);
    this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
    this.isAutoRight = this.nzRight === '' || this.nzRight === true;
    this.isFixedLeft = this.nzLeft !== false;
    this.isFixedRight = this.nzRight !== false;
    this.isFixed = this.isFixedLeft || this.isFixedRight;
    const validatePx = (value: string | boolean): string | null => {
      if (typeof value === 'string' && value !== '') {
        return value;
      } else {
        return null;
      }
    };
    this.setAutoLeftWidth(validatePx(this.nzLeft));
    this.setAutoRightWidth(validatePx(this.nzRight));
    this.changes$.next();
  }
}
