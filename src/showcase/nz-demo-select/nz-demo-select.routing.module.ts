import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoSelectComponent } from './nz-demo-select.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoSelectComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoSelectRoutingModule {
}
