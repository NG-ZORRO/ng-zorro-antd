import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoCollapseComponent } from './nz-demo-collapse.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoCollapseComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoCollapseRoutingModule {
}
