/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, TemplateRef, inject } from '@angular/core';

import { NzModalRef } from './modal-ref';

@Directive({
  selector: '[nzModalTitle]',
  exportAs: 'nzModalTitle'
})
export class NzModalTitleDirective {
  private nzModalRef = inject(NzModalRef, { optional: true });

  constructor(public templateRef: TemplateRef<{}>) {
    if (this.nzModalRef) {
      this.nzModalRef.updateConfig({
        nzTitle: this.templateRef
      });
    }
  }
}
