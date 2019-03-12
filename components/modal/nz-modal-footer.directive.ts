import { Directive, Optional, TemplateRef } from '@angular/core';
import { NzModalRef } from './nz-modal-ref.class';

@Directive({
  selector: '[nzModalFooter]'
})
export class NzModalFooterDirective {

  constructor(@Optional() private nzModalRef: NzModalRef,
              public templateRef: TemplateRef<void>) {
    if (this.nzModalRef) {
      this.nzModalRef.getInstance().nzFooter = this.templateRef;
    }
  }

}
