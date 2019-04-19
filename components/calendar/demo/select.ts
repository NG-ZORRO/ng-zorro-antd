/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-select',
  template: `
    <nz-alert nzMessage="Your selected date: {{ selectedValue | date: 'yyyy-MM-dd' }}"></nz-alert>
    <nz-calendar [(ngModel)]="selectedValue" (nzSelectChange)="selectChange($event)"></nz-calendar>
  `
})
export class NzDemoCalendarSelectComponent {
  selectedValue = new Date('2017-01-25');

  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
  }
}
