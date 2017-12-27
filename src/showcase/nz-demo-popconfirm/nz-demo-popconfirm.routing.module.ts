import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoPopconfirmComponent } from './nz-demo-popconfirm.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoPopconfirmComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoPopconfirmRoutingModule {
}
