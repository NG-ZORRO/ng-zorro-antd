/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-clear',
  template: `
    <nz-rate [(ngModel)]="value" nzAllowHalf></nz-rate>
    <span class="ant-rate-text">allowClear: true</span>
    <br />
    <nz-rate [(ngModel)]="value" nzAllowHalf [nzAllowClear]="false"></nz-rate>
    <span class="ant-rate-text">allowClear: false</span>
  `
})
export class NzDemoRateClearComponent {
  value = 0;
}
