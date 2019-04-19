/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-popconfirm-dynamic-trigger',
  template: `
    <a
      nz-popconfirm
      nzTitle="Are you sure delete this task?"
      [nzCondition]="switchValue"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
      >Delete a task</a
    >
    <br />
    <br />
    Whether directly execute:
    <nz-switch [(ngModel)]="switchValue"></nz-switch>
  `
})
export class NzDemoPopconfirmDynamicTriggerComponent {
  switchValue = false;

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  constructor(private nzMessageService: NzMessageService) {}
}
