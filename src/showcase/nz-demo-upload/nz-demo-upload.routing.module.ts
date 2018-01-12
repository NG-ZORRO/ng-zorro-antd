import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDemoUploadComponent } from './nz-demo-upload.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzDemoUploadComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzDemoUploadRoutingModule {
}
