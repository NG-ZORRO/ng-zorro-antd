/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-value',
  template: `
    <nz-time-picker [(ngModel)]="time" (ngModelChange)="log($event)"></nz-time-picker>
  `
})
export class NzDemoTimePickerValueComponent {
  time: Date | null = null;

  log(time: Date): void {
    console.log(time && time.toTimeString());
  }
}
