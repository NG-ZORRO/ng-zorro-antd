/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-mini',
  template: `
    <nz-pagination [(nzPageIndex)]="current" [nzTotal]="50" [nzSize]="'small'"></nz-pagination>
    <br />
    <nz-pagination
      [(nzPageIndex)]="current"
      [nzTotal]="50"
      [nzSize]="'small'"
      nzShowSizeChanger
      nzShowQuickJumper
    ></nz-pagination>
    <br />
    <nz-pagination
      [(nzPageIndex)]="current"
      [nzTotal]="50"
      [nzSize]="'small'"
      [nzShowTotal]="totalTemplate"
    ></nz-pagination>
    <ng-template #totalTemplate let-total>Total {{ total }} items</ng-template>
  `,
  styles: []
})
export class NzDemoPaginationMiniComponent {
  current = 1;
}
