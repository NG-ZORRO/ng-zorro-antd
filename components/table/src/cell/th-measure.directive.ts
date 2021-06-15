/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { isNil } from 'ng-zorro-antd/core/util';

@Directive({
  selector: 'th'
})
export class NzThMeasureDirective implements OnChanges {
  changes$ = new Subject();
  @Input() nzWidth: string | null = null;
  @Input() colspan: string | number | null = null;
  @Input() colSpan: string | number | null = null;
  @Input() rowspan: string | number | null = null;
  @Input() rowSpan: string | number | null = null;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { nzWidth, colspan, rowspan, colSpan, rowSpan } = changes;
    if (colspan || colSpan) {
      const col = this.colspan || this.colSpan;
      if (!isNil(col)) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', `${col}`);
      } else {
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'colspan');
      }
    }
    if (rowspan || rowSpan) {
      const row = this.rowspan || this.rowSpan;
      if (!isNil(row)) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'rowspan', `${row}`);
      } else {
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'rowspan');
      }
    }
    if (nzWidth || colspan) {
      this.changes$.next();
    }
  }
}
