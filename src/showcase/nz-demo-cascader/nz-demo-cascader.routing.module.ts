import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoCascaderComponent } from './nz-demo-cascader.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoCascaderComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoCascaderRoutingModule {
}
