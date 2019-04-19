/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-grid-card',
  template: `
    <nz-card nzTitle="Cart Title">
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
      <div nz-card-grid [ngStyle]="gridStyle">Content</div>
    </nz-card>
  `
})
export class NzDemoCardGridCardComponent {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
}
