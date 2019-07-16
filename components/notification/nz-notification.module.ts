/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER } from './nz-notification-config';
import { NzNotificationContainerComponent } from './nz-notification-container.component';
import { NzNotificationComponent } from './nz-notification.component';
import { NzNotificationServiceModule } from './nz-notification.service.module';

@NgModule({
  imports: [CommonModule, OverlayModule, NzIconModule, NzNotificationServiceModule],
  declarations: [NzNotificationComponent, NzNotificationContainerComponent],
  providers: [NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER],
  entryComponents: [NzNotificationContainerComponent]
})
export class NzNotificationModule {}
