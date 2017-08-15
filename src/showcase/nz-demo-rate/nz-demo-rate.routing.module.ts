import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NzDemoRateComponent} from './nz-demo-rate.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: NzDemoRateComponent}
  ])],
  exports: [RouterModule]
})
export class NzDemoRateRoutingModule {
}
