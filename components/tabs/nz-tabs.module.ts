import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzTabBodyComponent } from './nz-tab-body.component';
import { NzTabLabelDirective } from './nz-tab-label.directive';
import { NzTabComponent } from './nz-tab.component';
import { NzTabDirective } from './nz-tab.directive';
import { NzTabsInkBarDirective } from './nz-tabs-ink-bar.directive';
import { NzTabsNavComponent } from './nz-tabs-nav.component';
import { NzTabSetComponent } from './nz-tabset.component';

@NgModule({
  declarations: [ NzTabComponent, NzTabDirective, NzTabSetComponent, NzTabsNavComponent, NzTabLabelDirective, NzTabsInkBarDirective, NzTabBodyComponent ],
  exports     : [ NzTabComponent, NzTabDirective, NzTabSetComponent, NzTabsNavComponent, NzTabLabelDirective, NzTabsInkBarDirective, NzTabBodyComponent ],
  imports     : [ CommonModule, ObserversModule, NzIconModule, NzAddOnModule ]
})
export class NzTabsModule {
}
