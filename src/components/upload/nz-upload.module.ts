import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLocaleModule } from '../locale/index';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';
import { NzProgressModule } from './../progress/nz-progress.module';
import { NzUploadBtnComponent } from './nz-upload-btn.component';
import { NzUploadListComponent } from './nz-upload-list.component';
import { NzUploadComponent } from './nz-upload.component';

@NgModule({
  imports:      [CommonModule, FormsModule, NzToolTipModule, NzProgressModule, NzLocaleModule],
  declarations: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent],
  exports:      [NzUploadComponent]
})
export class NzUploadModule { }
