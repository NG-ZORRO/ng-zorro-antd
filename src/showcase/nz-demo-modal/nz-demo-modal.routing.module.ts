import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoModalComponent } from './nz-demo-modal.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoModalComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoModalRoutingModule {
}
