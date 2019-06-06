/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from 'ng-zorro-antd/core';

import { NzBreadCrumbItemComponent } from './nz-breadcrumb-item.component';
import { NzBreadCrumbComponent } from './nz-breadcrumb.component';

@NgModule({
  imports: [CommonModule, NzAddOnModule],
  declarations: [NzBreadCrumbComponent, NzBreadCrumbItemComponent],
  exports: [NzBreadCrumbComponent, NzBreadCrumbItemComponent]
})
export class NzBreadCrumbModule {}
