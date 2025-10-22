/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, inject, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[nzDrawerContent]',
  exportAs: 'nzDrawerContent'
})
export class NzDrawerContentDirective {
  public templateRef = inject(TemplateRef<NzSafeAny>);
}
