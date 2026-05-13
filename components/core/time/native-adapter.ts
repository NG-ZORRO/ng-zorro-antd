/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EnvironmentProviders, Injectable, makeEnvironmentProviders, inject } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzDateAdapter, DateMode } from './date-adapter';
import { NZ_DATE_CONFIG, NZ_DATE_CONFIG_DEFAULT, NZ_DATE_LOCALE, NzDateConfig } from './date-config';

/** Matches strings that look like ISO 8601 dates (e.g. 2024-01-15, 2024-01-15T10:30:00). */
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;

/** Matches time strings in formats like: 10:30, 10:30:45, 10:30 AM, 10.30.45 PM. */
const TIME_REGEX = /^(\d?\d)[:.](\d?\d)(?:[:.](\d?\d))?\s*(AM|PM)?$/i;

/** Creates an array of length `length` with values derived from `valueFunction`. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

/** Checks if a value is within a specified numeric range. */
function inRange(value: number, min: number, max: number): boolean {
  return !isNaN(value) && value >= min && value <= max;
}

/**
 * Zero-dependency date adapter using native Date and Intl.DateTimeFormat.
 * Fully aligned with Angular Material's NativeDateAdapter implementation.
 */
@Injectable()
export class NativeDateAdapter extends NzDateAdapter<Date, string> {
  private readonly dateLocale = inject(NZ_DATE_LOCALE, { optional: true });
  private readonly dateConfig = inject(NZ_DATE_CONFIG, { optional: true });

  constructor() {
    super();
    if (this.dateLocale !== undefined && typeof this.dateLocale === 'string') {
      this.setLocale(this.dateLocale);
    } else {
      this.setLocale('en-US');
    }
  }

  // =============================================================
  // MATERIAL CORE: ABSTRACT METHODS
  // =============================================================

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

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const dtf = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
    return range(12, i => this._format(dtf, new Date(2017, i, 1)));
  }

  getDateNames(): string[] {
    const dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
    return range(31, i => this._format(dtf, new Date(2017, 0, i + 1)));
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const dtf = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
    return range(7, i => this._format(dtf, new Date(2017, 0, i + 1)));
  }

  getYearName(date: Date): string {
    const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
    return this._format(dtf, date);
  }

  getFirstDayOfWeek(): number {
    // Check for configured override first
    if (this.dateConfig?.firstDayOfWeek != null) {
      return this.dateConfig.firstDayOfWeek;
    }
    // Use Intl.Locale API if available (same as Material)
    if (typeof Intl !== 'undefined' && (Intl as NzSafeAny).Locale) {
      const locale = new (Intl as NzSafeAny).Locale(this.locale) as {
        getWeekInfo?: () => { firstDay: number };
        weekInfo?: { firstDay: number };
      };
      const firstDay = (locale.getWeekInfo?.() || locale.weekInfo)?.firstDay ?? 0;
      // weekInfo.firstDay is 1-7 (Mon-Sun), we need 0-6 (Sun-Sat)
      return firstDay === 7 ? 0 : firstDay;
    }
    return 0;
  }

  getNumDaysInMonth(date: Date): number {
    return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  createDate(year: number, month: number, date: number): Date {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (month < 0 || month > 11) {
        throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
      }
      if (date < 1) {
        throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
      }
    }
    const result = this._createDateWithOverflow(year, month, date);
    if (result.getMonth() !== month && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }

  today(): Date {
    return new Date();
  }

  parse(value: unknown, parseFormat: unknown): Date | null {
    if (typeof value === 'number') {
      return new Date(value);
    }
    return value ? new Date(Date.parse(value as string)) : null;
  }

  format(date: Date, displayFormat: unknown): string {
    // NG-ZORRO extension: return empty string for null (Material throws error)
    if (!date) {
      return '';
    }
    if (!this.isValid(date)) {
      throw Error('NativeDateAdapter: Cannot format invalid date.');
    }
    if (typeof displayFormat === 'object' && displayFormat !== null) {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        ...(displayFormat as Intl.DateTimeFormatOptions),
        timeZone: 'utc'
      });
      return this._format(dtf, date);
    }
    // String format: NG-ZORRO extension for date-fns token compatibility
    return this.formatByToken(date, displayFormat as string);
  }

  addCalendarYears(date: Date, years: number): Date {
    return this.addCalendarMonths(date, years * 12);
  }

  addCalendarMonths(date: Date, months: number): Date {
    const newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
    // Adjust for month overflow (e.g., Jan 31 + 1 month should become Feb 28/29, not Mar 3)
    if (this.getMonth(newDate) !== (((this.getMonth(date) + months) % 12) + 12) % 12) {
      newDate.setDate(0);
    }
    return newDate;
  }

  addCalendarDays(date: Date, days: number): Date {
    return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
  }

  toIso8601(date: Date): string {
    return [date.getUTCFullYear(), this._2digit(date.getUTCMonth() + 1), this._2digit(date.getUTCDate())].join('-');
  }

  override deserialize(value: unknown): Date | null {
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      // Strict ISO 8601 validation (same as Material)
      if (ISO_8601_REGEX.test(value)) {
        const date = new Date(value);
        if (this.isValid(date)) {
          return date;
        }
      }
    }
    return super.deserialize(value);
  }

  isDateInstance(obj: unknown): boolean {
    return obj instanceof Date;
  }

  isValid(date: Date): boolean {
    return !isNaN(date.getTime());
  }

  invalid(): Date {
    return new Date(NaN);
  }

  // =============================================================
  // NG-ZORRO CORE: ABSTRACT METHODS
  // =============================================================

  getQuarter(date: Date): number {
    return Math.floor(date.getMonth() / 3) + 1;
  }

  setQuarter(date: Date, quarter: number): Date {
    const currentQuarter = this.getQuarter(date);
    const monthOffset = (quarter - currentQuarter) * 3;
    return this.addCalendarMonths(date, monthOffset);
  }

  startOfQuarter(date: Date): Date {
    const quarter = this.getQuarter(date);
    const month = (quarter - 1) * 3;
    return this.createDate(this.getYear(date), month, 1);
  }

  getISOWeek(date: Date): number {
    // ISO week calculation (same algorithm as Material's getISOWeek if available)
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  }

  setYear(date: Date, year: number): Date {
    const result = this.clone(date);
    result.setFullYear(year);
    return result;
  }

  setMonth(date: Date, month: number): Date {
    const result = this.clone(date);
    result.setMonth(month);
    return result;
  }

  setDate(date: Date, day: number): Date {
    const result = this.clone(date);
    result.setDate(day);
    return result;
  }

  // =============================================================
  // MATERIAL OPTIONAL: TIME METHODS
  // =============================================================

  override setTime(target: Date, hours: number, minutes: number, seconds: number): Date {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!inRange(hours, 0, 23)) {
        throw Error(`Invalid hours "${hours}". Hours value must be between 0 and 23.`);
      }
      if (!inRange(minutes, 0, 59)) {
        throw Error(`Invalid minutes "${minutes}". Minutes value must be between 0 and 59.`);
      }
      if (!inRange(seconds, 0, 59)) {
        throw Error(`Invalid seconds "${seconds}". Seconds value must be between 0 and 59.`);
      }
    }
    const clone = this.clone(target);
    clone.setHours(hours, minutes, seconds, 0);
    return clone;
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

  override parseTime(userValue: unknown, parseFormat?: unknown): Date | null {
    if (typeof userValue !== 'string') {
      return userValue instanceof Date ? new Date(userValue.getTime()) : null;
    }
    const value = userValue.trim();
    if (value.length === 0) {
      return null;
    }
    let result = this._parseTimeString(value);
    if (result === null) {
      // Try stripping non-essential characters
      const withoutExtras = value.replace(/[^0-9:(AM|PM)]/gi, '').trim();
      if (withoutExtras.length > 0) {
        result = this._parseTimeString(withoutExtras);
      }
    }
    return result || this.invalid();
  }

  override addSeconds(date: Date, amount: number): Date {
    return new Date(date.getTime() + amount * 1000);
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

  override getCalendarId(_date: Date): string {
    // Native Date only supports Gregorian calendar
    return 'gregory';
  }

  // =============================================================
  // NG-ZORRO DERIVED: MODE-BASED COMPARISON
  // =============================================================

  override compareDateWithMode(first: Date, second: Date, mode: DateMode): number {
    if (mode === 'decade') {
      return Math.floor(this.getYear(first) / 10) - Math.floor(this.getYear(second) / 10);
    }
    if (mode === 'year') {
      return this.getYear(first) - this.getYear(second);
    }
    if (mode === 'quarter') {
      return this.getYear(first) - this.getYear(second) || this.getQuarter(first) - this.getQuarter(second);
    }
    if (mode === 'month') {
      return this.getYear(first) - this.getYear(second) || this.getMonth(first) - this.getMonth(second);
    }
    if (mode === 'day') {
      return this.compareDate(first, second);
    }
    const dayDiff = this.compareDate(first, second);
    if (dayDiff !== 0) {
      return dayDiff;
    }
    if (mode === 'hour') {
      return this.getHours(first) - this.getHours(second);
    }
    if (mode === 'minute') {
      return this.getHours(first) - this.getHours(second) || this.getMinutes(first) - this.getMinutes(second);
    }
    if (mode === 'second') {
      return (
        this.getHours(first) - this.getHours(second) ||
        this.getMinutes(first) - this.getMinutes(second) ||
        this.getSeconds(first) - this.getSeconds(second)
      );
    }
    return 0;
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
        return Math.abs(this.getYear(first) - this.getYear(second)) < 11;
      case 'year':
        return this.getYear(first) === this.getYear(second);
      case 'quarter':
        return this.getYear(first) === this.getYear(second) && this.getQuarter(first) === this.getQuarter(second);
      case 'month':
        return this.getYear(first) === this.getYear(second) && this.getMonth(first) === this.getMonth(second);
      case 'day':
        return (
          this.getYear(first) === this.getYear(second) &&
          this.getMonth(first) === this.getMonth(second) &&
          this.getDate(first) === this.getDate(second)
        );
      case 'hour':
        return this.isSameWithMode(first, second, 'day') && this.getHours(first) === this.getHours(second);
      case 'minute':
        return this.isSameWithMode(first, second, 'hour') && this.getMinutes(first) === this.getMinutes(second);
      case 'second':
        return this.isSameWithMode(first, second, 'minute') && this.getSeconds(first) === this.getSeconds(second);
      default:
        return this.isSameWithMode(first, second, 'day');
    }
  }

  override isBeforeWithMode(first: Date | null, second: Date | null, mode: DateMode): boolean {
    if (!first || !second) {
      return false;
    }
    return this.compareDateWithMode(first, second, mode) < 0;
  }

  override isFirstDayOfMonth(date: Date): boolean {
    return this.getDate(date) === 1;
  }

  override isLastDayOfMonth(date: Date): boolean {
    return this.getDate(date) === this.getNumDaysInMonth(date);
  }

  override isToday(date: Date): boolean {
    return this.sameDate(date, this.today());
  }

  override calendarStartOfMonth(date: Date): Date {
    return this.createDate(this.getYear(date), this.getMonth(date), 1);
  }

  override calendarStartOfWeek(date: Date): Date {
    const dayOfWeek = this.getDayOfWeek(date);
    const firstDayOfWeek = this.getFirstDayOfWeek();
    const diff = (dayOfWeek - firstDayOfWeek + 7) % 7;
    const result = this.addCalendarDays(date, -diff);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  // =============================================================
  // PRIVATE: MATERIAL-STYLE HELPERS
  // =============================================================

  /**
   * Creates a date allowing for month/date overflow (e.g., Jan 32 becomes Feb 1).
   * This is how Material handles date creation internally.
   */
  private _createDateWithOverflow(year: number, month: number, date: number): Date {
    const result = new Date();
    result.setFullYear(year, month, date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  /** Pads a number to two digits for ISO formatting. */
  private _2digit(n: number): string {
    return `00${n}`.slice(-2);
  }

  /**
   * Formats a date using Intl.DateTimeFormat while avoiding DST issues.
   * Uses UTC internally to ensure consistent formatting across timezones.
   */
  private _format(dtf: Intl.DateTimeFormat, date: Date): string {
    const d = new Date();
    d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return dtf.format(d);
  }

  /**
   * Parses time strings in various formats (10:30, 10:30:45, 10:30 AM, etc.)
   * Returns null if the string cannot be parsed.
   */
  private _parseTimeString(value: string): Date | null {
    const parsed = value.toUpperCase().match(TIME_REGEX);
    if (parsed) {
      let hours = parseInt(parsed[1]);
      const minutes = parseInt(parsed[2]);
      const seconds: number | undefined = parsed[3] == null ? undefined : parseInt(parsed[3]);
      const amPm = parsed[4] as 'AM' | 'PM' | undefined;

      // Handle 12-hour format
      if (hours === 12) {
        hours = amPm === 'AM' ? 0 : hours;
      } else if (amPm === 'PM') {
        hours += 12;
      }

      if (inRange(hours, 0, 23) && inRange(minutes, 0, 59) && (seconds == null || inRange(seconds, 0, 59))) {
        return this.setTime(this.today(), hours, minutes, seconds || 0);
      }
    }
    return null;
  }

  // =============================================================
  // PRIVATE: NG-ZORRO TOKEN-BASED FORMATTING
  // =============================================================

  /**
   * Formats a date using date-fns-style token strings.
   * This is a NG-ZORRO extension for compatibility with existing formats.
   */
  private formatByToken(date: Date, formatStr: string): string {
    if (!formatStr) {
      return '';
    }
    const locale = this.locale as string;
    let result = formatStr;

    // Quarter tokens (NG-ZORRO specific)
    const quarter = this.getQuarter(date);
    result = result.replace(/Q{4,}/g, quarter.toString());
    result = result.replace(/QQQ/g, `Q${quarter}`);
    result = result.replace(/QQ/g, quarter < 10 ? `0${quarter}` : quarter.toString());
    result = result.replace(/Q(?![Q\]])/g, quarter.toString());

    // Use Intl.DateTimeFormat via _format for standard tokens (UTC-safe)
    const dtfYearFull = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'utc' });
    const dtfYear2Digit = new Intl.DateTimeFormat(locale, { year: '2-digit', timeZone: 'utc' });
    const dtfMonth2Digit = new Intl.DateTimeFormat(locale, { month: '2-digit', timeZone: 'utc' });
    const dtfMonthShort = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'utc' });
    const dtfMonthLong = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'utc' });
    const dtfDay2Digit = new Intl.DateTimeFormat(locale, { day: '2-digit', timeZone: 'utc' });
    const dtfWeekdayShort = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'utc' });
    const dtfWeekdayLong = new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'utc' });
    const dtfHour24 = new Intl.DateTimeFormat(locale, { hour: '2-digit', hour12: false, timeZone: 'utc' });
    const dtfMinute = new Intl.DateTimeFormat(locale, { minute: '2-digit', timeZone: 'utc' });
    const dtfSecond = new Intl.DateTimeFormat(locale, { second: '2-digit', timeZone: 'utc' });

    const yearFull = this._format(dtfYearFull, date);
    const year2Digit = this._format(dtfYear2Digit, date);
    const month2Digit = this._format(dtfMonth2Digit, date);
    const monthShort = this._format(dtfMonthShort, date);
    const monthLong = this._format(dtfMonthLong, date);
    const day2Digit = this._format(dtfDay2Digit, date);
    const weekdayShort = this._format(dtfWeekdayShort, date);
    const weekdayLong = this._format(dtfWeekdayLong, date);
    const hour24 = this._format(dtfHour24, date);
    const minute = this._format(dtfMinute, date);
    const second = this._format(dtfSecond, date);

    // Apply replacements
    const replacements: Array<[RegExp, string]> = [
      [/yyyy/g, yearFull],
      [/yy/g, year2Digit],
      [/MMMM/g, monthLong],
      [/MMM/g, monthShort],
      [/MM/g, month2Digit],
      [/M(?![Mo])/, (date.getMonth() + 1).toString()],
      [/dd/g, day2Digit],
      [/d(?![d ])/, date.getDate().toString()],
      [/EEEE/g, weekdayLong],
      [/EEE/g, weekdayShort],
      [/HH/g, hour24],
      [/H(?![H ])/, date.getHours().toString()],
      [/hh/g, this._2digit(date.getHours() % 12 || 12)],
      [/h(?![h ])/, (date.getHours() % 12 || 12).toString()],
      [/mm/g, minute],
      [/m(?![m ])/, date.getMinutes().toString()],
      [/ss/g, second],
      [/s(?![s ])/, date.getSeconds().toString()],
      [/ww/g, this._2digit(this.getISOWeek(date))],
      [/w(?![w ])/, this.getISOWeek(date).toString()]
    ];

    for (const [pattern, replacement] of replacements) {
      result = result.replace(pattern, replacement);
    }

    // Handle bracket-escaped tokens
    result = result.replace(/\[([^\]]+)\]/g, '$1');

    return result;
  }
}

/**
 * Provides the NativeDateAdapter as the NzDateAdapter implementation.
 * NativeDateAdapter is a zero-dependency adapter using native Date and Intl.DateTimeFormat.
 *
 * @param config Optional configuration for the adapter
 * @returns EnvironmentProviders for the NativeDateAdapter
 *
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideNzNativeDateAdapter()]
 * };
 * ```
 */
export function provideNzNativeDateAdapter(config?: NzDateConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    NativeDateAdapter,
    { provide: NzDateAdapter, useExisting: NativeDateAdapter },
    { provide: NZ_DATE_CONFIG, useValue: { ...NZ_DATE_CONFIG_DEFAULT, ...config } }
  ]);
}
