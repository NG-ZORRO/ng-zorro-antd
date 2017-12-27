import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoProgressComponent } from './nz-demo-progress.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoProgressComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoProgressRoutingModule {
}
