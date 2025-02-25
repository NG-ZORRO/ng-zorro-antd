/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import {
  NzInputAddonAfterDirective,
  NzInputAddonBeforeDirective,
  NzInputPrefixDirective,
  NzInputSuffixDirective
} from 'ng-zorro-antd/input';

import { NzInputNumberComponent } from './input-number.component';

@NgModule({
  imports: [
    NzInputNumberComponent,
    NzInputAddonBeforeDirective,
    NzInputAddonAfterDirective,
    NzInputPrefixDirective,
    NzInputSuffixDirective
  ],
  exports: [
    NzInputNumberComponent,
    NzInputAddonBeforeDirective,
    NzInputAddonAfterDirective,
    NzInputPrefixDirective,
    NzInputSuffixDirective
  ]
})
export class NzInputNumberModule {}
