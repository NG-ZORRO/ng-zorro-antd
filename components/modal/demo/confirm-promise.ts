import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-confirm-promise',
  imports: [NzButtonModule, NzModalModule],
  template: `<button nz-button nzType="primary" (click)="showConfirm()">Confirm</button>`
})
export class NzDemoModalConfirmPromiseComponent {
  private readonly modalService = inject(NzModalService);

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
