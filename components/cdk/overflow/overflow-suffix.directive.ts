/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Directive, ElementRef, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';

@Directive({
  selector: '[nzOverflowSuffix]',
  host: {
    '[style]': 'suffixStyle'
  }
})
export class NzOverflowSuffixDirective {
  private nzResizeObserver = inject(NzResizeObserver);
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  suffixStyle = {};
  suffixWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(
    map(([item]) => (item.target as HTMLElement).offsetWidth),
    tap(width => (this.suffixWidth = width))
  );
  suffixWidth = 0;

  setSuffixStyle(start: number | null, order: number): void {
    if (start !== null) {
      this.suffixStyle = {
        position: 'absolute',
        left: `${start}px`,
        top: 0,
        opacity: 1,
        order: order
      };
    } else {
      this.suffixStyle = {
        opacity: 1,
        order: order
      };
    }
    this.cdr.detectChanges();
  }
}
