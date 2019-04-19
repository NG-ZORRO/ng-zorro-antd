/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-responsive-more',
  template: `
    <div nz-row>
      <div nz-col [nzXs]="{ span: 5, offset: 1 }" [nzLg]="{ span: 6, offset: 2 }">
        Col
      </div>
      <div nz-col [nzXs]="{ span: 11, offset: 1 }" [nzLg]="{ span: 6, offset: 2 }">
        Col
      </div>
      <div nz-col [nzXs]="{ span: 5, offset: 1 }" [nzLg]="{ span: 6, offset: 2 }">
        Col
      </div>
    </div>
  `,
  styles: []
})
export class NzDemoGridResponsiveMoreComponent {}
