import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoCheckboxBasicComponent } from './nz-demo-checkbox-basic.component';
import { NzDemoCheckboxDisabledComponent } from './nz-demo-checkbox-disabled.component';
import { NzDemoCheckboxControllerComponent } from './nz-demo-checkbox-controller.component';
import { NzDemoCheckboxGroupComponent } from './nz-demo-checkbox-group.component';
import { NzDemoCheckboxIndeterminateComponent } from './nz-demo-checkbox-indeterminate.component';
import { NzDemoCheckboxComponent } from './nz-demo-checkbox.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoCheckboxRoutingModule } from './nz-demo-checkbox.routing.module';

@NgModule({
  imports     : [ NzDemoCheckboxRoutingModule, CommonModule, FormsModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoCheckboxComponent, NzDemoCheckboxBasicComponent, NzDemoCheckboxDisabledComponent, NzDemoCheckboxControllerComponent, NzDemoCheckboxGroupComponent, NzDemoCheckboxIndeterminateComponent ]
})
export class NzDemoCheckboxModule {

}
