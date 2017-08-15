import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoSwitchComponent } from './nz-demo-switch.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoSwitchComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoSwitchRoutingModule {
}
