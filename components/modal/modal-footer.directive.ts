/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Optional, TemplateRef } from '@angular/core';
import { NzModalRef } from './modal-ref';

@Directive({
  selector: '[nzModalFooter]',
  exportAs: 'nzModalFooter'
})
export class NzModalFooterDirective {
  constructor(@Optional() private nzModalRef: NzModalRef, public templateRef: TemplateRef<{}>) {
    if (this.nzModalRef) {
      this.nzModalRef.updateConfig({
        nzFooter: this.templateRef
      });
    }
  }
}
