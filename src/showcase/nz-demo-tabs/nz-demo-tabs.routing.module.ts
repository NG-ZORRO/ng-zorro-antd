import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoTabsComponent } from './nz-demo-tabs.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoTabsComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoTabsRoutingModule {
}
