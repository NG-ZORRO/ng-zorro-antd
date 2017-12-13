import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from '../button/nz-button.module';
import { NzLocaleModule } from '../locale/index';

import { NzConfirmComponent } from './nz-confirm.component';
import { NzModalSubject } from './nz-modal-subject.service';
import { NzModalComponent } from './nz-modal.component';
import { NzModalService } from './nz-modal.service';

@NgModule({
  entryComponents: [ NzModalComponent, NzConfirmComponent ],
  providers      : [ NzModalSubject, NzModalService ],
  declarations   : [ NzModalComponent, NzConfirmComponent ],
  exports        : [ NzModalComponent, NzConfirmComponent ],
  imports        : [ CommonModule, NzLocaleModule, NzButtonModule ]
})

export class NzModalModule {
}
