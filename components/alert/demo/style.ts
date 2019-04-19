/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-style',
  template: `
    <nz-alert nzType="success" nzMessage="Success Text"></nz-alert>
    <nz-alert nzType="info" nzMessage="Info Text"></nz-alert>
    <nz-alert nzType="warning" nzMessage="Warning Text"></nz-alert>
    <nz-alert nzType="error" nzMessage="Error Text"></nz-alert>
  `,
  styles: [
    `
      nz-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoAlertStyleComponent {}
