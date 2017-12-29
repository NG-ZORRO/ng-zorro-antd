import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoBadgeComponent } from './nz-demo-badge.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoBadgeComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoBadgeRoutingModule {
}
