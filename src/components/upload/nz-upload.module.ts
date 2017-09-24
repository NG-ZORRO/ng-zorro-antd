import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBasicUploadComponent } from './nz-basic-upload.component';
import { NzUploadComponent } from './nz-upload.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [NzBasicUploadComponent, NzUploadComponent],
  exports: [NzBasicUploadComponent, NzUploadComponent]
})
export class NzUploadModule { }
