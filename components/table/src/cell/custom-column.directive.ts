/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzTableDataService } from '../table-data.service';

@Directive({
  selector: 'td[nzCellControl],th[nzCellControl]'
})
export class NzCustomColumnDirective<T> implements OnInit, OnDestroy {
  @Input() nzCellControl: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private nzTableDataService: NzTableDataService<T>
  ) {}

  ngOnInit(): void {
    this.nzTableDataService.listOfCustomColumn$.pipe(takeUntil(this.destroy$)).subscribe(item => {
      if (item.length) {
        item.forEach((v, i) => {
          if (v.value === this.nzCellControl) {
            if (!v.default) {
              this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
            } else {
              this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
            }
            this.renderer.setStyle(this.el.nativeElement, 'order', i);
            if (!v?.fixWidth) {
              this.renderer.setStyle(this.el.nativeElement, 'flex', `1 1 ${v.width}px`);
            } else {
              this.renderer.setStyle(this.el.nativeElement, 'flex', `1 0 ${v.width}px`);
            }
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
