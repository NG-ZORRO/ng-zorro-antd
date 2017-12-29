import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoDatePickerComponent } from './nz-demo-datepicker.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoDatePickerComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoDatePickerRoutingModule {
}
