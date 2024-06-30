/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzUploadBtnComponent } from './upload-btn.component';
import { NzUploadListComponent } from './upload-list.component';
import { NzUploadComponent } from './upload.component';

@NgModule({
  imports: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent],
  exports: [NzUploadComponent]
})
export class NzUploadModule {}
