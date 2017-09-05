import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzBasicUploadComponent } from './nz-basic-upload.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [NzBasicUploadComponent],
  exports: [NzBasicUploadComponent]
})
export class NzBasicUploadModule { }
