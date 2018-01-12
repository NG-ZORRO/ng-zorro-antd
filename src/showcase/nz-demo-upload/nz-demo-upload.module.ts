// tslint:disable:ordered-imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NzDemoUploadComponent } from './nz-demo-upload.component';
import { NzDemoUploadRoutingModule } from './nz-demo-upload.routing.module';
import { NzDemoUploadBasicComponent } from './nz-demo-upload-basic.component';
import { NzDemoUploadAvatarComponent } from './nz-demo-upload-avatar.component';
import { NzDemoUploadFileListComponent } from './nz-demo-upload-file-list.component';
import { NzDemoUploadPictureCardComponent } from './nz-demo-upload-picture-card.component';
import { NzDemoUploadFilterComponent } from './nz-demo-upload-filter.component';
import { NzDemoUploadPictureStyleComponent } from './nz-demo-upload-picture-style.component';
import { NzDemoUploadDragComponent } from './nz-demo-upload-drag.component';
import { NzDemoUploadManuallyComponent } from './nz-demo-upload-manually.component';

@NgModule({
  imports     : [ NzDemoUploadRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoUploadComponent,
                  NzDemoUploadBasicComponent,
                  NzDemoUploadAvatarComponent,
                  NzDemoUploadFileListComponent,
                  NzDemoUploadPictureCardComponent,
                  NzDemoUploadFilterComponent,
                  NzDemoUploadPictureStyleComponent,
                  NzDemoUploadDragComponent,
                  NzDemoUploadManuallyComponent
                ]
})
export class NzDemoUploadModule {

}
