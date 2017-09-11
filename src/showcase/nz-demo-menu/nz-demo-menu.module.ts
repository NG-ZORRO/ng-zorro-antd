import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoMenuBasicComponent } from './nz-demo-menu-basic.component';
import { NzDemoMenuInlineComponent } from './nz-demo-menu-inline.component';
import { NzDemoMenuCollapsedComponent } from './nz-demo-menu-collapsed.component';
import { NzDemoMenuExpandComponent } from './nz-demo-menu-expand.component';
import { NzDemoMenuVerticalComponent } from './nz-demo-menu-vertical.component';
import { NzDemoMenuThemeComponent } from './nz-demo-menu-theme.component';
import { NzDemoMenuDynamicComponent } from './nz-demo-menu-dynamic.component';
import { NzDemoMenuComponent } from './nz-demo-menu.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoMenuRoutingModule } from './nz-demo-menu.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoMenuRoutingModule,
    CommonModule,
    FormsModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoMenuComponent,
    NzDemoMenuBasicComponent,
    NzDemoMenuInlineComponent,
    NzDemoMenuCollapsedComponent,
    NzDemoMenuExpandComponent,
    NzDemoMenuVerticalComponent,
    NzDemoMenuThemeComponent,
    NzDemoMenuDynamicComponent
  ]
})

export class NzDemoMenuModule {

}
