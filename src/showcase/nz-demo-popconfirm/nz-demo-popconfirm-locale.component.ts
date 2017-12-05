import { Component } from '@angular/core';
import { NzMessageService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-popconfirm-locale',
  template: `
    <nz-popconfirm [nzTitle]="'Are you sure？'" [nzOkText]="'ok'" [nzCancelText]="'cancel'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">
      <a nz-popconfirm>delete</a>
    </nz-popconfirm>
  `
})

export class NzDemoPopconfirmLocalComponent {
  constructor(private message: NzMessageService) {
  }

  cancel = function () {
    this.message.info('click cancel');
  };

  confirm = () => {
    this.message.info('click confirm')
  };
}
