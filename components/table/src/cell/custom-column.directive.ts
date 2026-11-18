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
          // A numeric width uses a fixed flex-basis; 'auto' (or an omitted width)
          // lets the flex layout size the column to its content.
          const flexBasis = typeof v.width === 'number' ? `${v.width}px` : 'auto';
          this.renderer.setStyle(this.el, 'flex', v.fixWidth ? `1 0 ${flexBasis}` : `1 1 ${flexBasis}`);
        }
      });
    });
  }
}
