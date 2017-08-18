import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoAnchorComponent } from './nz-demo-anchor.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoAnchorComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoAnchorRoutingModule {
}
