import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoodSelectDemoComponent } from './good-select-demo.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: GoodSelectDemoComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class GoodSelectDemoRoutingModule {
}
