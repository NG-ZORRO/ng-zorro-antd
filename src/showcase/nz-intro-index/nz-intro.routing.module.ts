import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { NzGlobalResolver } from '../app.resolver';
import { NzIntroComponent } from './nz-intro.component';
@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzIntroComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzIntroRoutingModule {
}
