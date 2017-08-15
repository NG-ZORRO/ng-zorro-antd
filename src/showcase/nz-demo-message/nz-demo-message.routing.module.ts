import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoMessageComponent } from './nz-demo-message.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoMessageComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoMessageRoutingModule {
}
