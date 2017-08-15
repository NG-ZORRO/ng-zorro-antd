import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoAlertComponent } from './nz-demo-alert.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoAlertComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoAlertRoutingModule {
}
