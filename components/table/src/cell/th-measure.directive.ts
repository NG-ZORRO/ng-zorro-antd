/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { isNil } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';

@Directive({
  selector: 'th'
})
export class NzThMeasureDirective implements OnChanges {
  changes$ = new Subject();
  @Input() nzWidth: string | null = null;
  @Input() colspan: string | number | null = null;
  @Input() rowspan: string | number | null = null;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { nzWidth, colspan, rowspan } = changes;
    if (colspan) {
      if (!isNil(this.colspan)) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', `${this.colspan}`);
      } else {
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'colspan');
      }
    }
    if (rowspan) {
      if (!isNil(this.rowspan)) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'rowspan', `${this.rowspan}`);
      } else {
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'rowspan');
      }
    }
    if (nzWidth || colspan) {
      this.changes$.next();
    }
  }
}
