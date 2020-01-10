/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzContentComponent } from './nz-content.component';
import { NzFooterComponent } from './nz-footer.component';
import { NzHeaderComponent } from './nz-header.component';
import { NzLayoutComponent } from './nz-layout.component';
import { NzSiderComponent } from './nz-sider.component';

@NgModule({
  declarations: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent],
  exports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent],
  imports: [CommonModule, NzIconModule, LayoutModule, PlatformModule]
})
export class NzLayoutModule {}
