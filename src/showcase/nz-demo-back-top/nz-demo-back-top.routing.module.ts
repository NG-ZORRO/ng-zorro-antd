import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoBackTopComponent } from './nz-demo-back-top.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoBackTopComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoBackTopRoutingModule {
}
