/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzInputNumberGroupSlotComponent } from './input-number-group-slot.component';
import {
  NzInputNumberGroupComponent,
  NzInputNumberGroupWhitSuffixOrPrefixDirective
} from './input-number-group.component';
import { NzInputNumberComponent } from './input-number.component';

@NgModule({
  imports: [
    NzInputNumberComponent,
    NzInputNumberGroupComponent,
    NzInputNumberGroupWhitSuffixOrPrefixDirective,
    NzInputNumberGroupSlotComponent
  ],
  exports: [NzInputNumberComponent, NzInputNumberGroupComponent, NzInputNumberGroupWhitSuffixOrPrefixDirective]
})
export class NzInputNumberModule {}
