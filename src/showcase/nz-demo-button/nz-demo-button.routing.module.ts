import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoButtonComponent } from './nz-demo-button.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {path: '', component: NzDemoButtonComponent}
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoButtonRoutingModule {
}
