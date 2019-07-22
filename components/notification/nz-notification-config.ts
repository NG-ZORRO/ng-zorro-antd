/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

import { NzMessageConfigLegacy } from 'ng-zorro-antd/message';

/**
 * @deprecated This interface would has been moved to `ng-zorro-antd/core`. Please migrate to that.
 */
export interface NzNotificationConfigLegacy extends NzMessageConfigLegacy {
  nzTop?: string | number;
  nzBottom?: string | number;
  nzPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | string;
}

export const NZ_NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<NzNotificationConfigLegacy>(
  'NZ_NOTIFICATION_DEFAULT_CONFIG'
);

export const NZ_NOTIFICATION_CONFIG = new InjectionToken<NzNotificationConfigLegacy>('NZ_NOTIFICATION_CONFIG');

export const NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER = {
  provide: NZ_NOTIFICATION_DEFAULT_CONFIG,
  useValue: {
    nzTop: '24px',
    nzBottom: '24px',
    nzPlacement: 'topRight',
    nzDuration: 4500,
    nzMaxStack: 7,
    nzPauseOnHover: true,
    nzAnimate: true
  }
};
