import { NgModule } from '@angular/core';
import { NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER } from './nz-notification-config';
import { NzNotificationContainerComponent } from './nz-notification-container.component';
import { NzNotificationComponent } from './nz-notification.component';
import { CommonModule } from '@angular/common';
import { FloaterModule } from '../core/floater/index';

const providers = [
  NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER
];

@NgModule({
  imports: [ CommonModule, FloaterModule ],
  declarations: [ NzNotificationComponent, NzNotificationContainerComponent ],
  providers: providers,
  entryComponents: [ NzNotificationContainerComponent ],
})
export class NzNotificationModule { }
