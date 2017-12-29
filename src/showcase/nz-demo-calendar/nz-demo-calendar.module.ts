import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoCalendarBasicComponent } from './nz-demo-calendar-basic.component';
import { NzDemoCalendarCardComponent } from './nz-demo-calendar-card.component';
import { NzDemoCalendarLocaleComponent } from './nz-demo-calendar-locale.component';
import { NzDemoCalendarContentComponent } from './nz-demo-calendar-content.component';
import { NzDemoCalendarComponent } from './nz-demo-calendar.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoCalendarRoutingModule } from './nz-demo-calendar.routing.module';

@NgModule({
  imports     : [ NzDemoCalendarRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoCalendarComponent, NzDemoCalendarBasicComponent, NzDemoCalendarCardComponent, NzDemoCalendarLocaleComponent, NzDemoCalendarContentComponent ]
})
export class NzDemoCalendarModule {

}
