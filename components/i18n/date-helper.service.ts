/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { formatDate } from '@angular/common';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import fnsFormat from 'date-fns/format';
import fnsGetISOWeek from 'date-fns/getISOWeek';
import fnsParse from 'date-fns/parse';

import { WeekDayIndex } from 'ng-zorro-antd/core/time';
import { convertTokens } from './convert-tokens';
import { mergeDateConfig, NZ_DATE_CONFIG, NZ_DATE_FNS_COMPATIBLE, NzDateConfig } from './date-config';
import { NzI18nService } from './nz-i18n.service';

export function DATE_HELPER_SERVICE_FACTORY(injector: Injector, config: NzDateConfig, convertFormat: boolean): DateHelperService {
  const i18n = injector.get(NzI18nService);
  return i18n.getDateLocale()
    ? new DateHelperByDateFns(i18n, config, convertFormat)
    : new DateHelperByDatePipe(i18n, config, convertFormat);
}

/**
 * Abstract DateHelperService(Token via Class)
 * Compatibility: compact for original usage by default which using DatePipe
 */
@Injectable({
  providedIn: 'root',
  useFactory: DATE_HELPER_SERVICE_FACTORY,
  deps: [Injector, [new Optional(), NZ_DATE_CONFIG], [new Optional(), NZ_DATE_FNS_COMPATIBLE]]
})
export abstract class DateHelperService {
  constructor(
    protected i18n: NzI18nService,
    @Optional() @Inject(NZ_DATE_CONFIG) protected config: NzDateConfig,
    @Optional() @Inject(NZ_DATE_FNS_COMPATIBLE) protected convertFormat: boolean
  ) {
    this.config = mergeDateConfig(this.config);
  }

  abstract getISOWeek(date: Date): number;
  abstract getFirstDayOfWeek(): WeekDayIndex;
  abstract format(date: Date, formatStr: string): string;
  abstract parseDate(text: string, formatStr?: string): Date;
  abstract parseTime(text: string, formatStr?: string): Date | undefined;
}

/**
 * DateHelper that handles date formats with date-fns
 */
export class DateHelperByDateFns extends DateHelperService {
  getISOWeek(date: Date): number {
    return fnsGetISOWeek(date);
  }

  // Use date-fns's "weekStartsOn" to support different locale when "config.firstDayOfWeek" is null
  // https://github.com/date-fns/date-fns/blob/v2.0.0-alpha.27/src/locale/en-US/index.js#L23
  getFirstDayOfWeek(): WeekDayIndex {
    let defaultWeekStartsOn: WeekDayIndex;
    try {
      defaultWeekStartsOn = this.i18n.getDateLocale().options!.weekStartsOn!;
    } catch (e) {
      defaultWeekStartsOn = 1;
    }
    return this.config.firstDayOfWeek == null ? defaultWeekStartsOn : this.config.firstDayOfWeek;
  }

  /**
   * Format a date
   * @see https://date-fns.org/docs/format#description
   * @param date Date
   * @param formatStr format string
   */
  format(date: Date, formatStr: string): string {
    const mergedStr = this.convertFormat ? convertTokens(formatStr) : formatStr;
    return date ? fnsFormat(date, mergedStr, { locale: this.i18n.getDateLocale() }) : '';
  }

  parseDate(text: string, formatStr: string): Date {
    const mergedStr = this.convertFormat ? convertTokens(formatStr) : formatStr;
    return fnsParse(text, mergedStr, new Date(), {
      locale: this.i18n.getDateLocale(),
      weekStartsOn: this.getFirstDayOfWeek()
    });
  }

  parseTime(text: string, formatStr: string): Date | undefined {
    return this.parseDate(text, formatStr);
  }
}

/**
 * DateHelper that handles date formats with angular's date-pipe
 *
 * @see https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406 - DatePipe may cause non-standard week bug, see:
 *
 */
export class DateHelperByDatePipe extends DateHelperService {
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

  parseTime(text: string): Date | undefined {
    if (!text) {
      return;
    }
    return new Date(Date.parse(`1970-01-01 ${text}`));
  }
}
