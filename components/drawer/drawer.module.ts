/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule, NzIconModule, NzOutletModule, NzNoAnimationModule, NzDrawerServiceModule],
  exports: [NzDrawerComponent],
  declarations: [NzDrawerComponent],
  entryComponents: [NzDrawerComponent]
})
export class NzDrawerModule {}
