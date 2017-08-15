import { NgModule } from '@angular/core';
import { NzTimelineItemComponent } from './nz-timeline-item.component';
import { NzTimelineComponent } from './nz-timeline.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NzTimelineItemComponent, NzTimelineComponent ],
  exports     : [ NzTimelineItemComponent, NzTimelineComponent ],
  imports     : [ CommonModule ]
})

export class NzTimelineModule {
}
