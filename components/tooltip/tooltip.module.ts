/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';

// NOTE: the `t` is not uppercase in directives. Change this would however introduce breaking change.
import { NzToolTipComponent, NzTooltipDirective } from './tooltip';

@NgModule({
  declarations: [NzToolTipComponent, NzTooltipDirective],
  exports: [NzToolTipComponent, NzTooltipDirective],
  imports: [BidiModule, CommonModule, OverlayModule, NzOutletModule, NzOverlayModule, NzNoAnimationModule]
})
export class NzToolTipModule {}
