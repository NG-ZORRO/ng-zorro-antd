/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule, NzNoAnimationModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzDrawerComponent } from './nz-drawer.component';
import { NzDrawerServiceModule } from './nz-drawer.service.module';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    NzIconModule,
    NzAddOnModule,
    NzNoAnimationModule,
    NzDrawerServiceModule
  ],
  exports: [NzDrawerComponent],
  declarations: [NzDrawerComponent],
  entryComponents: [NzDrawerComponent]
})
export class NzDrawerModule {}
