import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzTabBodyComponent } from './nz-tab-body.component';
import { NzTabLabelDirective } from './nz-tab-label.directive';
import { NzTabComponent } from './nz-tab.component';
import { NzTabsInkBarDirective } from './nz-tabs-ink-bar.directive';
import { NzTabsNavComponent } from './nz-tabs-nav.component';
import { NzTabSetComponent } from './nz-tabset.component';

@NgModule({
  declarations: [ NzTabComponent, NzTabSetComponent, NzTabsNavComponent, NzTabLabelDirective, NzTabsInkBarDirective, NzTabBodyComponent ],
  exports     : [ NzTabComponent, NzTabSetComponent, NzTabsNavComponent, NzTabLabelDirective, NzTabsInkBarDirective, NzTabBodyComponent ],
  imports     : [ CommonModule, ObserversModule, NzIconModule ]
})
export class NzTabsModule {
}
