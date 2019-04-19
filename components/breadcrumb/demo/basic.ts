/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-basic',
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        Home
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a>Application List</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        An Application
      </nz-breadcrumb-item>
    </nz-breadcrumb>
  `,
  styles: []
})
export class NzDemoBreadcrumbBasicComponent {}
