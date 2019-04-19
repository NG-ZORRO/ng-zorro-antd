/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-use12Hours',
  template: `
    <nz-time-picker [(ngModel)]="time" [nzUse12Hours]="true"></nz-time-picker>
    <nz-time-picker [(ngModel)]="time" [nzUse12Hours]="true" nzFormat="h:mm a"></nz-time-picker>
  `,
  styles: [
    `
      nz-time-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoTimePickerUse12HoursComponent {
  time: Date | null = null;
}
