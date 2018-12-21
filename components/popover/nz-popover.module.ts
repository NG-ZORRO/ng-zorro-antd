import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from '../core/addon/addon.module';

import { NzPopoverComponent } from './nz-popover.component';
import { NzPopoverDirective } from './nz-popover.directive';

@NgModule({
  entryComponents: [ NzPopoverComponent ],
  exports        : [ NzPopoverDirective, NzPopoverComponent ],
  declarations   : [ NzPopoverDirective, NzPopoverComponent ],
  imports        : [ CommonModule, OverlayModule, NzAddOnModule ]
})

export class NzPopoverModule {
}
