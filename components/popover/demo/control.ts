/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-control',
  template: `
    <button
      nz-button
      nzType="primary"
      nz-popover
      nzTitle="Title"
      [(nzVisible)]="visible"
      (nzVisibleChange)="change($event)"
      nzTrigger="click"
      [nzContent]="contentTemplate"
    >
      Click me
    </button>
    <ng-template #contentTemplate>
      <a (click)="clickMe()">Close</a>
    </ng-template>
  `
})
export class NzDemoPopoverControlComponent {
  visible: boolean;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }
}
