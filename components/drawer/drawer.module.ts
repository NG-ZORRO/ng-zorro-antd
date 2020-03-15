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

import { NzNoAnimationModule, NzOutletModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule, NzIconModule, NzOutletModule, NzNoAnimationModule, NzDrawerServiceModule],
  exports: [NzDrawerComponent],
  declarations: [NzDrawerComponent]
})
export class NzDrawerModule {}
