import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from '../core/addon/addon.module';
import { NzNoAnimationModule } from '../core/no-animation/nz-no-animation.module';
import { NzOverlayModule } from '../core/overlay/nz-overlay.module';
// NOTE: the `t` is not uppercase in directive. Change this would however introduce break change.
import { NzToolTipComponent } from './nz-tooltip.component';
import { NzTooltipDirective } from './nz-tooltip.directive';

@NgModule({
  declarations   : [ NzToolTipComponent, NzTooltipDirective ],
  exports        : [ NzToolTipComponent, NzTooltipDirective ],
  imports        : [ CommonModule, OverlayModule, NzAddOnModule, NzOverlayModule, NzNoAnimationModule ],
  entryComponents: [ NzToolTipComponent ]
})
export class NzToolTipModule {
}
