/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-content',
  template: `
    <nz-select style="width: 200px;" nzShowSearch nzAllowClear nzPlaceHolder="Select OS" [(ngModel)]="selectedOS">
      <nz-option nzCustomContent nzLabel="Windows" nzValue="windows"><i nz-icon type="windows"></i> Windows</nz-option>
      <nz-option nzCustomContent nzLabel="Mac" nzValue="mac"><i nz-icon type="apple"></i> Mac</nz-option>
      <nz-option nzCustomContent nzLabel="Android" nzValue="android"><i nz-icon type="android"></i> Android</nz-option>
    </nz-select>
  `
})
export class NzDemoSelectCustomContentComponent {
  selectedOS = null;
}
