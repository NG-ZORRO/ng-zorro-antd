/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, inject, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[nz-virtual-scroll]',
  exportAs: 'nzVirtualScroll'
})
export class NzTableVirtualScrollDirective<T> {
  templateRef: TemplateRef<{ $implicit: T; index: number }> = inject(TemplateRef);

  static ngTemplateContextGuard<T>(
    _dir: NzTableVirtualScrollDirective<T>,
    _ctx: NzSafeAny
  ): _ctx is { $implicit: T; index: number } {
    return true;
  }
}
