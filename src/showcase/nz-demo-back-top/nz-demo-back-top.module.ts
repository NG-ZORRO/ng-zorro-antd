import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoBackTopBasicComponent } from './nz-demo-back-top-basic.component';
import { NzDemoBackTopCustomComponent } from './nz-demo-back-top-custom.component';
import { NzDemoBackTopTargetComponent } from './nz-demo-back-top-target.component';
import { NzDemoBackTopComponent } from './nz-demo-back-top.component';


import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoBackTopRoutingModule } from './nz-demo-back-top.routing.module';

@NgModule({
  declarations: [ NzDemoBackTopComponent, NzDemoBackTopBasicComponent, NzDemoBackTopCustomComponent, NzDemoBackTopTargetComponent ],
  imports     : [ NzDemoBackTopRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ]
})

export class NzDemoBackTopModule {

}
