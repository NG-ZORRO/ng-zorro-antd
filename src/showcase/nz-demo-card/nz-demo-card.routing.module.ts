import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoCardComponent } from './nz-demo-card.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoCardComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoCardRoutingModule {
}
