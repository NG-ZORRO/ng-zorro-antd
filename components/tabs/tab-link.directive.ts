/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Host, Optional, Self, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TabTemplateContext } from './interfaces';

/**
 * Fix https://github.com/angular/angular/issues/8563
 */
@Directive({
  selector: 'ng-template[nzTabLink]',
  exportAs: 'nzTabLinkTemplate'
})
export class NzTabLinkTemplateDirective {
  constructor(@Host() public templateRef: TemplateRef<TabTemplateContext>) {}
}

/**
 * This component is for catching `routerLink` directive.
 */
@Directive({
  selector: 'a[nz-tab-link]',
  exportAs: 'nzTabLink'
})
export class NzTabLinkDirective {
  constructor(public elementRef: ElementRef<HTMLAnchorElement>, @Optional() @Self() public routerLink?: RouterLink) {}
}
