import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoCheckboxComponent } from './nz-demo-checkbox.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoCheckboxComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoCheckboxRoutingModule {
}
