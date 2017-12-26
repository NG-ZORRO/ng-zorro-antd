import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoRateBasicComponent } from './nz-demo-rate-basic.component';
import { NzDemoRateDisabledComponent } from './nz-demo-rate-disabled.component';
import { NzDemoRateTextComponent } from './nz-demo-rate-text.component';
import { NzDemoRateHalfComponent } from './nz-demo-rate-half.component';
import { NzDemoRateComponent } from './nz-demo-rate.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoRateRoutingModule } from './nz-demo-rate.routing.module';

@NgModule({
  imports     : [ NzDemoRateRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoRateBasicComponent, NzDemoRateDisabledComponent, NzDemoRateTextComponent, NzDemoRateHalfComponent, NzDemoRateComponent ]
})
export class NzDemoRateModule {

}
