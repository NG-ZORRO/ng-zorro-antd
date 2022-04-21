/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Directive, ElementRef } from '@angular/core';
import { map, startWith, tap } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';

@Directive({
  selector: '[nzOverflowRest]',
  host: {
    '[style]': 'restStyle'
  }
})
export class NzOverflowRestDirective {
  restStyle: { [key: string]: string | number | undefined } | undefined = undefined;
  restWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(
    map(([item]) => (item.target as HTMLElement).offsetWidth),
    startWith(0),
    tap(width => (this.restWidth = width))
  );
  restWidth = 0;
  constructor(
    private nzResizeObserver: NzResizeObserver,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  setRestStyle(display: boolean, order: number): void {
    const mergedHidden = !display;
    this.restStyle = {
      opacity: mergedHidden ? 0 : 1,
      height: mergedHidden ? 0 : undefined,
      overflowY: mergedHidden ? 'hidden' : undefined,
      order: order,
      pointerEvents: mergedHidden ? 'none' : undefined,
      position: mergedHidden ? 'absolute' : undefined
    };
    this.cdr.detectChanges();
  }
}
