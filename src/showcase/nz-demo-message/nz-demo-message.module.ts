import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoMessageBasicComponent } from './nz-demo-message-basic.component';
import { NzDemoMessageDurationComponent } from './nz-demo-message-duration.component';
import { NzDemoMessageIconComponent } from './nz-demo-message-icon.component';
import { NzDemoMessageLoadingComponent } from './nz-demo-message-loading.component';
import { NzDemoMessageComponent } from './nz-demo-message.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoMessageRoutingModule } from './nz-demo-message.routing.module';

@NgModule({
  imports     : [ NzDemoMessageRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoMessageBasicComponent, NzDemoMessageDurationComponent, NzDemoMessageIconComponent, NzDemoMessageLoadingComponent, NzDemoMessageComponent ]
})
export class NzDemoMessageModule {

}
