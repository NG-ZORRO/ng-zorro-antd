/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, inject } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * A patch directive to select the element of a component.
 */
@Directive({
  selector: '[nzElement], [nz-element]',
  exportAs: 'nzElement'
})
export class NzElementPatchDirective {
  public elementRef = inject(ElementRef<HTMLElement>);
  get nativeElement(): NzSafeAny {
    return this.elementRef.nativeElement;
  }
}
