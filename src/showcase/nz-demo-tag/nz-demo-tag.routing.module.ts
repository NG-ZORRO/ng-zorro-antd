import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoTagComponent } from './nz-demo-tag.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoTagComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoTagRoutingModule {
}
