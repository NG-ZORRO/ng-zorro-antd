import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoDropDownBasicComponent } from './nz-demo-dropdown-basic.component';
import { NzDemoDropDownOtherComponent } from './nz-demo-dropdown-other.component';
import { NzDemoDropDownTriggerComponent } from './nz-demo-dropdown-trigger.component';
import { NzDemoDropDownCascadingComponent } from './nz-demo-dropdown-cascading.component';
import { NzDemoDropDownPositionComponent } from './nz-demo-dropdown-position.component';
import { NzDemoDropDownClickComponent } from './nz-demo-dropdown-click.component';
import { NzDemoDropDownHideComponent } from './nz-demo-dropdown-hide.component';
import { NzDemoDropDownButtonComponent } from './nz-demo-dropdown-button.component';
import { NzDemoDropDownComponent } from './nz-demo-dropdown.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoDropDownRoutingModule } from './nz-demo-dropdown.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoDropDownRoutingModule,
    CommonModule,
    FormsModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoDropDownComponent,
    NzDemoDropDownBasicComponent,
    NzDemoDropDownOtherComponent,
    NzDemoDropDownTriggerComponent,
    NzDemoDropDownCascadingComponent,
    NzDemoDropDownPositionComponent,
    NzDemoDropDownClickComponent,
    NzDemoDropDownHideComponent,
    NzDemoDropDownButtonComponent
  ]
})
export class NzDemoDropDownModule {

}
