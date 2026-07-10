/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EnvironmentProviders, Injectable, inject } from '@angular/core';

import {
  type Locale,
  addDays,
  addMonths,
  addYears,
  addSeconds,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isToday,
  isValid,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
  startOfQuarter,
  getQuarter,
  setQuarter,
  getISOWeek,
  getDaysInMonth,
  format as fnsFormat,
  parse as fnsParse
} from 'date-fns';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzDateAdapter, NzDateAdapterConfig, provideNzDateAdapter } from './date-adapter';
import { NZ_DATE_CONFIG, NZ_DATE_LOCALE } from './date-config';

/** Configuration for date-fns date adapter. */
export interface NzDateFnsAdapterConfig extends NzDateAdapterConfig<Locale> {
  /** Locale object from date-fns. */
  locale?: Locale;
}

/**
 * Date adapter for date-fns.
 *
 * To use this adapter, add `provideNzDateFnsAdapter()` to your application providers.
 *
 * @note Requires date-fns as a peer dependency.
 */
@Injectable({ providedIn: 'root' })
export class DateFnsDateAdapter extends NzDateAdapter<Date, Locale> {
  private readonly dateLocale = inject(NZ_DATE_LOCALE, { optional: true });
  private readonly dateConfig = inject(NZ_DATE_CONFIG, { optional: true });

  constructor() {
    super();
    if (this.dateLocale) {
      super.setLocale(this.dateLocale as Locale);
    }
  }

  // =============================================================
  // MATERIAL CORE: ABSTRACT METHODS
  // =============================================================

  today(): Date {
    return new Date();
  }

  createDate(year: number, month: number, date: number): Date {
    return new Date(year, month, date);
  }

  clone(date: Date): Date {
    return new Date(date);
  }

  // --- Date Getters ---

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getMonth(date: Date): number {
    return date.getMonth();
  }

  getDate(date: Date): number {
    return date.getDate();
  }

  getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  getNumDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  // --- Date Names ---

  getYearName(date: Date): string {
    return fnsFormat(date, 'yyyy', { locale: this.locale });
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const format: 'MMMMM' | 'MMM' | 'MMMM' = style === 'narrow' ? 'MMMMM' : style === 'short' ? 'MMM' : 'MMMM';
    return Array.from({ length: 12 }, (_, i) => fnsFormat(new Date(2024, i, 1), format, { locale: this.locale }));
  }

  getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => String(i + 1));
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const format: 'EEEEEE' | 'EEE' | 'EEEE' = style === 'narrow' ? 'EEEEEE' : style === 'short' ? 'EEE' : 'EEEE';
    return Array.from({ length: 7 }, (_, i) => fnsFormat(new Date(2024, 0, i + 1), format, { locale: this.locale }));
  }

  // --- Week ---

  getFirstDayOfWeek(): number {
    if (this.dateConfig?.firstDayOfWeek != null) {
      return this.dateConfig.firstDayOfWeek;
    } else {
      return this.locale?.options?.weekStartsOn ?? 1;
    }
  }

  // --- Date Math ---

  addCalendarYears(date: Date, years: number): Date {
    return addYears(date, years);
  }

  addCalendarMonths(date: Date, months: number): Date {
    return addMonths(date, months);
  }

  addCalendarDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  // --- Format / Parse ---

  format(date: Date, displayFormat: NzSafeAny): string {
    if (!date) {
      return '';
    }
    if (!this.isValid(date)) {
      throw new Error('DateFnsDateAdapter: Cannot format invalid date.');
    }
    // Convert Angular-style bracket literals to date-fns single-quote literals
    // e.g., 'yyyy-[Q]Q' → 'yyyy-'Q'Q'
    const formatString = (displayFormat as string).replace(/\[(.*?)\]/g, "'$1'");
    return fnsFormat(date, formatString, {
      locale: this.locale,
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true
    });
  }

  parse(value: NzSafeAny, parseFormat: NzSafeAny): Date | null {
    if (typeof value === 'string' && value.length > 0) {
      const formats = Array.isArray(parseFormat) ? parseFormat : [parseFormat as string];

      if (!formats.length) {
        throw new Error('Formats array must not be empty.');
      }

      for (const currentFormat of formats) {
        // Convert Angular-style bracket literals to date-fns single-quote literals
        const formatString = currentFormat.replace(/\[(.*?)\]/g, "'$1'");
        const fromFormat = fnsParse(value, formatString, new Date(), {
          locale: this.locale,
          weekStartsOn: this.getFirstDayOfWeek() as 0 | 1 | 2 | 3 | 4 | 5 | 6,
          useAdditionalWeekYearTokens: true,
          useAdditionalDayOfYearTokens: true
        });

        if (this.isValid(fromFormat)) {
          return fromFormat;
        }
      }

      return this.invalid();
    } else if (typeof value === 'number') {
      return new Date(value);
    } else if (value instanceof Date) {
      return this.clone(value);
    }

    return null;
  }

  // --- Validation ---

  isDateInstance(obj: NzSafeAny): boolean {
    return obj instanceof Date;
  }

  isValid(date: Date): boolean {
    return isValid(date);
  }

  invalid(): Date {
    return new Date(NaN);
  }

  // =============================================================
  // NG-ZORRO CORE: ABSTRACT METHODS
  // =============================================================

  getQuarter(date: Date): number {
    return getQuarter(date);
  }

  setQuarter(date: Date, quarter: number): Date {
    return setQuarter(date, quarter);
  }

  startOfQuarter(date: Date): Date {
    return startOfQuarter(date);
  }

  getISOWeek(date: Date): number {
    return getISOWeek(date);
  }

  // --- NG-ZORRO Date Setters ---

  setYear(date: Date, year: number): Date {
    return setYear(date, year);
  }

  setMonth(date: Date, month: number): Date {
    return setMonth(date, month);
  }

  setDate(date: Date, day: number): Date {
    const result = new Date(date);
    result.setDate(day);
    return result;
  }

  // =============================================================
  // MATERIAL OPTIONAL: TIME METHODS
  // =============================================================

  override setTime(date: Date, hours: number, minutes: number, seconds: number): Date {
    const result = new Date(date);
    result.setHours(hours, minutes, seconds, 0);
    return result;
  }

  override getHours(date: Date): number {
    return date.getHours();
  }

  override getMinutes(date: Date): number {
    return date.getMinutes();
  }

  override getSeconds(date: Date): number {
    return date.getSeconds();
  }

  override parseTime(value: NzSafeAny, parseFormat?: NzSafeAny): Date | null {
    return this.parse(value, parseFormat);
  }

  override addSeconds(date: Date, amount: number): Date {
    return addSeconds(date, amount);
  }

  // =============================================================
  // NG-ZORRO OPTIONAL: EXTENDED METHODS
  // =============================================================

  override getMilliseconds(date: Date): number {
    return date.getMilliseconds();
  }

  override getTime(date: Date): number {
    return date.getTime();
  }

  override isFirstDayOfMonth(date: Date): boolean {
    return isFirstDayOfMonth(date);
  }

  override isLastDayOfMonth(date: Date): boolean {
    return isLastDayOfMonth(date);
  }

  override isToday(date: Date): boolean {
    return isToday(date);
  }

  override calendarStartOfMonth(date: Date): Date {
    return startOfMonth(date);
  }

  override calendarStartOfWeek(date: Date): Date {
    return startOfWeek(date, { weekStartsOn: this.getFirstDayOfWeek() as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  }
}

/**
 * Provides the DateFnsDateAdapter as the NzDateAdapter implementation.
 * DateFnsDateAdapter uses date-fns library for date operations.
 *
 * @param config Optional configuration for the adapter
 * @returns EnvironmentProviders for the DateFnsDateAdapter
 *
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideNzDateFnsAdapter({ locale: enUS, firstDayOfWeek: 1 })]
 * };
 * ```
 *
 * @note Requires date-fns as a peer dependency.
 */
export function provideNzDateFnsAdapter(config?: NzDateFnsAdapterConfig): EnvironmentProviders {
  return provideNzDateAdapter(DateFnsDateAdapter, config);
}
