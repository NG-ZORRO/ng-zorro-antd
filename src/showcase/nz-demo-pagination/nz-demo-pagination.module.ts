import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoPaginationBasicComponent } from './nz-demo-pagination-basic.component';
import { NzDemoPaginationMoreComponent } from './nz-demo-pagination-more.component';
import { NzDemoPaginationChangerComponent } from './nz-demo-pagination-changer.component';
import { NzDemoPaginationJumpComponent } from './nz-demo-pagination-jump.component';
import { NzDemoPaginationMiniComponent } from './nz-demo-pagination-mini.component';
import { NzDemoPaginationSimpleComponent } from './nz-demo-pagination-simple.component';
import { NzDemoPaginationTotalComponent } from './nz-demo-pagination-total.component';
import { NzDemoPaginationComponent } from './nz-demo-pagination.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoPaginationRoutingModule } from './nz-demo-pagination.routing.module';

@NgModule({
  imports     : [ NzDemoPaginationRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoPaginationBasicComponent, NzDemoPaginationMoreComponent, NzDemoPaginationChangerComponent, NzDemoPaginationJumpComponent, NzDemoPaginationMiniComponent, NzDemoPaginationSimpleComponent, NzDemoPaginationTotalComponent, NzDemoPaginationComponent ]
})
export class NzDemoPaginationModule {

}
