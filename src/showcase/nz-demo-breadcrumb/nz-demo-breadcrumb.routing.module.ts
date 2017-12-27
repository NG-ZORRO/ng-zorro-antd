import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoBreadCrumbComponent } from './nz-demo-breadcrumb.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoBreadCrumbComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoBreadCrumbRoutingModule {
}
