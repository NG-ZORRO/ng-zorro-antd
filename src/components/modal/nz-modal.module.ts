import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzModalComponent } from './nz-modal.component';
import { NzConfirmComponent } from './nz-confirm.component';
import { NzModalService } from './nz-modal.service';
import { NzModalSubject } from './nz-modal-subject.service';

import { NzLocaleModule } from '../locale/index';
import { NzButtonModule } from '../button/nz-button.module';

@NgModule({
  entryComponents: [ NzModalComponent, NzConfirmComponent ],
  providers      : [ NzModalSubject, NzModalService ],
  declarations   : [ NzModalComponent, NzConfirmComponent ],
  exports        : [ NzModalComponent, NzConfirmComponent ],
  imports        : [ CommonModule, NzLocaleModule, NzButtonModule ]
})

export class NzModalModule {
}
