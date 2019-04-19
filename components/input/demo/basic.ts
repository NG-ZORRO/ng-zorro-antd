/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-basic',
  template: `
    <input nz-input placeholder="Basic usage" [(ngModel)]="value" />
    <br />
    <br />
    <input nz-input placeholder="Basic usage" [(ngModel)]="value" [disabled]="true" />
  `
})
export class NzDemoInputBasicComponent {
  value: string;
}
