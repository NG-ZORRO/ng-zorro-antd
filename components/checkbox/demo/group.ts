/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-group',
  template: `
    <nz-checkbox-group [(ngModel)]="checkOptionsOne" (ngModelChange)="log(checkOptionsOne)"></nz-checkbox-group>
    <br />
    <br />
    <nz-checkbox-group [(ngModel)]="checkOptionsTwo" (ngModelChange)="log(checkOptionsTwo)"></nz-checkbox-group>
    <br />
    <br />
    <nz-checkbox-group [(ngModel)]="checkOptionsThree" (ngModelChange)="log(checkOptionsThree)"></nz-checkbox-group>
  `
})
export class NzDemoCheckboxGroupComponent {
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
  checkOptionsTwo = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear', checked: true },
    { label: 'Orange', value: 'Orange' }
  ];
  checkOptionsThree = [
    { label: 'Apple', value: 'Apple', disabled: true, checked: true },
    { label: 'Pear', value: 'Pear', disabled: true },
    { label: 'Orange', value: 'Orange' }
  ];

  log(value: object[]): void {
    console.log(value);
  }
}
