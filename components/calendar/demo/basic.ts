/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-basic',
  template: `
    <nz-calendar [(ngModel)]="date" [(nzMode)]="mode" (nzPanelChange)="panelChange($event)"></nz-calendar>
  `
})
export class NzDemoCalendarBasicComponent {
  date = new Date(2012, 11, 21);
  mode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
