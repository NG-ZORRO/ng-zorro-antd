import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoAlertBasicComponent } from './nz-demo-alert-basic.component';
import { NzDemoAlert4TypeComponent } from './nz-demo-4-style.component';
import { NzDemoAlertCloseableComponent } from './nz-demo-alert-closeable.component';
import { NzDemoAlert4TypeMessageComponent } from './nz-demo-alert-4-type-message.component';
import { NzDemoAlertIconComponent } from './nz-demo-alert-icon.component';
import { NzDemoAlertIconCloseComponent } from './nz-demo-alert-icon-close.component';
import { NzDemoAlertSelfCloseComponent } from './nz-demo-alert-self-close.component';
import { NzDemoAlertComponent } from './nz-demo-alert.component';


import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoAlertRoutingModule } from './nz-demo-alert.routing.module';

@NgModule({
  declarations: [ NzDemoAlertComponent, NzDemoAlertBasicComponent, NzDemoAlert4TypeComponent, NzDemoAlertCloseableComponent, NzDemoAlert4TypeMessageComponent, NzDemoAlertIconCloseComponent, NzDemoAlertSelfCloseComponent, NzDemoAlertIconComponent ],
  imports     : [ NzDemoAlertRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ]
})
export class NzDemoAlertModule {

}
