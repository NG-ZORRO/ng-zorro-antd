/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-event',
  template: `
    <nz-slider
      [(ngModel)]="singleValue"
      (ngModelChange)="onChange($event)"
      (nzOnAfterChange)="onAfterChange($event)"
    ></nz-slider>
    <nz-slider
      nzRange
      [nzStep]="10"
      [(ngModel)]="rangeValue"
      (ngModelChange)="onChange($event)"
      (nzOnAfterChange)="onAfterChange($event)"
    ></nz-slider>
  `
})
export class NzDemoSliderEventComponent {
  singleValue = 30;
  rangeValue = [20, 50];

  onChange(value: number): void {
    console.log(`onChange: ${value}`);
  }

  onAfterChange(value: number): void {
    console.log(`onAfterChange: ${value}`);
  }
}
