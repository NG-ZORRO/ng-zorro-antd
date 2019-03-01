import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from '../button/nz-button.module';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzNoAnimationModule } from '../core/no-animation/nz-no-animation.module';
import { NzOverlayModule } from '../core/overlay/nz-overlay.module';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzPopconfirmComponent } from './nz-popconfirm.component';
import { NzPopconfirmDirective } from './nz-popconfirm.directive';

@NgModule({
  declarations   : [ NzPopconfirmComponent, NzPopconfirmDirective ],
  exports        : [ NzPopconfirmComponent, NzPopconfirmDirective ],
  imports        : [
    CommonModule,
    NzButtonModule,
    OverlayModule,
    NzI18nModule,
    NzIconModule,
    NzAddOnModule,
    NzOverlayModule,
    NzNoAnimationModule
  ],
  entryComponents: [ NzPopconfirmComponent ]
})

export class NzPopconfirmModule {
}
