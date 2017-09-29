import { NgModule } from '@angular/core';
import { NzToolTipComponent } from './nz-tooltip.component';
import { NzTooltipDirective } from './nz-tooltip.directive';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
@NgModule({
  declarations   : [ NzToolTipComponent, NzTooltipDirective ],
  exports        : [ NzToolTipComponent, NzTooltipDirective ],
  imports        : [ CommonModule, OverlayModule ],
  entryComponents: [ NzToolTipComponent ]
})

export class NzToolTipModule {
}
