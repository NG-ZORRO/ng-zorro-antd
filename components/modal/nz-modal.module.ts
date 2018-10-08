import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from '../button/nz-button.module';
import { LoggerModule } from '../core/util/logger/logger.module';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';

import { CssUnitPipe } from './css-unit.pipe';
import { NzModalControlService } from './nz-modal-control.service';
import { NzModalComponent } from './nz-modal.component';
import { NzModalService } from './nz-modal.service';

@NgModule({
  imports        : [ CommonModule, OverlayModule, NzI18nModule, NzButtonModule, LoggerModule, NzIconModule ],
  exports        : [ NzModalComponent ],
  declarations   : [ NzModalComponent, CssUnitPipe ],
  entryComponents: [ NzModalComponent ],
  providers      : [ NzModalControlService, NzModalService ]
})
export class NzModalModule {
}
