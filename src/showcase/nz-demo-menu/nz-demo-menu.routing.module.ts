import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoMenuComponent } from './nz-demo-menu.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoMenuComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoMenuRoutingModule {
}
