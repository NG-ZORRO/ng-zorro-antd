/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzAutosizeDirective } from './autosize.directive';
import { NzInputGroupSlotComponent } from './input-group-slot.component';
import { NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective } from './input-group.component';
import { NzInputDirective } from './input.directive';
import { NzTextareaCountComponent } from './textarea-count.component';

@NgModule({
  imports: [
    NzTextareaCountComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzAutosizeDirective,
    NzInputGroupSlotComponent,
    NzInputGroupWhitSuffixOrPrefixDirective
  ],
  exports: [
    NzTextareaCountComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzAutosizeDirective,
    NzInputGroupWhitSuffixOrPrefixDirective
  ]
})
export class NzInputModule {}
