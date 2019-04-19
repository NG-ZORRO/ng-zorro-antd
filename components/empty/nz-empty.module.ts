/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzEmbedEmptyComponent } from './nz-embed-empty.component';
import { NzEmptyComponent } from './nz-empty.component';

@NgModule({
  imports: [CommonModule, PortalModule, NzAddOnModule, NzI18nModule],
  declarations: [NzEmptyComponent, NzEmbedEmptyComponent],
  exports: [NzEmptyComponent, NzEmbedEmptyComponent]
})
export class NzEmptyModule {}
