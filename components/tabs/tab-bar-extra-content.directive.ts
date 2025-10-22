/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  // TODO: Remove `nz-tabset` in 21.0.0
  selector: '[nzTabBarExtraContent]:not(nz-tabset):not(nz-tabs)'
})
export class NzTabBarExtraContentDirective {
  readonly position = input<'start' | 'end'>('end', { alias: 'nzTabBarExtraContent' });
  readonly templateRef = inject(TemplateRef);
}
