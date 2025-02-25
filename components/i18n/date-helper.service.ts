/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { formatDate } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { format as fnsFormat, getISOWeek as fnsGetISOWeek, parse as fnsParse, getQuarter } from 'date-fns';

import { WeekDayIndex, ɵNgTimeParser } from 'ng-zorro-antd/core/time';

import { NZ_DATE_CONFIG, NzDateConfig, mergeDateConfig } from './date-config';
import { NzI18nService } from './nz-i18n.service';

export function DATE_HELPER_SERVICE_FACTORY(): DateHelperService {
  const i18n = inject(NzI18nService);
  return i18n.getDateLocale() ? new DateHelperByDateFns(i18n) : new DateHelperByDatePipe(i18n);
}

/**
 * Abstract DateHelperService(Token via Class)
 * Compatibility: compact for original usage by default which using DatePipe
 */
@Injectable({
  providedIn: 'root',
  useFactory: DATE_HELPER_SERVICE_FACTORY
})
export abstract class DateHelperService {
  protected config: NzDateConfig = mergeDateConfig(inject(NZ_DATE_CONFIG, { optional: true }));

  constructor(protected i18n: NzI18nService) {}

  abstract getISOWeek(date: Date): number;
  abstract getFirstDayOfWeek(): WeekDayIndex;
  abstract format(date: Date | null, formatStr: string): string;
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
    } catch {
      defaultWeekStartsOn = 1;
    }
    return this.config.firstDayOfWeek == null ? defaultWeekStartsOn : this.config.firstDayOfWeek;
  }

  /**
   * Format a date
   *
   * @see https://date-fns.org/docs/format#description
   * @param date Date
   * @param formatStr format string
   */
  format(date: Date, formatStr: string): string {
    return date ? fnsFormat(date, formatStr, { locale: this.i18n.getDateLocale() }) : '';
  }

  parseDate(text: string, formatStr: string): Date {
    return fnsParse(text, formatStr, new Date(), {
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
    // angular formatDate does not support the quarter format parameter. This is to be compatible with the quarter format "Q" of date-fns.
    return date ? this.replaceQuarter(formatDate(date, formatStr, this.i18n.getLocaleId())!, date) : '';
  }

  parseDate(text: string): Date {
    return new Date(text);
  }

  parseTime(text: string, formatStr: string): Date {
    const parser = new ɵNgTimeParser(formatStr, this.i18n.getLocaleId());
    return parser.toDate(text);
  }

  private replaceQuarter(dateStr: string, date: Date): string {
    const quarter = getQuarter(date).toString();
    const record: Record<string, string> = { Q: quarter, QQ: `0${quarter}`, QQQ: `Q${quarter}` };
    // Q Pattern format compatible with date-fns (quarter).
    return (
      dateStr
        // Match Q+ outside of brackets, then replace it with the specified quarterly format
        .replace(/Q+(?![^[]*])/g, match => record[match] ?? quarter)
        // Match the Q+ surrounded by bracket, then remove bracket.
        .replace(/\[(Q+)]/g, '$1')
    );
  }
}
