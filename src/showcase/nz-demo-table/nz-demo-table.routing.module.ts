import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoTableComponent } from './nz-demo-table.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoTableComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoTableRoutingModule {
}
