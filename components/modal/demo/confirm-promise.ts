import { Component } from '@angular/core';
import { NzModal, NzModalRef2 } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-confirm-promise',
  template: `
    <button nz-button nzType="info" (click)="showConfirm()">Confirm</button>
  `
})
export class NzDemoModalConfirmPromiseComponent {
  confirmModal: NzModalRef2; // For testing by now

  constructor(private modal: NzModal) {}

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
