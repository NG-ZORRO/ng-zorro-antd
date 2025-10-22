/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, inject, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { isNil } from 'ng-zorro-antd/core/util';

@Directive({
  selector: 'th'
})
export class NzThMeasureDirective implements OnChanges {
  private renderer = inject(Renderer2);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  changes$ = new Subject<void>();
  @Input() nzWidth: string | null = null;
  @Input() colspan: string | number | null = null;
  @Input() colSpan: string | number | null = null;
  @Input() rowspan: string | number | null = null;
  @Input() rowSpan: string | number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    const { nzWidth, colspan, rowspan, colSpan, rowSpan } = changes;
    if (colspan || colSpan) {
      const col = this.colspan || this.colSpan;
      if (!isNil(col)) {
        this.renderer.setAttribute(this.el, 'colspan', `${col}`);
      } else {
        this.renderer.removeAttribute(this.el, 'colspan');
      }
    }
    if (rowspan || rowSpan) {
      const row = this.rowspan || this.rowSpan;
      if (!isNil(row)) {
        this.renderer.setAttribute(this.el, 'rowspan', `${row}`);
      } else {
        this.renderer.removeAttribute(this.el, 'rowspan');
      }
    }
    if (nzWidth || colspan) {
      this.changes$.next();
    }
  }
}
