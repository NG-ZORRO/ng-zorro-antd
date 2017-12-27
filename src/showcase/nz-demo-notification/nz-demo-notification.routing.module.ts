import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoNotificationComponent } from './nz-demo-notification.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoNotificationComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoNotificationRoutingModule {
}
