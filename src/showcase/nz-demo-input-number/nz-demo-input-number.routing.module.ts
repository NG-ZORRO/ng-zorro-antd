import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoInputNumberComponent } from './nz-demo-input-number.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoInputNumberComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoInputNumberRoutingModule {
}
