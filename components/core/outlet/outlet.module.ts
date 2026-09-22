/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzStringTemplateOutletDirective } from './string-template-outlet.directive';
import { NzTypeHintDirective } from './type-hint.directive';

@NgModule({
  imports: [NzStringTemplateOutletDirective, NzTypeHintDirective],
  exports: [NzStringTemplateOutletDirective, NzTypeHintDirective]
})
export class NzOutletModule {}
