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
import { NzInputNumberLegacyComponent } from './input-number.component';

/**
 * @deprecated Will be removed in v21. It is recommended to use the new version `<nz-input-number>`.
 */
@NgModule({
  imports: [
    NzInputNumberLegacyComponent,
    NzInputNumberGroupComponent,
    NzInputNumberGroupWhitSuffixOrPrefixDirective,
    NzInputNumberGroupSlotComponent
  ],
  exports: [NzInputNumberLegacyComponent, NzInputNumberGroupComponent, NzInputNumberGroupWhitSuffixOrPrefixDirective]
})
export class NzInputNumberLegacyModule {}
