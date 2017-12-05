import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoBreadCrumbBasicComponent } from './nz-demo-breadcrumb-basic.component';
import { NzDemoBreadCrumbIconComponent } from './nz-demo-breadcrumb-icon.component';
import { NzDemoBreadCrumbSeparatorComponent } from './nz-demo-breadcrumb-separator.component';
import { NzDemoBreadCrumbComponent } from './nz-demo-breadcrumb.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoBreadCrumbRoutingModule } from './nz-demo-breadcrumb.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoBreadCrumbRoutingModule,
    CommonModule,
    FormsModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoBreadCrumbComponent,
    NzDemoBreadCrumbBasicComponent,
    NzDemoBreadCrumbIconComponent,
    NzDemoBreadCrumbSeparatorComponent
  ]
})
export class NzDemoBreadCrumbModule {

}
