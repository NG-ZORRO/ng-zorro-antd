import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoSpinComponent } from './nz-demo-spin.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoSpinComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoSpinRoutingModule {
}
