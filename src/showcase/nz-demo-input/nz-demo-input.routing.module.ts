import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoInputComponent } from './nz-demo-input.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoInputComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoInputRoutingModule {
}
