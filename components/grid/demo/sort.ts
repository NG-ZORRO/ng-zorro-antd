/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-sort',
  template: `
    <div nz-row>
      <div nz-col [nzSpan]="18" [nzPush]="6">
        col-18 col-push-6
      </div>
      <div nz-col [nzSpan]="6" [nzPull]="18">
        col-6 col-pull-18
      </div>
    </div>
  `,
  styles: []
})
export class NzDemoGridSortComponent {}
