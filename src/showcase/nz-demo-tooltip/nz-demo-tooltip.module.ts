import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoTooltipBasicComponent } from './nz-demo-tooltip-basic.component';
import { NzDemoTooltipPositionComponent } from './nz-demo-tooltip-position.component';
import { NzDemoTooltipTemplateComponent } from './nz-demo-tooltip-template.component';
import { NzDemoTooltipComponent } from './nz-demo-tooltip.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoTooltipRoutingModule } from './nz-demo-tooltip.routing.module';

@NgModule({
  imports     : [ NzDemoTooltipRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoTooltipBasicComponent, NzDemoTooltipComponent, NzDemoTooltipPositionComponent, NzDemoTooltipTemplateComponent ]
})
export class NzDemoTooltipModule {

}
