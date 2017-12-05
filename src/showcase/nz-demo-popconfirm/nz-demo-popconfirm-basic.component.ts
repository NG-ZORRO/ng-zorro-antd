import { Component } from '@angular/core';
import { NzMessageService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-popconfirm-basic',
  template: `
    <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">
      <a nz-popconfirm>删除</a>
    </nz-popconfirm>
  `
})
export class NzDemoPopconfirmBasicComponent {
  constructor(private message: NzMessageService) {

  }

  cancel = function () {
    this.message.info('click cancel')
  };

  confirm = () => {
    this.message.info('click confirm')
  };

}
