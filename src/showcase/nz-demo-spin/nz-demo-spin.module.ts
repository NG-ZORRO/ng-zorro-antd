import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoSpinBasicComponent } from './nz-demo-spin-basic.component';
import { NzDemoSpinInsideComponent } from './nz-demo-spin-inside.component';
import { NzDemoSpinSizeComponent } from './nz-demo-spin-size.component';
import { NzDemoSpinTipComponent } from './nz-demo-spin-tip.component';
import { NzDemoSpinNestedComponent } from './nz-demo-spin-nested.component';
import { NzDemoSpinComponent } from './nz-demo-spin.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';


import { NzDemoSpinRoutingModule } from './nz-demo-spin.routing.module';

@NgModule({
  imports     : [ NzDemoSpinRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoSpinBasicComponent, NzDemoSpinInsideComponent, NzDemoSpinSizeComponent, NzDemoSpinTipComponent, NzDemoSpinNestedComponent, NzDemoSpinComponent ]
})
export class NzDemoSpinModule {

}
