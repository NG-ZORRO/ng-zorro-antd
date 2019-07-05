/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAddOnModule, NzNoAnimationModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzPopconfirmComponent } from './nz-popconfirm.component';
import { NzPopconfirmDirective } from './nz-popconfirm.directive';

@NgModule({
  declarations: [NzPopconfirmComponent, NzPopconfirmDirective],
  exports: [NzPopconfirmComponent, NzPopconfirmDirective],
  imports: [
    CommonModule,
    NzButtonModule,
    OverlayModule,
    NzI18nModule,
    NzIconModule,
    NzAddOnModule,
    NzOverlayModule,
    NzNoAnimationModule,
    NzToolTipModule
  ],
  entryComponents: [NzPopconfirmComponent]
})
export class NzPopconfirmModule {}
