/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-radiogroup-options',
  template: `
    <div>
      <nz-radio-group [(ngModel)]="radioValue">
        <label nz-radio [nzValue]="o.value" *ngFor="let o of options">{{ o.label }}</label>
      </nz-radio-group>
      <nz-radio-group [(ngModel)]="radioValue">
        <label nz-radio [nzValue]="o.value" *ngFor="let o of options">{{ o.label }}</label>
      </nz-radio-group>
      <nz-radio-group [(ngModel)]="radioValue">
        <label nz-radio [nzValue]="o.value" *ngFor="let o of options">{{ o.label }}</label>
      </nz-radio-group>
    </div>
  `
})
export class NzDemoRadioRadiogroupOptionsComponent {
  radioValue = 'Apple';
  options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
}
