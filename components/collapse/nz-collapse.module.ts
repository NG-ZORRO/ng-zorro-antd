import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzCollapsePanelComponent } from './nz-collapse-panel.component';
import { NzCollapseComponent } from './nz-collapse.component';

@NgModule({
  declarations: [ NzCollapsePanelComponent, NzCollapseComponent ],
  exports     : [ NzCollapsePanelComponent, NzCollapseComponent ],
  imports     : [ CommonModule, NzIconModule ]
})

export class NzCollapseModule {
}
