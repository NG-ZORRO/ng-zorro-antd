/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzModalCloseComponent } from './modal-close.component';
import { NzModalConfirmContainerComponent } from './modal-confirm-container.component';
import { NzModalContainerComponent } from './modal-container.component';
import { NzModalContentDirective } from './modal-content.directive';
import { NzModalFooterComponent } from './modal-footer.component';
import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalTitleComponent } from './modal-title.component';
import { NzModalTitleDirective } from './modal-title.directive';
import { NzModalComponent } from './modal.component';
import { NzModalService } from './modal.service';

@NgModule({
  imports: [
    NzModalComponent,
    NzModalFooterDirective,
    NzModalContentDirective,
    NzModalCloseComponent,
    NzModalFooterComponent,
    NzModalTitleComponent,
    NzModalTitleDirective,
    NzModalContainerComponent,
    NzModalConfirmContainerComponent
  ],
  exports: [NzModalComponent, NzModalFooterDirective, NzModalContentDirective, NzModalTitleDirective],
  providers: [NzModalService]
})
export class NzModalModule {}
