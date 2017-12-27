import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoPaginationComponent } from './nz-demo-pagination.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoPaginationComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoPaginationRoutingModule {
}
