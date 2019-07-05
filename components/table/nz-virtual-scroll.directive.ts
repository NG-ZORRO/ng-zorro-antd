/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nz-virtual-scroll]',
  exportAs: 'nzVirtualScroll'
})
export class NzVirtualScrollDirective {
  /* tslint:disable-next-line:no-any */
  constructor(public templateRef: TemplateRef<{ $implicit: any; index: number }>) {}
}
