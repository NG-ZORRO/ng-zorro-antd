import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-popconfirm-basic',
  template: `
    <a
      nz-popconfirm
      nzPopconfirmTitle="Are you sure delete this task?"
      nzPopconfirmPlacement="bottom"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
      >Delete</a
    >
  `
})
export class NzDemoPopconfirmBasicComponent {
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  constructor(private nzMessageService: NzMessageService) {}
}
