import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLocaleModule } from '../locale/index';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';
import { NzProgressModule } from './../progress/nz-progress.module';
import { NzUploadBtnComponent } from './nz-upload-btn.component';
import { NzUploadListComponent } from './nz-upload-list.component';
import { NzUploadComponent } from './nz-upload.component';

@NgModule({
  imports:      [CommonModule, FormsModule, HttpClientModule, NzToolTipModule, NzProgressModule, NzLocaleModule],
  declarations: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent],
  exports:      [NzUploadComponent]
})
export class NzUploadModule { }
