/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-text',
  template: `
    <nz-rate [(ngModel)]="value" [nzTooltips]="tooltips"></nz-rate>
    <span *ngIf="value" class="ant-rate-text">{{ value ? tooltips[value - 1] : '' }}</span>
  `
})
export class NzDemoRateTextComponent {
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 3;
}
