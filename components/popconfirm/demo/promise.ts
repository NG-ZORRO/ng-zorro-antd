import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'nz-demo-popconfirm-promise',
  imports: [NzButtonModule, NzPopconfirmModule],
  template: `
    <button
      nz-button
      nzType="primary"
      nz-popconfirm
      nzPopconfirmTitle="Title"
      [nzBeforeConfirm]="beforeConfirm"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
    >
      Open Popconfirm with Promise
    </button>
  `
})
export class NzDemoPopconfirmPromiseComponent {
  constructor(private nzMessageService: NzMessageService) {}

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  beforeConfirm(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  }
}
