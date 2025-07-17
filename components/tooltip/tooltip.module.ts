/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzTooltipComponent, NzTooltipDirective } from './tooltip';

@NgModule({
  imports: [NzTooltipComponent, NzTooltipDirective],
  exports: [NzTooltipComponent, NzTooltipDirective]
})
export class NzTooltipModule {}

/**
 * @deprecated Use {@link NzTooltipModule} instead.
 * This will be removed in v21.0.0.
 */
export const NzToolTipModule = NzTooltipModule;
