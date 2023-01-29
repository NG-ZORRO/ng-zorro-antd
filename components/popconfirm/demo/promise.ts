import { Component } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-popconfirm-promise',
  template: `
    <button
      nz-popconfirm
      nzPopconfirmTitle="Title"
      [nzBeforeConfirm]="beforeConfirm"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
      nz-button
      nzType="primary"
    >
      Open Popconfirm with Promise
    </button>
  `
})
export class NzDemoPopconfirmPromiseComponent {
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

  constructor(private nzMessageService: NzMessageService) {}
}
