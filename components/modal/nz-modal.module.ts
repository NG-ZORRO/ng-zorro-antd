/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule, NzOutletModule, NzPipesModule } from 'ng-zorro-antd/core';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzModalCloseComponent } from './modal-close.component';
import { NzModalConfirmContainerComponent } from './modal-confirm-container.component';
import { NzModalContainerComponent } from './modal-container.component';
import { NzModalFooterComponent } from './modal-footer.component';
import { NzModalTitleComponent } from './modal-title.component';
import { NzModal2Component } from './modal.component';
import { NzModalControlServiceModule } from './nz-modal-control.service.module';
import { NzModalFooterDirective } from './nz-modal-footer.directive';
import { NzModalComponent } from './nz-modal.component';
import { NzModalServiceModule } from './nz-modal.service.module';

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
    NzNoAnimationModule,
    NzModalServiceModule,
    NzModalControlServiceModule
  ],
  exports: [NzModalComponent, NzModal2Component, NzModalFooterDirective, NzModalContainerComponent, NzModalConfirmContainerComponent],
  declarations: [
    NzModalComponent,
    NzModalFooterDirective,
    NzModalCloseComponent,
    NzModalFooterComponent,
    NzModalTitleComponent,
    NzModalContainerComponent,
    NzModalConfirmContainerComponent,
    NzModal2Component
  ],
  entryComponents: [NzModalComponent, NzModalContainerComponent]
})
export class NzModalModule {}
