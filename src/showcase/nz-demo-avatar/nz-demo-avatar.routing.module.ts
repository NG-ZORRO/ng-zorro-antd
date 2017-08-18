import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoAvatarComponent } from './nz-demo-avatar.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: NzDemoAvatarComponent }
  ])],
  exports: [RouterModule]
})
export class NzDemoAvatarRoutingModule {
}
