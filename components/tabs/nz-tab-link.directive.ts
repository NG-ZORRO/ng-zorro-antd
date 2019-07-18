/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Optional, Self } from '@angular/core';
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
    @Optional() @Self() public routerLink?: RouterLink,
    @Optional() @Self() public routerLinkWithHref?: RouterLinkWithHref
  ) {}
}
