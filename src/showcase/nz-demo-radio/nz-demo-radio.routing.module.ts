import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoRadioComponent } from './nz-demo-radio.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoRadioComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoRadioRoutingModule {
}
