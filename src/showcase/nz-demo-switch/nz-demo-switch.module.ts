import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoSwitchBasicComponent } from './nz-demo-switch-basic.component';
import { NzDemoSwitchDisabledComponent } from './nz-demo-switch-disabled.component';
import { NzDemoSwitchTextComponent } from './nz-demo-switch-text.component';
import { NzDemoSwitchSizeComponent } from './nz-demo-switch-size.component';
import { NzDemoSwitchComponent } from './nz-demo-switch.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoSwitchRoutingModule } from './nz-demo-switch.routing.module';

@NgModule({
  imports     : [ FormsModule, NzDemoSwitchRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoSwitchBasicComponent, NzDemoSwitchDisabledComponent, NzDemoSwitchTextComponent, NzDemoSwitchSizeComponent, NzDemoSwitchComponent ]
})
export class NzDemoSwitchModule {

}
