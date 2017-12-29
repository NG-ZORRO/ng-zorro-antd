import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoPopoverComponent } from './nz-demo-popover.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoPopoverComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoPopoverRoutingModule {
}
