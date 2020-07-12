/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Optional, Renderer2, Self } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

/**
 * This component is for catching `routerLink` directive.
 */
@Directive({
  selector: 'a[nz-tab-link]',
  exportAs: 'nzTabLink'
})
export class NzTabLinkDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() @Self() public routerLink?: RouterLink,
    @Optional() @Self() public routerLinkWithHref?: RouterLinkWithHref
  ) {}

  setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
    }
  }
}
