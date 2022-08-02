/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzInputNumberGroupSlotComponent } from './input-number-group-slot.component';
import {
  NzInputNumberGroupComponent,
  NzInputNumberGroupWhitSuffixOrPrefixDirective
} from './input-number-group.component';
import { NzInputNumberComponent } from './input-number.component';

@NgModule({
  imports: [BidiModule, CommonModule, FormsModule, NzOutletModule, NzIconModule, NzFormPatchModule],
  declarations: [
    NzInputNumberComponent,
    NzInputNumberGroupComponent,
    NzInputNumberGroupWhitSuffixOrPrefixDirective,
    NzInputNumberGroupSlotComponent
  ],
  exports: [NzInputNumberComponent, NzInputNumberGroupComponent, NzInputNumberGroupWhitSuffixOrPrefixDirective]
})
export class NzInputNumberModule {}
