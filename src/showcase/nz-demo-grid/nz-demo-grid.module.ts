import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoGridBasicComponent } from './nz-demo-grid-basic.component';
import { NzDemoGridGutterComponent } from './nz-demo-grid-gutter.component';
import { NzDemoGridGutterConfigComponent } from './nz-demo-grid-gutter-config.component';
import { NzDemoGridOffsetComponent } from './nz-demo-grid-offset.component';
import { NzDemoGridSortComponent } from './nz-demo-grid-sort.component';
import { NzDemoGridFlexComponent } from './nz-demo-grid-flex.component';
import { NzDemoGridFlexAlignComponent } from './nz-demo-grid-flex-align.component';
import { NzDemoGridFlexOrderComponent } from './nz-demo-grid-flex-order.component';
import { NzDemoGridResponsiveComponent } from './nz-demo-grid-responsive.component';
import { NzDemoGridResponsiveMoreComponent } from './nz-demo-grid-responsive-more.component';
import { NzDemoGridComponent } from './nz-demo-grid.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoGridRoutingModule } from './nz-demo-grid.routing.module';

@NgModule({
  imports     : [ NzDemoGridRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoGridResponsiveMoreComponent, NzDemoGridGutterConfigComponent, NzDemoGridFlexOrderComponent, NzDemoGridBasicComponent, NzDemoGridGutterComponent, NzDemoGridOffsetComponent, NzDemoGridSortComponent, NzDemoGridFlexComponent, NzDemoGridFlexAlignComponent, NzDemoGridResponsiveComponent, NzDemoGridComponent ]
})

export class NzDemoGridModule {

}
