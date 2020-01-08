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
import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzNotificationContainerComponent } from './notification-container.component';
import { NotificationComponent } from './notification.component';
import { NzNotificationServiceModule } from './notification.service.module';

@NgModule({
  imports: [CommonModule, OverlayModule, NzIconModule, NzNotificationServiceModule, NzAddOnModule],
  declarations: [NotificationComponent, NzNotificationContainerComponent],
  entryComponents: [NzNotificationContainerComponent]
})
export class NotificationModule {}
