import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER } from './nz-notification-config';
import { NzNotificationContainerComponent } from './nz-notification-container.component';
import { NzNotificationComponent } from './nz-notification.component';
import { NzNotificationService } from './nz-notification.service';

@NgModule({
  imports: [ CommonModule, OverlayModule ],
  declarations: [ NzNotificationComponent, NzNotificationContainerComponent ],
  providers: [ NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER, NzNotificationService ],
  entryComponents: [ NzNotificationContainerComponent ]
})
export class NzNotificationModule { }
