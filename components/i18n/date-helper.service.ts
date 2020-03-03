/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { formatDate } from '@angular/common';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import fnsFormat from 'date-fns/format';
import fnsGetISOWeek from 'date-fns/getISOWeek';
import fnsParse from 'date-fns/parse';

import parseISO from 'date-fns/parseISO';
import { mergeDateConfig, NZ_DATE_CONFIG, NzDateConfig, WeekDayIndex } from './date-config';
import { NzI18nService } from './nz-i18n.service';

export function DATE_HELPER_SERVICE_FACTORY(injector: Injector, config: NzDateConfig): DateHelperService {
  const i18n = injector.get(NzI18nService);
  return i18n.getDateLocale() ? new DateHelperByDateFns(i18n, config) : new DateHelperByDatePipe(i18n, config);
}

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
  relyOnDatePipe: boolean = this instanceof DateHelperByDatePipe; // Indicate whether this service is rely on DatePipe

  constructor(protected i18n: NzI18nService, @Optional() @Inject(NZ_DATE_CONFIG) protected config: NzDateConfig) {
    this.config = mergeDateConfig(this.config);
  }

  abstract getISOWeek(date: Date): number;
  abstract getFirstDayOfWeek(): WeekDayIndex;
  abstract format(date: Date, formatStr: string): string;
  abstract parseDate(text: string, formatStr?: string): Date;

  parseTime(text: string): Date | undefined {
    if (!text) {
      return;
    }
    return parseISO(`1970-01-01 ${text}`);
  }
}

/**
 * DateHelper that handles date formats with date-fns
 */
export class DateHelperByDateFns extends DateHelperService {
  getISOWeek(date: Date): number {
    return fnsGetISOWeek(date);
  }

  // TODO: Use date-fns's "weekStartsOn" to support different locale when "config.firstDayOfWeek" is null
  // when v2.0 is ready: https://github.com/date-fns/date-fns/blob/v2.0.0-alpha.27/src/locale/en-US/index.js#L23
  getFirstDayOfWeek(): WeekDayIndex {
    return this.config.firstDayOfWeek == null ? 1 : this.config.firstDayOfWeek;
  }

  /**
   * Format a date
   * @see https://date-fns.org/docs/format#description
   * @param date Date
   * @param formatStr format string
   */
  format(date: Date | null, formatStr: string): string {
    return date ? fnsFormat(date, formatStr, { locale: this.i18n.getDateLocale() }) : '';
  }

  parseDate(text: string, formatStr: string): Date {
    return fnsParse(text, formatStr, new Date(), {
      locale: this.i18n.getDateLocale(),
      weekStartsOn: this.getFirstDayOfWeek()
    });
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

  getISOWeek(date: Date): number {
    return +this.format(date, 'w');
  }

  getFirstDayOfWeek(): WeekDayIndex {
    if (this.config.firstDayOfWeek === undefined) {
      const locale = this.i18n.getLocaleId();
      return locale && ['zh-cn', 'zh-tw'].indexOf(locale.toLowerCase()) > -1 ? 1 : 0;
    }
    return this.config.firstDayOfWeek;
  }

  format(date: Date | null, formatStr: string): string {
    return date ? formatDate(date, formatStr, this.i18n.getLocaleId())! : '';
  }

  parseDate(text: string): Date {
    return new Date(text);
  }
}
