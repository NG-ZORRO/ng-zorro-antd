import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoCalendarComponent } from './nz-demo-calendar.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoCalendarComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoCalendarRoutingModule {
}
