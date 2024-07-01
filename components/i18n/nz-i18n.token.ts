/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, makeEnvironmentProviders, EnvironmentProviders } from '@angular/core';

import { DateLocale, NzI18nInterface } from './nz-i18n.interface';

export const NZ_I18N = new InjectionToken<NzI18nInterface>('nz-i18n');

export function provideNzI18n(config: NzI18nInterface): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: NZ_I18N, useValue: config }]);
}

/** Locale for date operations, should import from date-fns, see example: https://github.com/date-fns/date-fns/blob/v1.30.1/src/locale/zh_cn/index.js */
export const NZ_DATE_LOCALE = new InjectionToken<DateLocale>('nz-date-locale');
