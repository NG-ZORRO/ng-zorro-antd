import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NzDemoTimelineComponent} from './nz-demo-timeline.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: NzDemoTimelineComponent
    }
  ])],
  exports: [RouterModule]
})
export class NzDemoTimelineRoutingModule {

}
