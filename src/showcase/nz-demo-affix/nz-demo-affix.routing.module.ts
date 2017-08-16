import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoAffixComponent } from './nz-demo-affix.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoAffixComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoAffixRoutingModule {
}
