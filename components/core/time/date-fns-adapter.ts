/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EnvironmentProviders, Injectable, makeEnvironmentProviders, inject } from '@angular/core';

import {
  type Locale,
  addDays,
  addMonths,
  addYears,
  addSeconds,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarQuarters,
  differenceInCalendarYears,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  isSameQuarter,
  isSameSecond,
  isSameYear,
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
  parse as fnsParse,
  formatISO
} from 'date-fns';

import { NzDateAdapter, DateMode } from './date-adapter';
import { NZ_DATE_CONFIG, NZ_DATE_CONFIG_DEFAULT, NZ_DATE_LOCALE, NzDateConfig } from './date-config';

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

  override today(): Date {
    return new Date();
  }

  override createDate(year: number, month: number, date: number): Date {
    return new Date(year, month, date);
  }

  override clone(date: Date): Date {
    return new Date(date);
  }

  // --- Date Getters ---

  override getYear(date: Date): number {
    return date.getFullYear();
  }

  override getMonth(date: Date): number {
    return date.getMonth();
  }

  override getDate(date: Date): number {
    return date.getDate();
  }

  override getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  override getNumDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  // --- Date Names ---

  override getYearName(date: Date): string {
    return fnsFormat(date, 'yyyy', { locale: this.locale });
  }

  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const format: 'MMMMM' | 'MMM' | 'MMMM' = style === 'narrow' ? 'MMMMM' : style === 'short' ? 'MMM' : 'MMMM';
    return Array.from({ length: 12 }, (_, i) => fnsFormat(new Date(2024, i, 1), format, { locale: this.locale }));
  }

  override getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => String(i + 1));
  }

  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const format: 'EEEEEE' | 'EEE' | 'EEEE' = style === 'narrow' ? 'EEEEEE' : style === 'short' ? 'EEE' : 'EEEE';
    return Array.from({ length: 7 }, (_, i) => fnsFormat(new Date(2024, 0, i + 1), format, { locale: this.locale }));
  }

  // --- Week ---

  override getFirstDayOfWeek(): number {
    if (this.dateConfig?.firstDayOfWeek != null) {
      return this.dateConfig.firstDayOfWeek;
    } else {
      return this.locale?.options?.weekStartsOn ?? 1;
    }
  }

  // --- Date Math ---

  override addCalendarYears(date: Date, years: number): Date {
    return addYears(date, years);
  }

  override addCalendarMonths(date: Date, months: number): Date {
    return addMonths(date, months);
  }

  override addCalendarDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  // --- Format / Parse ---

  override format(date: Date, displayFormat: unknown): string {
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

  override parse(value: unknown, parseFormat: unknown): Date | null {
    if (!value) {
      return null;
    }
    if (value instanceof Date) {
      return new Date(value);
    }
    if (typeof value === 'number') {
      return new Date(value);
    }
    if (typeof value === 'string') {
      // Convert Angular-style bracket literals to date-fns single-quote literals
      const formatString = (parseFormat as string).replace(/\[(.*?)\]/g, "'$1'");
      return fnsParse(value, formatString, new Date(), {
        locale: this.locale,
        weekStartsOn: this.getFirstDayOfWeek() as 0 | 1 | 2 | 3 | 4 | 5 | 6,
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true
      });
    }
    return null;
  }

  // --- Validation ---

  override isDateInstance(obj: unknown): boolean {
    return obj instanceof Date;
  }

  override isValid(date: Date): boolean {
    return isValid(date);
  }

  override invalid(): Date {
    return new Date(NaN);
  }

  // --- Serialization ---

  override toIso8601(date: Date): string {
    return formatISO(date);
  }

  // =============================================================
  // NG-ZORRO CORE: ABSTRACT METHODS
  // =============================================================

  override getQuarter(date: Date): number {
    return getQuarter(date);
  }

  override setQuarter(date: Date, quarter: number): Date {
    return setQuarter(date, quarter);
  }

  override startOfQuarter(date: Date): Date {
    return startOfQuarter(date);
  }

  override getISOWeek(date: Date): number {
    return getISOWeek(date);
  }

  // --- NG-ZORRO Date Setters ---

  override setYear(date: Date, year: number): Date {
    return setYear(date, year);
  }

  override setMonth(date: Date, month: number): Date {
    return setMonth(date, month);
  }

  override setDate(date: Date, day: number): Date {
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

  override parseTime(value: unknown, parseFormat?: unknown): Date | null {
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

  // =============================================================
  // NG-ZORRO DERIVED: MODE-BASED COMPARISON
  // =============================================================

  override compareDateWithMode(first: Date, second: Date, mode: DateMode): number {
    // Use date-fns functions for efficiency where available
    if (mode === 'decade') {
      return Math.floor(this.getYear(first) / 10) - Math.floor(this.getYear(second) / 10);
    }
    if (mode === 'year') {
      return differenceInCalendarYears(first, second);
    }
    if (mode === 'quarter') {
      return differenceInCalendarQuarters(first, second);
    }
    if (mode === 'month') {
      return differenceInCalendarMonths(first, second);
    }
    if (mode === 'day') {
      return differenceInCalendarDays(first, second);
    }
    if (mode === 'hour') {
      return differenceInHours(first, second);
    }
    if (mode === 'minute') {
      return differenceInMinutes(first, second);
    }
    if (mode === 'second') {
      return differenceInSeconds(first, second);
    }
    return super.compareDateWithMode(first, second, mode);
  }

  override isSameWithMode(first: Date | null, second: Date | null, mode: DateMode): boolean {
    if (!first || !second) {
      return first === second;
    }
    if (!this.isValid(first) || !this.isValid(second)) {
      return false;
    }
    switch (mode) {
      case 'decade':
        return Math.floor(this.getYear(first) / 10) === Math.floor(this.getYear(second) / 10);
      case 'year':
        return isSameYear(first, second);
      case 'quarter':
        return isSameQuarter(first, second);
      case 'month':
        return isSameMonth(first, second);
      case 'day':
        return isSameDay(first, second);
      case 'hour':
        return isSameHour(first, second);
      case 'minute':
        return isSameMinute(first, second);
      case 'second':
        return isSameSecond(first, second);
      default:
        return isSameDay(first, second);
    }
  }

  override isBeforeWithMode(first: Date | null, second: Date | null, mode: DateMode): boolean {
    if (!first || !second) {
      return false;
    }
    switch (mode) {
      case 'year':
        return differenceInCalendarYears(first, second) < 0;
      case 'quarter':
        return differenceInCalendarQuarters(first, second) < 0;
      case 'month':
        return differenceInCalendarMonths(first, second) < 0;
      case 'day':
        return differenceInCalendarDays(first, second) < 0;
      case 'hour':
        return differenceInHours(first, second) < 0;
      case 'minute':
        return differenceInMinutes(first, second) < 0;
      case 'second':
        return differenceInSeconds(first, second) < 0;
      default:
        return differenceInCalendarDays(first, second) < 0;
    }
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
 *   providers: [provideNzDateFnsAdapter()]
 * };
 * ```
 *
 * @note Requires date-fns as a peer dependency.
 */
export function provideNzDateFnsAdapter(config?: NzDateConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    DateFnsDateAdapter,
    { provide: NzDateAdapter, useExisting: DateFnsDateAdapter },
    { provide: NZ_DATE_CONFIG, useValue: { ...NZ_DATE_CONFIG_DEFAULT, ...config } }
  ]);
}
