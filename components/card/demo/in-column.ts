/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-in-column',
  template: `
    <div style="background: #ECECEC;padding:30px;">
      <div nz-row [nzGutter]="8">
        <div nz-col [nzSpan]="8">
          <nz-card nzTitle="Card title">
            <p>Card content</p>
          </nz-card>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-card nzTitle="Card title">
            <p>Card content</p>
          </nz-card>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-card nzTitle="Card title">
            <p>Card content</p>
          </nz-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      p {
        margin: 0;
      }
    `
  ]
})
export class NzDemoCardInColumnComponent {}
