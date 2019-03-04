import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from '../core/addon/addon.module';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzTimelineItemComponent } from './nz-timeline-item.component';
import { NzTimelineComponent } from './nz-timeline.component';

@NgModule({
  declarations: [ NzTimelineItemComponent, NzTimelineComponent ],
  exports     : [ NzTimelineItemComponent, NzTimelineComponent ],
  imports     : [ CommonModule, NzIconModule, NzAddOnModule ]
})
export class NzTimelineModule {
}
