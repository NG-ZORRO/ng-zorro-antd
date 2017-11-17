import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoTransferComponent } from './nz-demo-transfer.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoTransferComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoTransferRoutingModule {
}
