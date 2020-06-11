/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzPipesModule } from 'ng-zorro-antd/core/pipe';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzModalCloseComponent } from './modal-close.component';
import { NzModalConfirmContainerComponent } from './modal-confirm-container.component';
import { NzModalContainerComponent } from './modal-container.component';
import { NzModalFooterComponent } from './modal-footer.component';
import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalTitleComponent } from './modal-title.component';
import { NzModalComponent } from './modal.component';
import { NzModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    NzOutletModule,
    PortalModule,
    NzI18nModule,
    NzButtonModule,
    NzIconModule,
    NzPipesModule,
    NzNoAnimationModule
  ],
  exports: [NzModalComponent, NzModalFooterDirective],
  providers: [NzModalService],
  entryComponents: [NzModalContainerComponent, NzModalConfirmContainerComponent],
  declarations: [
    NzModalComponent,
    NzModalFooterDirective,
    NzModalCloseComponent,
    NzModalFooterComponent,
    NzModalTitleComponent,
    NzModalContainerComponent,
    NzModalConfirmContainerComponent,
    NzModalComponent
  ]
})
export class NzModalModule {}
