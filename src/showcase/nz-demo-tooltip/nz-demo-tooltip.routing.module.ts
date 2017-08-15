import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoTooltipComponent } from './nz-demo-tooltip.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoTooltipComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoTooltipRoutingModule {
}
