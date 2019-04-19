/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-basic',
  template: `
    <nz-time-picker [(ngModel)]="time" [nzDefaultOpenValue]="defaultOpenValue"></nz-time-picker>
  `
})
export class NzDemoTimePickerBasicComponent {
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
}
