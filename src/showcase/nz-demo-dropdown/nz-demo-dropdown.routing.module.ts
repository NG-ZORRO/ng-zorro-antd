import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoDropDownComponent } from './nz-demo-dropdown.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoDropDownComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoDropDownRoutingModule {
}
