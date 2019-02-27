import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from '../core/addon/addon.module';
import { NzNoAnimationModule } from '../core/no-animation/nz-no-animation.module';
import { NzOverlayModule } from '../core/overlay/nz-overlay.module';

import { NzPopoverComponent } from './nz-popover.component';
import { NzPopoverDirective } from './nz-popover.directive';

@NgModule({
  entryComponents: [ NzPopoverComponent ],
  exports        : [ NzPopoverDirective, NzPopoverComponent ],
  declarations   : [ NzPopoverDirective, NzPopoverComponent ],
  imports        : [ CommonModule, OverlayModule, NzAddOnModule, NzOverlayModule, NzNoAnimationModule ]
})

export class NzPopoverModule {
}
