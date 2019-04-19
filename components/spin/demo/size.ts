/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-size',
  template: `
    <nz-spin nzSimple [nzSize]="'small'"></nz-spin>
    <nz-spin nzSimple></nz-spin>
    <nz-spin nzSimple [nzSize]="'large'"></nz-spin>
  `,
  styles: [
    `
      nz-spin {
        display: inline-block;
        margin-right: 16px;
      }
    `
  ]
})
export class NzDemoSpinSizeComponent {}
