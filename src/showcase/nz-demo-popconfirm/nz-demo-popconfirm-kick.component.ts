import { Component } from '@angular/core';
import { NzMessageService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-popconfirm-kick',
  template: `
    <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" [nzCondition]="switchValue" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">
      <a nz-popconfirm>删除某任务</a>
    </nz-popconfirm>
    <br>
    <br>
    点击是否直接执行
    <nz-switch [(ngModel)]="switchValue"></nz-switch>
  `
})

export class NzDemoPopconfirmKickComponent {
  switchValue = false;

  cancel = function () {
    this.message.info('click cancel');

  }

  confirm = () => {
    this.message.info('click confirm');

  }

  constructor(private message: NzMessageService) {

  }
}
