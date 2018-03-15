import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from '../button/nz-button.module';
import { NzI18nModule } from '../i18n';

import { NzPopconfirmComponent } from './nz-popconfirm.component';
import { NzPopconfirmDirective } from './nz-popconfirm.directive';

@NgModule({
  declarations: [ NzPopconfirmComponent, NzPopconfirmDirective ],
  exports     : [ NzPopconfirmComponent, NzPopconfirmDirective ],
  imports     : [ CommonModule, NzButtonModule, OverlayModule, NzI18nModule ]
})

export class NzPopconfirmModule {
}
