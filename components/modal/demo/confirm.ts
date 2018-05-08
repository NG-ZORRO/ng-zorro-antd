import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-modal-confirm',
  template: `
    <button nz-button nzType="info" (click)="showConfirm()">Confirm</button>
    <button nz-button nzType="dashed" (click)="showDeleteConfirm()">Delete</button>
  `,
  styles  : [
      `button {
      margin-right: 8px;
    }`
  ]
})
export class NzDemoModalConfirmComponent {
  constructor(private modalService: NzModalService) {
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOnOk   : () => console.log('OK')
    });
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle     : 'Are you sure delete this task?',
      nzContent   : '<b style="color: red;">Some descriptions</b>',
      nzOkText    : 'Yes',
      nzOkType    : 'danger',
      nzOnOk      : () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel  : () => console.log('Cancel')
    });
  }
}
