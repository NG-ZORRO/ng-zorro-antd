import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NzDemoSliderComponent } from './nz-demo-slider.component';

const routes: Routes = [{
  path: '', component: NzDemoSliderComponent
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NzDemoSliderRoutingModule {
  // TODO
}
