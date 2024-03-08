/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzFormItemFeedbackIconComponent } from './nz-form-item-feedback-icon.component';

@NgModule({
  imports: [CommonModule, NzIconModule],
  exports: [NzFormItemFeedbackIconComponent],
  declarations: [NzFormItemFeedbackIconComponent]
})
export class NzFormPatchModule {}
