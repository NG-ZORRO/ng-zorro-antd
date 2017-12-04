import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoTabsBasicComponent } from './nz-demo-tabs-basic.component';
import { NzDemoTabsPositionComponent } from './nz-demo-tabs-position.component';
import { NzDemoTabsCardComponent } from './nz-demo-tabs-card.component';
import { NzDemoTabsDisabledComponent } from './nz-demo-tabs-disabled.component';
import { NzDemoTabsIconComponent } from './nz-demo-tabs-icon.component';
import { NzDemoTabsMoveComponent } from './nz-demo-tabs-move.component';
import { NzDemoTabsMiniComponent } from './nz-demo-tabs-mini.component';
import { NzDemoTabsExtraComponent } from './nz-demo-tabs-extra.component';
import { NzDemoTabsOperationComponent } from './nz-demo-tabs-operation.component';
import { NzDemoTabsComponent } from './nz-demo-tabs.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoTabsRoutingModule } from './nz-demo-tabs.routing.module';

@NgModule({
  imports     : [ NzDemoTabsRoutingModule,
    FormsModule,
    CommonModule,
    NzCodeBoxModule,
    NgZorroAntdModule ],
  declarations: [
    NzDemoTabsBasicComponent,
    NzDemoTabsComponent,
    NzDemoTabsPositionComponent,
    NzDemoTabsCardComponent,
    NzDemoTabsDisabledComponent,
    NzDemoTabsIconComponent,
    NzDemoTabsMoveComponent,
    NzDemoTabsMiniComponent,
    NzDemoTabsExtraComponent,
    NzDemoTabsOperationComponent
  ]
})
export class NzDemoTabsModule {

}
