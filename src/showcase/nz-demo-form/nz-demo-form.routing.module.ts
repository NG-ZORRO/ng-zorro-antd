import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoFormComponent } from './nz-demo-form.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoFormComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoFormRoutingModule {
}
