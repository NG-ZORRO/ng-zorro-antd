/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, inject } from '@angular/core';

/** Element that can be used as the connection point for an autocomplete panel. */
@Directive({
  selector: '[nzAutocompleteOrigin]',
  exportAs: 'nzAutocompleteOrigin'
})
export class NzAutocompleteOriginDirective {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
