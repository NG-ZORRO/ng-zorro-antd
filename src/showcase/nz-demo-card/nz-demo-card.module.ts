import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoCardBasicComponent } from './nz-demo-card-basic.component';
import { NzDemoCardBorderComponent } from './nz-demo-card-border.component';
import { NzDemoCardSimpleComponent } from './nz-demo-card-simple.component';
import { NzDemoCardFlexComponent } from './nz-demo-card-flex.component';
import { NzDemoCardGridComponent } from './nz-demo-card-grid.component';
import { NzDemoCardInnerComponent } from './nz-demo-card-inner.component';
import { NzDemoCardLoadingComponent } from './nz-demo-card-loading.component';
import { NzDemoCardComponent } from './nz-demo-card.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoCardRoutingModule } from './nz-demo-card.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoCardRoutingModule,
    CommonModule,
    FormsModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoCardComponent,
    NzDemoCardBasicComponent,
    NzDemoCardBorderComponent,
    NzDemoCardSimpleComponent,
    NzDemoCardFlexComponent,
    NzDemoCardGridComponent,
    NzDemoCardLoadingComponent,
    NzDemoCardInnerComponent
  ]
})
export class NzDemoCardModule {

}
