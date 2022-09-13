/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzNotificationContainerComponent } from './notification-container.component';
import { NzNotificationComponent } from './notification.component';
import { NzNotificationServiceModule } from './notification.service.module';

@NgModule({
  imports: [BidiModule, CommonModule, OverlayModule, NzIconModule, NzOutletModule, NzNotificationServiceModule],
  declarations: [NzNotificationComponent, NzNotificationContainerComponent]
})
export class NzNotificationModule {}
