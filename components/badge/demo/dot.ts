/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-dot',
  template: `
    <nz-badge nzDot><i nz-icon type="notification"></i></nz-badge>
    <nz-badge nzDot [nzShowDot]="false"><i nz-icon type="notification"></i></nz-badge>
    <nz-badge nzDot>
      <a>Link something</a>
    </nz-badge>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }

      [nz-icon] {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
      }
    `
  ]
})
export class NzDemoBadgeDotComponent {}
