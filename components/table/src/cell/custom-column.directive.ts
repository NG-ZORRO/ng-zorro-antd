/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DestroyRef, Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzTableDataService } from '../table-data.service';

@Directive({
  selector: 'td[nzCellControl],th[nzCellControl]'
})
export class NzCustomColumnDirective<T> implements OnInit {
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private renderer = inject(Renderer2);
  private nzTableDataService = inject(NzTableDataService<T>);
  private destroyRef = inject(DestroyRef);

  @Input() nzCellControl: string | null = null;

  ngOnInit(): void {
    this.nzTableDataService.listOfCustomColumn$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(item => {
      item.forEach((v, i) => {
        if (v.value === this.nzCellControl) {
          this.renderer.setStyle(this.el, 'display', v.default ? 'block' : 'none');
          this.renderer.setStyle(this.el, 'order', i);
          this.renderer.setStyle(this.el, 'flex', v.fixWidth ? `1 0 ${v.width}px` : `1 1 ${v.width}px`);
        }
      });
    });
  }
}
