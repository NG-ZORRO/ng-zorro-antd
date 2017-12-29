import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoNotificationBasicComponent } from './nz-demo-notification-basic.component';
import { NzDemoNotificationDurationComponent } from './nz-demo-notification-duration.component';
import { NzDemoNotificationIconComponent } from './nz-demo-notification-icon.component';
import { NzDemoNotificationHtmlComponent } from './nz-demo-notification-html.component';
import { NzDemoNotificationComponent } from './nz-demo-notification.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoNotificationRoutingModule } from './nz-demo-notification.routing.module';

@NgModule({
  imports     : [ NzDemoNotificationRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoNotificationBasicComponent, NzDemoNotificationDurationComponent, NzDemoNotificationIconComponent, NzDemoNotificationHtmlComponent, NzDemoNotificationComponent ]
})
export class NzDemoNotificationModule {

}
