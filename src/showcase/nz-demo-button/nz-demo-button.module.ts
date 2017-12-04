import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoButtonTypeComponent } from './nz-demo-button-type.component';
import { NzDemoButtonIconComponent } from './nz-demo-button-icon.component';
import { NzDemoButtonSizeComponent } from './nz-demo-button-size.component';
import { NzDemoButtonDisabledComponent } from './nz-demo-button-disabled.component';
import { NzDemoButtonLoadingComponent } from './nz-demo-button-loading.component';
import { NzDemoButtonGroupComponent } from './nz-demo-button-group.component';
import { NzDemoButtonGhostComponent } from './nz-demo-button-ghost.component';
import { NzDemoButtonMultipleComponent } from './nz-demo-button-multiple.component';
import { NzDemoButtonComponent } from './nz-demo-button.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoButtonRoutingModule } from './nz-demo-button.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoButtonRoutingModule,
    CommonModule,
    FormsModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoButtonComponent,
    NzDemoButtonTypeComponent,
    NzDemoButtonIconComponent,
    NzDemoButtonSizeComponent,
    NzDemoButtonDisabledComponent,
    NzDemoButtonLoadingComponent,
    NzDemoButtonGhostComponent,
    NzDemoButtonGroupComponent,
    NzDemoButtonMultipleComponent
  ]
})
export class NzDemoButtonModule {

}
