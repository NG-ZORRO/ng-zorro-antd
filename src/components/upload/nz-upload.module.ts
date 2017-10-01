import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzBasicUploadComponent } from './nz-basic-upload.component';
import { NzUploadComponent } from './nz-upload.component';
import { NzUploadListComponent } from './nz-upload-list.component';
import { NzUploadListItemPreviewComponent } from './nz-upload-list-item-preview.component';
import { NzUploadListItemIconAndPreviewComponent } from './nz-upload-list-item-icon-and-preview.component';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';
import { NzProgressModule } from '../progress/nz-progress.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzToolTipModule,
    NzProgressModule
  ],
  declarations: [NzBasicUploadComponent, NzUploadListItemPreviewComponent, NzUploadListItemIconAndPreviewComponent, NzUploadListComponent, NzUploadComponent],
  exports: [NzBasicUploadComponent, NzUploadListItemPreviewComponent, NzUploadListItemIconAndPreviewComponent, NzUploadListComponent, NzUploadComponent]
})
export class NzUploadModule { }
