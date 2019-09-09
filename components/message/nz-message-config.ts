/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

/**
 * @deprecated This interface has been removed to `ng-zorro-antd/core`. Please migrate to that.
 */
export interface NzMessageConfigLegacy {
  nzAnimate?: boolean;
  nzDuration?: number;
  nzMaxStack?: number;
  nzPauseOnHover?: boolean;
  nzTop?: number | string;
}

export const NZ_MESSAGE_DEFAULT_CONFIG = new InjectionToken<NzMessageConfigLegacy>('NZ_MESSAGE_DEFAULT_CONFIG');

/**
 * @deprecated 9.0.0 - Injection token 'NZ_MESSAGE_CONFIG' is deprecated and will be removed in 9.0.0. Please use 'NzConfigService' instead.
 */
export const NZ_MESSAGE_CONFIG = new InjectionToken<NzMessageConfigLegacy>('NZ_MESSAGE_CONFIG');

export const NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
  provide: NZ_MESSAGE_DEFAULT_CONFIG,
  useValue: {
    nzAnimate: true,
    nzDuration: 3000,
    nzMaxStack: 7,
    nzPauseOnHover: true,
    nzTop: 24
  }
};
