import { Directive, Optional, TemplateRef } from '@angular/core';
import { NzModalRef } from './nz-modal-ref.class';

@Directive({
  selector: '[nzModalFooter]'
})
export class NzModalFooterDirective {

  constructor(@Optional() private nzModalRef: NzModalRef,
              // tslint:disable-next-line:no-any
              public templateRef: TemplateRef<any>) {
    if (this.nzModalRef) {
      this.nzModalRef.getInstance().nzFooter = this.templateRef;
    }
  }

}
