import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from '../button/nz-button.module';
import { LoggerModule } from '../core/util/logger/logger.module';
import { NzLocaleModule } from '../locale/nz-locale.module';

import { CssUnitPipe } from './css-unit.pipe';
import { NzModalComponent } from './nz-modal.component';
import { NzModalService } from './nz-modal.service';

@NgModule({
  imports: [ CommonModule, OverlayModule, NzLocaleModule, NzButtonModule, LoggerModule ],
  exports: [ NzModalComponent ],
  declarations: [ NzModalComponent, CssUnitPipe ],
  entryComponents: [ NzModalComponent ],
  providers: [ NzModalService ]
})
export class NzModalModule { }
