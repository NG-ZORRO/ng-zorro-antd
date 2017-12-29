import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoRadioGroupComponent } from './nz-demo-radio-group.component';
import { NzDemoRadioButtonGroupComponent } from './nz-demo-radio-button-group.component';
import { NzDemoRadioButtonGroupSizeComponent } from './nz-demo-radio-button-group-size.component';
import { NzDemoRadioGroupDisabledComponent } from './nz-demo-radio-group-disabled.component';
import { NzDemoRadioComponent } from './nz-demo-radio.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoRadioRoutingModule } from './nz-demo-radio.routing.module';

@NgModule({
  imports     : [ NzDemoRadioRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoRadioGroupComponent, NzDemoRadioButtonGroupComponent, NzDemoRadioButtonGroupSizeComponent, NzDemoRadioGroupDisabledComponent, NzDemoRadioComponent ]
})
export class NzDemoRadioModule {

}
