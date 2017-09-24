import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzUploadComponent } from './nz-upload.component';
import { NzBasicUploadModule } from '../nz-basic-upload/nz-basic-upload.module';

@NgModule({
  imports: [
    CommonModule,
    NzBasicUploadModule
  ],
  declarations: [NzUploadComponent],
  exports: [NzUploadComponent]
})
export class NzUploadModule { }
