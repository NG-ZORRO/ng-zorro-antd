/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef } from '@angular/core';

/**
 * A patch directive to select the element of a component.
 */
@Directive({
  selector: '[nz-element]',
  exportAs: 'nzElement'
})
export class NzElementPatchDirective {
  constructor(public elementRef: ElementRef) {}
}
