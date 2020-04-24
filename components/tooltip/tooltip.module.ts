/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzFollowScrollDirective } from './follow-scroll.directive';
// NOTE: the `t` is not uppercase in directives. Change this would however introduce breaking change.
import { NzToolTipComponent, NzTooltipDirective } from './tooltip';

@NgModule({
  declarations: [NzToolTipComponent, NzTooltipDirective, NzFollowScrollDirective],
  exports: [NzToolTipComponent, NzTooltipDirective, NzFollowScrollDirective],
  entryComponents: [NzToolTipComponent],
  imports: [CommonModule, OverlayModule, NzOutletModule, NzOverlayModule, NzNoAnimationModule],
  providers: [NzFollowScrollDirective]
})
export class NzToolTipModule {}
