import { Component } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'nz-demo-popconfirm-locale',
  imports: [NzPopconfirmModule],
  template: `
    <a
      nz-popconfirm
      nzPopconfirmTitle="Are you sure?"
      nzOkText="ok"
      nzCancelText="cancel"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
    >
      delete
    </a>
  `
})
export class NzDemoPopconfirmLocaleComponent {
  constructor(private nzMessageService: NzMessageService) {}

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }
}
