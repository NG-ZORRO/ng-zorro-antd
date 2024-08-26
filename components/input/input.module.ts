/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzAutosizeDirective } from './autosize.directive';
import { NzInputGroupSlotComponent } from './input-group-slot.component';
import { NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective } from './input-group.component';
import { NzInputOtpComponent } from './input-otp.component';
import { NzInputDirective } from './input.directive';
import { NzTextareaCountComponent } from './textarea-count.component';

@NgModule({
  imports: [
    NzTextareaCountComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzAutosizeDirective,
    NzInputGroupSlotComponent,
    NzInputGroupWhitSuffixOrPrefixDirective,
    NzInputOtpComponent
  ],
  exports: [
    NzTextareaCountComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzAutosizeDirective,
    NzInputGroupWhitSuffixOrPrefixDirective,
    NzInputOtpComponent
  ]
})
export class NzInputModule {}
