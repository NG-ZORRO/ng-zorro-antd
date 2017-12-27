import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoLayoutComponent } from './nz-demo-layout.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoLayoutComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoLayoutRoutingModule {
}
