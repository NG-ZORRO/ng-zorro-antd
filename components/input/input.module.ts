/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzAutosizeDirective } from './autosize.directive';
import { NzInputGroupSlotComponent } from './input-group-slot.component';
import { NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective } from './input-group.component';
import { NzInputDirective } from './input.directive';
import { NzTextareaCountComponent } from './textarea-count.component';

@NgModule({
  declarations: [
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
  ],
  imports: [BidiModule, CommonModule, NzIconModule, PlatformModule, NzOutletModule, NzFormPatchModule]
})
export class NzInputModule {}
