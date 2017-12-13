import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzCodeBoxModule} from '../share/nz-codebox/nz-codebox.module';

import {NzDemoTimelineComponent} from './nz-demo-timeline.component';
import {NzDemoTimelineBasicComponent} from './nz-demo-timeline-basic.component';
import {NgZorroAntdModule} from '../../../index.showcase';
import {NzDemoTimelineRoutingModule} from './nz-demo-timeline-routing.module';
import {NzDemoTimelineColorComponent} from './nz-demo-timeline-color.component';
import {NzDemoTimelinePendingComponent} from './nz-demo-timeline-pending.component';
import {NzDemoTimelineCustomComponent} from './nz-demo-timeline-custom.component';

@NgModule({
  imports: [FormsModule, CommonModule, NgZorroAntdModule, NzCodeBoxModule, NzDemoTimelineRoutingModule],
  declarations: [
    NzDemoTimelineComponent,
    NzDemoTimelineBasicComponent,
    NzDemoTimelineColorComponent,
    NzDemoTimelinePendingComponent,
    NzDemoTimelineCustomComponent]
})
export class NzDemoTimelineModule {
}
