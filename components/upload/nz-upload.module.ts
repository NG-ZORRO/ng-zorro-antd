import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';

import { NzProgressModule } from './../progress/nz-progress.module';
import { NzUploadBtnComponent } from './nz-upload-btn.component';
import { NzUploadListComponent } from './nz-upload-list.component';
import { NzUploadComponent } from './nz-upload.component';

@NgModule({
  imports:      [CommonModule, FormsModule, NzToolTipModule, NzProgressModule, NzI18nModule, NzIconModule],
  declarations: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent],
  exports:      [NzUploadComponent]
})
export class NzUploadModule { }
