import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoIconComponent } from './nz-demo-icon.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoIconComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoIconRoutingModule {
}
