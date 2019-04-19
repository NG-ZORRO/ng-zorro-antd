/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-basic',
  template: `
    <nz-slider [(ngModel)]="value1" [nzDisabled]="disabled"></nz-slider>
    <nz-slider nzRange [(ngModel)]="value2" [nzDisabled]="disabled"></nz-slider>
    Disabled:
    <nz-switch nzSize="small" [(ngModel)]="disabled"></nz-switch>
  `
})
export class NzDemoSliderBasicComponent {
  disabled = false;
  value1 = 30;
  value2 = [20, 50];
}
