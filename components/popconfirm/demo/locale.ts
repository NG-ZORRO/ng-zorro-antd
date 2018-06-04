import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-popconfirm-locale',
  template: `
    <a nz-popconfirm nzTitle="Are you sure?" nzOkText="ok" nzCancelText="cancel" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">delete</a>
  `
})

export class NzDemoPopconfirmLocaleComponent {

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  constructor(private nzMessageService: NzMessageService) {

  }
}
