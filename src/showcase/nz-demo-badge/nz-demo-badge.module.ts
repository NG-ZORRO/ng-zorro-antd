import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDemoBadgeBasicComponent } from './nz-demo-badge-basic.component';
import { NzDemoBadgeStandAlonesComponent } from './nz-demo-badge-standalones.component';
import { NzDemoBadgeOverFlowComponent } from './nz-demo-badge-overflow.component';
import { NzDemoBadgeClickAbleComponent } from './nz-demo-badge-clickable.component';
import { NzDemoBadgeDotComponent } from './nz-demo-badge-dot.component';
import { NzDemoBadgeAnimateComponent } from './nz-demo-badge-animate.component';
import { NzDemoBadgeMyCeilComponent } from './nz-demo-badge-myceil.component';
import { NzDemoBadgeStatusComponent } from './nz-demo-badge-status.component';
import { NzDemoBadgeComponent } from './nz-demo-badge.component';

import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoBadgeRoutingModule } from './nz-demo-badge.routing.module';

@NgModule({
  imports     : [ NzDemoBadgeRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoBadgeComponent, NzDemoBadgeComponent, NzDemoBadgeBasicComponent, NzDemoBadgeStandAlonesComponent, NzDemoBadgeOverFlowComponent, NzDemoBadgeClickAbleComponent, NzDemoBadgeDotComponent, NzDemoBadgeAnimateComponent, NzDemoBadgeMyCeilComponent, NzDemoBadgeStatusComponent ]
})
export class NzDemoBadgeModule {

}
