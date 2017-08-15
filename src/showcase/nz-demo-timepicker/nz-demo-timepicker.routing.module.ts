import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoTimePickerComponent } from './nz-demo-timepicker.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoTimePickerComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoTimePickerRoutingModule {
}
