/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NZ_DATE_CONFIG, NZ_DATE_CONFIG_DEFAULT, NZ_DATE_LOCALE, NzDateConfig } from './date-config';

const NOT_IMPLEMENTED = 'NzDateAdapter: method not implemented. Override this method in your adapter to opt in.';

/**
 * Injection token for providing a custom NzDateAdapter implementation.
 */
export const NZ_DATE_ADAPTER = new InjectionToken<Type<NzDateAdapter<unknown>>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-date-adapter-type' : ''
);

/** Configuration for a date adapter provider. */
export interface NzDateAdapterConfig<L = unknown> extends NzDateConfig {
  /** Locale value used by the configured date adapter. */
  locale?: L;
}

/**
 * Provides a custom NzDateAdapter implementation.
 * Use this when you want to provide your own adapter implementation.
 *
 * @param adapterClass The adapter class to use (must extend NzDateAdapter)
 * @param config Optional configuration for the adapter
 * @returns EnvironmentProviders for the adapter
 *
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideNzDateAdapter(JalaliDateAdapter, { locale: faIR, firstDayOfWeek: 6 })]
 * };
 * ```
 */
export function provideNzDateAdapter<D, L, T extends NzDateAdapter<D, L>>(
  adapterClass: Type<T>,
  config?: NzDateAdapterConfig<L>
): EnvironmentProviders {
  const { locale, ...dateConfig } = config ?? {};

  return makeEnvironmentProviders([
    adapterClass,
    { provide: NzDateAdapter, useExisting: adapterClass },
    { provide: NZ_DATE_CONFIG, useValue: { ...NZ_DATE_CONFIG_DEFAULT, ...dateConfig } },
    ...(locale !== undefined ? [{ provide: NZ_DATE_LOCALE, useValue: locale }] : [])
  ]);
}

/**
 * NzDateAdapter is the abstraction boundary between ng-zorro-antd and any date library.
 *
 * CONTRACT FOR SUBCLASS AUTHORS:
 *
 * - You MUST implement all abstract methods.
 * - You MAY override derived methods for efficiency.
 * - You MAY override optional methods to opt into features.
 *
 * @see https://github.com/angular/components/blob/main/src/material/core/datetime/date-adapter.ts
 */
export abstract class NzDateAdapter<D, L = unknown> {
  /** The current locale. */
  protected locale!: L;
  protected readonly _localeChanges = new Subject<void>();

  /** Stream that emits when the locale changes. */
  readonly localeChanges: Observable<void> = this._localeChanges;

  // =============================================================
  // MATERIAL CORE: ABSTRACT METHODS (MUST IMPLEMENT)
  // =============================================================

  /** Gets today's date. */
  abstract today(): D;

  /** Gets a date instance representing the given year, month, and day. */
  abstract createDate(year: number, month: number, date: number): D;

  /** Clones the given date. */
  abstract clone(date: D): D;

  // --- Date Getters (Material naming) ---

  /** Gets the year component of the given date. */
  abstract getYear(date: D): number;

  /** Gets the month component of the given date (0-indexed, 0 = January). */
  abstract getMonth(date: D): number;

  /** Gets the date of the month component of the given date (1-indexed). */
  abstract getDate(date: D): number;

  /** Gets the day of the week component of the given date (0-indexed, 0 = Sunday). */
  abstract getDayOfWeek(date: D): number;

  /** Gets the number of days in the month of the given date. */
  abstract getNumDaysInMonth(date: D): number;

  // --- Date Names (Material naming) ---

  /** Gets the name of the month for the given date. */
  abstract getYearName(date: D): string;

  /** Gets a list of month names for the given style. */
  abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];

  /** Gets a list of date names (e.g. '1', '2', ... '31'). */
  abstract getDateNames(): string[];

  /** Gets a list of day of the week names for the given style. */
  abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];

  // --- Week ---

  /** Gets the first day of the week (0 = Sunday, 1 = Monday, etc.). */
  abstract getFirstDayOfWeek(): number;

  // --- Date Math (Material naming) ---

  /** Adds the specified number of years to the given date. */
  abstract addCalendarYears(date: D, years: number): D;

  /** Adds the specified number of months to the given date. */
  abstract addCalendarMonths(date: D, months: number): D;

  /** Adds the specified number of days to the given date. */
  abstract addCalendarDays(date: D, days: number): D;

  // --- Format / Parse ---

  /** Formats a date as a string according to the given display format. */
  abstract format(date: D, displayFormat: unknown): string;

  /** Parses a value into a date. */
  abstract parse(value: unknown, parseFormat: unknown): D | null;

  // --- Validation ---

  /** Checks whether the given object is a date instance. */
  abstract isDateInstance(obj: unknown): boolean;

  /** Checks whether the given date is valid. */
  abstract isValid(date: D): boolean;

  /** Gets a date instance representing an invalid date. */
  abstract invalid(): D;

  // =============================================================
  // NG-ZORRO CORE: ABSTRACT METHODS (MUST IMPLEMENT)
  // =============================================================

  /** Gets the quarter component of the given date (1-4). */
  abstract getQuarter(date: D): number;

  /** Sets the quarter of the given date. */
  abstract setQuarter(date: D, quarter: number): D;

  /** Gets the start of the quarter for the given date. */
  abstract startOfQuarter(date: D): D;

  /** Gets the ISO week number for the given date. */
  abstract getISOWeek(date: D): number;

  // --- NG-ZORRO Date Setters (not in Material) ---

  /** Sets the year of the given date. */
  abstract setYear(date: D, year: number): D;

  /** Sets the month of the given date (0-indexed). */
  abstract setMonth(date: D, month: number): D;

  /** Sets the day of the month of the given date (1-indexed). */
  abstract setDate(date: D, day: number): D;

  // =============================================================
  // MATERIAL DERIVED: IMPLEMENTED METHODS (MAY OVERRIDE)
  // =============================================================

  /** Sets the locale used for formatting and parsing. */
  setLocale(locale: L): void {
    this.locale = locale;
    this._localeChanges.next();
  }

  /**
   * Attempts to deserialize a value to a valid date object.
   * Accepts ISO 8601 strings, Date objects, or null/undefined.
   */
  deserialize(value: unknown): D | null {
    if (value == null || this.isDateInstance(value)) {
      return value as D | null;
    }
    return this.invalid();
  }

  /** Gets a valid date object if possible, otherwise returns null. */
  getValidDateOrNull(obj: unknown): D | null {
    if (this.isDateInstance(obj)) {
      const date = obj as D;
      return this.isValid(date) ? date : null;
    }
    return null;
  }

  /** Compares two dates, returning a number indicating their relative order. */
  compareDate(first: D, second: D): number {
    return (
      this.getYear(first) - this.getYear(second) ||
      this.getMonth(first) - this.getMonth(second) ||
      this.getDate(first) - this.getDate(second)
    );
  }

  /** Checks whether two dates represent the same calendar day. */
  sameDate(first: D | null, second: D | null): boolean {
    if (first && second) {
      const firstValid = this.isValid(first);
      const secondValid = this.isValid(second);
      if (firstValid && secondValid) {
        return this.compareDate(first, second) === 0;
      }
      return firstValid === secondValid;
    }
    return first === second;
  }

  /** Clamps a date between min and max bounds. */
  clampDate(date: D, min?: D | null, max?: D | null): D {
    if (min && this.compareDate(min, date) > 0) {
      return this.clone(min);
    }
    if (max && this.compareDate(date, max) > 0) {
      return this.clone(max);
    }
    return date;
  }

  /** Gets the calendar's start of month (first day at midnight). */
  calendarStartOfMonth(date: D): D {
    return this.createDate(this.getYear(date), this.getMonth(date), 1);
  }

  /** Gets the calendar's start of week. */
  calendarStartOfWeek(date: D): D {
    const dayOfWeek = this.getDayOfWeek(date);
    const firstDayOfWeek = this.getFirstDayOfWeek();
    const diff = (dayOfWeek - firstDayOfWeek + 7) % 7;
    return this.addCalendarDays(date, -diff);
  }

  /** Checks whether the given date is the first day of its month. */
  isFirstDayOfMonth(date: D): boolean {
    return this.getDate(date) === 1;
  }

  /** Checks whether the given date is the last day of its month. */
  isLastDayOfMonth(date: D): boolean {
    return this.getDate(date) === this.getNumDaysInMonth(date);
  }

  /** Checks whether the given date is today. */
  isToday(date: D): boolean {
    return this.sameDate(date, this.today());
  }

  // =============================================================
  // MATERIAL OPTIONAL: TIME METHODS (THROW BY DEFAULT)
  // =============================================================

  /** Sets the time on the given date. */
  setTime(_date: D, _hours: number, _minutes: number, _seconds: number): D {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Gets the hours component of the given date. */
  getHours(_date: D): number {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Gets the minutes component of the given date. */
  getMinutes(_date: D): number {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Gets the seconds component of the given date. */
  getSeconds(_date: D): number {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Parses a time value into a date. */
  parseTime(_value: unknown, _parseFormat?: unknown): D | null {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Adds the specified number of seconds to the given date. */
  addSeconds(_date: D, _amount: number): D {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Compares two times, returning a number indicating their relative order. */
  compareTime(first: D, second: D): number {
    return (
      this.getHours(first) - this.getHours(second) ||
      this.getMinutes(first) - this.getMinutes(second) ||
      this.getSeconds(first) - this.getSeconds(second)
    );
  }

  /** Checks whether two dates represent the same time (same hour, minute, second). */
  sameTime(first: D | null, second: D | null): boolean {
    if (first && second) {
      return (!this.isValid(first) && !this.isValid(second)) || this.compareTime(first, second) === 0;
    }
    return first === second;
  }

  // =============================================================
  // NG-ZORRO OPTIONAL: EXTENDED METHODS (THROW BY DEFAULT)
  // =============================================================

  /** Gets the milliseconds component of the given date. */
  getMilliseconds(_date: D): number {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Gets the timestamp (milliseconds since epoch) of the given date. */
  getTime(_date: D): number {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Gets the calendar system identifier for the given date. */
  getCalendarId(_date: D): string {
    throw new Error(NOT_IMPLEMENTED);
  }

  /** Gets the timezone offset for the given date. */
  getTimezoneOffset(_date: D): number {
    throw new Error(NOT_IMPLEMENTED);
  }

  // --- Legacy aliases (deprecated, use Material naming instead) ---

  /**
   * @deprecated Use `addCalendarYears` instead. Will be removed in v23.
   */
  addYears(date: D, amount: number): D {
    return this.addCalendarYears(date, amount);
  }

  /**
   * @deprecated Use `addCalendarMonths` instead. Will be removed in v23.
   */
  addMonths(date: D, amount: number): D {
    return this.addCalendarMonths(date, amount);
  }

  /**
   * @deprecated Use `addCalendarDays` instead. Will be removed in v23.
   */
  addDays(date: D, amount: number): D {
    return this.addCalendarDays(date, amount);
  }

  /**
   * @deprecated Use `getNumDaysInMonth` instead. Will be removed in v23.
   */
  getDaysInMonth(date: D): number {
    return this.getNumDaysInMonth(date);
  }

  /**
   * @deprecated Use `getDayOfWeek` instead. Will be removed in v23.
   */
  getDay(date: D): number {
    return this.getDayOfWeek(date);
  }
}
