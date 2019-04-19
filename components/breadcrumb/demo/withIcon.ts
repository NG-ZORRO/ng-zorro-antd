/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-breadcrumb-withIcon',
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>
        <i nz-icon type="home"></i>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        <a><i nz-icon type="user"></i><span>Application List</span></a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>
        Application
      </nz-breadcrumb-item>
    </nz-breadcrumb>
  `,
  styles: []
})
export class NzDemoBreadcrumbWithIconComponent {}
