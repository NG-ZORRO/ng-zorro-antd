/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

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
    CommonModule,
    BidiModule,
    OverlayModule,
    NzOutletModule,
    PortalModule,
    NzI18nModule,
    NzButtonModule,
    NzIconModule,
    NzPipesModule,
    NzNoAnimationModule,
    NzPipesModule
  ],
  exports: [NzModalComponent, NzModalFooterDirective, NzModalContentDirective, NzModalTitleDirective],
  providers: [NzModalService],
  declarations: [
    NzModalComponent,
    NzModalFooterDirective,
    NzModalContentDirective,
    NzModalCloseComponent,
    NzModalFooterComponent,
    NzModalTitleComponent,
    NzModalTitleDirective,
    NzModalContainerComponent,
    NzModalConfirmContainerComponent,
    NzModalComponent
  ]
})
export class NzModalModule {}
