import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoGridComponent } from './nz-demo-grid.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoGridComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoGridRoutingModule {
}
