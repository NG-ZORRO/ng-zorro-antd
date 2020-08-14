/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Host, Optional, Self, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

import { warnDeprecation } from 'ng-zorro-antd/core/logger';

/**
 * Fix https://github.com/angular/angular/issues/8563
 */
@Directive({
  selector: 'ng-template[nzTabLink]',
  exportAs: 'nzTabLinkTemplate'
})
export class NzTabLinkTemplateDirective {
  constructor(@Host() public templateRef: TemplateRef<void>) {}
}

/**
 * This component is for catching `routerLink` directive.
 */
@Directive({
  selector: 'a[nz-tab-link]',
  exportAs: 'nzTabLink'
})
export class NzTabLinkDirective {
  constructor(
    @Optional() @Self() public routerLink?: RouterLink,
    @Optional() @Self() public routerLinkWithHref?: RouterLinkWithHref,
    @Optional() nzTabLinkTemplateDirective?: NzTabLinkTemplateDirective
  ) {
    if (!nzTabLinkTemplateDirective) {
      warnDeprecation(`'a[nz-tab-link]' is deprecated. Please use 'ng-template[nzTabLink] > a[nz-tab-link]' instead.`);
    }
  }
}
