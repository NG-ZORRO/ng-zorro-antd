import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoPopoverBasicComponent } from './nz-demo-popover-basic.component';
import { NzDemoPopoverLocationComponent } from './nz-demo-popover-location.component';
import { NzDemoPopoverTriggerComponent } from './nz-demo-popover-trigger.component';
import { NzDemoPopoverClickHideComponent } from './nz-demo-popover-clickhide.component';
import { NzDemoPopoverComponent } from './nz-demo-popover.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoPopoverRoutingModule } from './nz-demo-popover.routing.module';
@NgModule({
  imports     : [ NzDemoPopoverRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoPopoverBasicComponent, NzDemoPopoverLocationComponent, NzDemoPopoverTriggerComponent, NzDemoPopoverClickHideComponent, NzDemoPopoverComponent ]
})
export class NzDemoPopoverModule {

}
