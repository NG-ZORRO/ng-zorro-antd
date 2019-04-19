/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-input-number',
  template: `
    <nz-row>
      <nz-col nzSpan="12">
        <nz-slider [nzMin]="1" [nzMax]="20" [(ngModel)]="value1"></nz-slider>
      </nz-col>
      <div nz-col nzSpan="4">
        <nz-input-number
          [nzMin]="1"
          [nzMax]="20"
          [ngStyle]="{ marginLeft: '16px' }"
          [(ngModel)]="value1"
        ></nz-input-number>
      </div>
    </nz-row>

    <nz-row>
      <nz-col nzSpan="12">
        <nz-slider [nzMin]="0" [nzMax]="1" [nzStep]="0.01" [(ngModel)]="value2"></nz-slider>
      </nz-col>
      <nz-col nzSpan="4">
        <nz-input-number
          [nzMin]="0"
          [nzMax]="1"
          [ngStyle]="{ marginLeft: '16px' }"
          [nzStep]="0.01"
          [(ngModel)]="value2"
        ></nz-input-number>
      </nz-col>
    </nz-row>
  `
})
export class NzDemoSliderInputNumberComponent {
  value1 = 1;
  value2 = 0;
}
