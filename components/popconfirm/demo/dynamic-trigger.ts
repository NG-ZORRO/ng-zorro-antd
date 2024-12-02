import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-popconfirm-dynamic-trigger',
  imports: [FormsModule, NzPopconfirmModule, NzSwitchModule],
  template: `
    <a
      nz-popconfirm
      nzPopconfirmTitle="Are you sure delete this task?"
      [nzCondition]="switchValue"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
    >
      Delete a task
    </a>
    <br />
    <br />
    Whether directly execute:
    <nz-switch [(ngModel)]="switchValue"></nz-switch>
  `
})
export class NzDemoPopconfirmDynamicTriggerComponent {
  switchValue = false;

  constructor(private nzMessageService: NzMessageService) {}

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }
}
