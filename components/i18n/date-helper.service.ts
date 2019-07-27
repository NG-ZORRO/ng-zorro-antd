/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { mergeDateConfig, NzDateConfig, NZ_DATE_CONFIG } from './date-config';
import { NzI18nService } from './nz-i18n.service';

import * as momentNs from 'jalali-moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'jalali-moment';
export function DATE_HELPER_SERVICE_FACTORY(injector: Injector, config: NzDateConfig): DateHelperService {
  const i18n = injector.get(NzI18nService);
  return new DateHelperByDatePipe(i18n, config);
}
const moment = momentNs;
/**
 * Abstract DateHelperService(Token via Class)
 * Compatibility: compact for original usage by default which using DatePipe
 */
@Injectable({
  providedIn: 'root',
  useFactory: DATE_HELPER_SERVICE_FACTORY,
  deps: [Injector, [new Optional(), NZ_DATE_CONFIG]]
})
export abstract class DateHelperService {
  constructor(protected i18n: NzI18nService, @Optional() @Inject(NZ_DATE_CONFIG) protected config: NzDateConfig) {
    this.config = mergeDateConfig(this.config);
  }
  abstract getFirstDayOfWeek(): WeekDayIndex;
  parseTime(text: string): Moment | undefined {
    if (!text) {
      return;
    }
    return moment(`1970-01-01 ${text}`);
  }
}
/**
 * DateHelper that handles date formats with angular's date-pipe
 *
 * @see https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406 - DatePipe may cause non-standard week bug, see:
 *
 */
export class DateHelperByDatePipe extends DateHelperService {
  constructor(i18n: NzI18nService, @Optional() @Inject(NZ_DATE_CONFIG) config: NzDateConfig) {
    super(i18n, config);
  }
  getFirstDayOfWeek(): WeekDayIndex {
    if (this.config.firstDayOfWeek === undefined) {
      const locale = this.i18n.getLocaleId();
      this.i18n.getDateLocale();
      return locale && ['zh-cn', 'zh-tw'].indexOf(locale.toLowerCase()) > -1 ? 1 : 0;
    }
    return this.config.firstDayOfWeek;
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
  transCompatFormat(format: string): string {
    return (
      format &&
      format
        .replace(/Y/g, 'Y') // only support y, yy, yyy, yyyy
        .replace(/D/g, 'D')
    ); // d, dd represent of D, DD for momentjs, others are not support
  }
}

//////////

export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
