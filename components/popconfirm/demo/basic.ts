import { Component } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'nz-demo-popconfirm-basic',
  imports: [NzPopconfirmModule],
  template: `
    <a
      nz-popconfirm
      nzPopconfirmTitle="Are you sure delete this task?"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
    >
      Delete
    </a>
  `
})
export class NzDemoPopconfirmBasicComponent {
  constructor(private nzMessageService: NzMessageService) {}

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }
}
