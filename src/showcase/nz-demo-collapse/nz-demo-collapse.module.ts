import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoCollapseBasicComponent } from './nz-demo-collapse-basic.component';
import { NzDemoCollapseAccordionComponent } from './nz-demo-collapse-accordion.component';
import { NzDemoCollapseNestComponent } from './nz-demo-collapse-nest.component';
import { NzDemoCollapseBorderComponent } from './nz-demo-collapse-border.component';
import { NzDemoCollapseCustomComponent } from './nz-demo-collapse-custom.component';

import { NzDemoCollapseComponent } from './nz-demo-collapse.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoCollapseRoutingModule } from './nz-demo-collapse.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoCollapseRoutingModule,
    CommonModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoCollapseComponent,
    NzDemoCollapseBasicComponent,
    NzDemoCollapseAccordionComponent,
    NzDemoCollapseNestComponent,
    NzDemoCollapseBorderComponent,
    NzDemoCollapseCustomComponent
  ]
})
export class NzDemoCollapseModule {

}
