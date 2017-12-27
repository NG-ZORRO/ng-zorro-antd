import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoLayoutBasicComponent } from './nz-demo-layout-basic.component';
import { NzDemoLayoutTopComponent } from './nz-demo-layout-top.component';
import { NzDemoLayoutTopSideComponent } from './nz-demo-layout-top-side.component';
import { NzDemoLayoutTopSide2Component } from './nz-demo-layout-top-side-2.component';
import { NzDemoLayoutSideComponent } from './nz-demo-layout-side.component';
import { NzDemoLayoutTriggerComponent } from './nz-demo-layout-trigger.component';
import { NzDemoLayoutResponsiveComponent } from './nz-demo-layout-responsive.component';
import { NzDemoLayoutComponent } from './nz-demo-layout.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoLayoutRoutingModule } from './nz-demo-layout.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoLayoutRoutingModule,
    CommonModule,
    FormsModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoLayoutComponent,
    NzDemoLayoutBasicComponent,
    NzDemoLayoutTopComponent,
    NzDemoLayoutTopSide2Component,
    NzDemoLayoutTopSideComponent,
    NzDemoLayoutSideComponent,
    NzDemoLayoutTriggerComponent,
    NzDemoLayoutResponsiveComponent
  ]
})
export class NzDemoLayoutModule {

}
