/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-digit',
  template: `
    <nz-input-number
      [(ngModel)]="demoValue"
      [nzMin]="1"
      [nzMax]="10"
      [nzStep]="0.1"
      [nzPlaceHolder]="'Digital'"
    ></nz-input-number>
  `
})
export class NzDemoInputNumberDigitComponent {
  demoValue: number;
}
