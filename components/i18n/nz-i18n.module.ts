/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { DateHelperServiceModule } from './date-helper.service.module';
import { NzI18nPipe } from './nz-i18n.pipe';
import { NzI18nServiceModule } from './nz-i18n.service.module';

@NgModule({
  imports: [DateHelperServiceModule, NzI18nServiceModule],
  declarations: [NzI18nPipe],
  exports: [NzI18nPipe]
})
export class NzI18nModule {}
