/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-closable',
  template: `
    <nz-alert
      nzType="warning"
      nzCloseable
      nzMessage="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
      (nzOnClose)="afterClose()"
    >
    </nz-alert>
    <nz-alert
      nzType="error"
      nzCloseable
      nzMessage="Error Text"
      nzDescription="Error Description Error Description Error Description Error Description Error Description Error Description"
      (nzOnClose)="afterClose()"
    >
    </nz-alert>
  `,
  styles: [
    `
      nz-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoAlertClosableComponent {
  afterClose(): void {
    console.log('close');
  }
}
