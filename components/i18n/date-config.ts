/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';
import { WeekDayIndex } from 'ng-zorro-antd/core';

export interface NzDateConfig {
  /** Customize the first day of a week */
  firstDayOfWeek?: WeekDayIndex;
}

export const NZ_DATE_CONFIG = new InjectionToken<NzDateConfig>('date-config');

export const NZ_DATE_CONFIG_DEFAULT: NzDateConfig = {
  firstDayOfWeek: undefined
};

export const NZ_DATE_FORMAT_CONVERT = new InjectionToken<boolean>('date-format-convert');

export function mergeDateConfig(config: NzDateConfig): NzDateConfig {
  return { ...NZ_DATE_CONFIG_DEFAULT, ...config };
}

/**
 * Compatible translate the moment-like format pattern to angular's pattern
 * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
 *
 * TODO: compare and complete all format patterns
 * Each format docs as below:
 * @link https://momentjs.com/docs/#/displaying/format/
 * @link https://angular.io/api/common/DatePipe#description
 * @param format input format pattern
 */
export function transCompatFormat(format: string): string {
  return (
    format &&
    format
      .replace(/Y/g, 'y') // only support y, yy, yyy, yyyy
      .replace(/D/g, 'd')
  ); // d, dd represent of D, DD for momentjs, others are not support
}
