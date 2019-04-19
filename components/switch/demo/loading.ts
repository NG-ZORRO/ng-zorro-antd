/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-loading',
  template: `
    <nz-switch [ngModel]="true" nzLoading></nz-switch>
    <br />
    <nz-switch nzSize="small" [ngModel]="false" nzLoading></nz-switch>
  `,
  styles: [
    `
      nz-switch {
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoSwitchLoadingComponent {}
