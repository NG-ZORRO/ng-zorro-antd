/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { LOGGER_SERVICE_PROVIDER, NZ_LOGGER_STATE } from './logger.service';

@NgModule({
  providers: [{ provide: NZ_LOGGER_STATE, useValue: false }, LOGGER_SERVICE_PROVIDER]
})
export class LoggerModule {}
