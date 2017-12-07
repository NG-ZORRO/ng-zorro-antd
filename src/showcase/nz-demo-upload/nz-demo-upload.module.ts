import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoUploadBasicComponent } from './nz-demo-upload-basic.component';
import { NzDemoUploadPictureswallComponent } from './nz-demo-upload-pictureswall.component';
import { NzDemoUploadComponent } from './nz-demo-upload.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoUploadRoutingModule } from './nz-demo-upload.routing.module';

@NgModule({
  imports     : [
    NgZorroAntdModule,
    NzDemoUploadRoutingModule,
    CommonModule,
    FormsModule,
    NzCodeBoxModule
  ],
  declarations: [
    NzDemoUploadComponent,
    NzDemoUploadBasicComponent,
    NzDemoUploadPictureswallComponent
  ]
})

export class NzDemoUploadModule {

}
