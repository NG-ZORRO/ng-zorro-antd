import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIntroGetStartedComponent } from './nz-intro-get-started.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzIntroGetStartedComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzIntroGetStartedRoutingModule {
}
