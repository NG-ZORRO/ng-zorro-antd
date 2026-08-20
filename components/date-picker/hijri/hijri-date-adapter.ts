/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EnvironmentProviders, inject, Injectable, InjectionToken, makeEnvironmentProviders } from '@angular/core';

import { addDays, addSeconds, format as fnsFormat, isValid, startOfWeek, type Locale, type Day } from 'date-fns';

import {
  NzDateAdapter,
  NzDateAdapterConfig,
  provideNzDateAdapter,
  NZ_DATE_CONFIG,
  NZ_DATE_LOCALE
} from 'ng-zorro-antd/core/time';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import {
  getHijriMonthLength,
  gregorianToHijri,
  hijriToGregorian,
  NzHijriDateParts,
  NzHijriMonthOverride,
  NZ_HIJRI_MAX_YEAR,
  NZ_HIJRI_MIN_YEAR
} from './hijri-tools';

/**
 * Tokens the Hijri adapter resolves itself: year, month, day of month, quarter and week. They are
 * the same tokens the Gregorian picker uses, including the ones inside the locale files
 * (`yearFormat`, `dateFormat`, ...), and are read as Hijri units here.
 *
 * Anything else (weekdays, hours, minutes, meridiem) is calendar independent and delegated to
 * date-fns.
 */
const CALENDAR_TOKEN = /^([yY]{1,4}|[ML]{1,4}|[dD]{1,2}|Q{1,2}|[wW]{1,2})/;

/**
 * Months whose length differs from the tabular Umm al-Qura calendar, either as a fixed list or as a
 * function returning the current list. Pass a signal (or any getter) when the overrides are loaded
 * at runtime, they are then read again on every conversion.
 */
export type NzHijriMonthOverridesLike = NzHijriMonthOverride[] | (() => NzHijriMonthOverride[]);

/** Configuration for the Hijri date adapter. */
export interface NzHijriDateAdapterConfig extends NzDateAdapterConfig<Locale> {
  /** Locale object from date-fns, used for the Gregorian parts of a format (weekdays and time). */
  locale?: Locale;
  /** Months whose length differs from the tabular Umm al-Qura calendar. */
  monthOverrides?: NzHijriMonthOverridesLike;
}

/** Months whose length differs from the tabular Umm al-Qura calendar. */
export const NZ_HIJRI_MONTH_OVERRIDES = new InjectionToken<NzHijriMonthOverridesLike>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-hijri-month-overrides' : ''
);

/**
 * Date adapter for the Umm al-Qura Hijri calendar, backed by native `Date` objects.
 *
 * Every calendar unit (year, month, day of month, quarter) is Hijri, while the value handed in and
 * out stays a plain `Date`. Formatting reads the usual `yyyy`, `MM`, `dd`, ... tokens as Hijri units,
 * so `nz-hijri-date-picker` can be dropped in wherever `nz-date-picker` was used.
 *
 * @note Requires date-fns as a peer dependency.
 */
@Injectable({ providedIn: 'root' })
export class NzHijriDateAdapter extends NzDateAdapter<Date, Locale> {
  private readonly i18n = inject(NzI18nService);
  private readonly dateLocale = inject(NZ_DATE_LOCALE, { optional: true });
  private readonly dateConfig = inject(NZ_DATE_CONFIG, { optional: true });
  private readonly overrides = inject(NZ_HIJRI_MONTH_OVERRIDES, { optional: true });
  private monthNames?: { localeId: string; long: string[]; short: string[] };

  /**
   * Current month overrides. Read on every conversion, so overrides backed by a signal or a getter
   * take effect as soon as they change.
   */
  private get monthOverrides(): NzHijriMonthOverride[] | undefined {
    return (typeof this.overrides === 'function' ? this.overrides() : this.overrides) ?? undefined;
  }

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

  /** Creates a date from Hijri parts. `month` is 0-indexed, as everywhere else in the adapter API. */
  createDate(year: number, month: number, date: number): Date {
    return hijriToGregorian({ year, month: month + 1, day: date }, this.monthOverrides);
  }

  clone(date: Date): Date {
    return new Date(date);
  }

  // --- Date Getters ---

  getYear(date: Date): number {
    return this.toHijri(date).year;
  }

  getMonth(date: Date): number {
    return this.toHijri(date).month - 1;
  }

  getDate(date: Date): number {
    return this.toHijri(date).day;
  }

  getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  getNumDaysInMonth(date: Date): number {
    const { year, month } = this.toHijri(date);
    return getHijriMonthLength(year, month, this.monthOverrides);
  }

  // --- Date Names ---

  getYearName(date: Date): string {
    return `${this.getYear(date)}`;
  }

  /**
   * Hijri month names of the active locale. Locales that do not translate them fall back to the
   * `en_US` names, the same way `NzI18nService` resolves any other missing translation.
   *
   * Cached per locale, since a single panel renders a name for every cell.
   */
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const localeId = this.i18n.getLocaleId();

    if (this.monthNames?.localeId !== localeId) {
      this.monthNames = {
        localeId,
        long: this.i18n.getLocaleData('DatePicker.lang.hijriMonths'),
        short: this.i18n.getLocaleData('DatePicker.lang.shortHijriMonths')
      };
    }

    return style === 'long' ? this.monthNames.long : this.monthNames.short;
  }

  getDateNames(): string[] {
    return Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const format: 'EEEEEE' | 'EEE' | 'EEEE' = style === 'narrow' ? 'EEEEEE' : style === 'short' ? 'EEE' : 'EEEE';
    return Array.from({ length: 7 }, (_, i) => fnsFormat(new Date(2024, 0, i + 7), format, { locale: this.locale }));
  }

  // --- Week ---

  /** Hijri calendars conventionally start the week on Saturday. */
  getFirstDayOfWeek(): number {
    return this.dateConfig?.firstDayOfWeek ?? this.locale?.options?.weekStartsOn ?? 6;
  }

  // --- Date Math ---

  addCalendarYears(date: Date, years: number): Date {
    return this.addCalendarMonths(date, years * 12);
  }

  addCalendarMonths(date: Date, months: number): Date {
    const hijri = this.toHijri(date);
    const total = hijri.month - 1 + months;
    const year = hijri.year + Math.floor(total / 12);
    const month = (((total % 12) + 12) % 12) + 1;
    const day = Math.min(hijri.day, getHijriMonthLength(year, month, this.monthOverrides));
    return this.keepTime(hijriToGregorian({ year, month, day }, this.monthOverrides), date);
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
      throw new Error('NzHijriDateAdapter: Cannot format invalid date.');
    }

    const hijri = this.toHijri(date);
    let result = '';

    for (const part of this.tokenize(`${displayFormat}`)) {
      result += part.literal ? part.text : this.formatToken(part.text, date, hijri);
    }

    return result;
  }

  parse(value: NzSafeAny, parseFormat: NzSafeAny): Date | null {
    if (typeof value === 'number') {
      return new Date(value);
    }
    if (value instanceof Date) {
      return this.clone(value);
    }
    if (typeof value !== 'string' || !value.length) {
      return null;
    }

    const formats: string[] = Array.isArray(parseFormat) ? parseFormat : [`${parseFormat}`];
    if (!formats.length) {
      throw new Error('Formats array must not be empty.');
    }

    for (const currentFormat of formats) {
      const parsed = this.parseWithFormat(value, currentFormat);
      if (parsed) {
        return parsed;
      }
    }

    return this.invalid();
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

  /** Hijri quarter, three Hijri months each. */
  getQuarter(date: Date): number {
    return Math.floor(this.getMonth(date) / 3) + 1;
  }

  setQuarter(date: Date, quarter: number): Date {
    return this.setMonth(date, (quarter - 1) * 3 + (this.getMonth(date) % 3));
  }

  startOfQuarter(date: Date): Date {
    const { year } = this.toHijri(date);
    return hijriToGregorian({ year, month: (this.getQuarter(date) - 1) * 3 + 1, day: 1 }, this.monthOverrides);
  }

  /** Week of the Hijri year, counted from the first day of the week of 1 Muharram. */
  getISOWeek(date: Date): number {
    const { year } = this.toHijri(date);
    const yearStart = startOfWeek(hijriToGregorian({ year, month: 1, day: 1 }, this.monthOverrides), {
      weekStartsOn: this.getFirstDayOfWeek() as Day
    });
    const current = startOfWeek(date, { weekStartsOn: this.getFirstDayOfWeek() as Day });
    return Math.round((current.getTime() - yearStart.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
  }

  // --- NG-ZORRO Date Setters ---

  setYear(date: Date, year: number): Date {
    const { month, day } = this.toHijri(date);
    const clamped = Math.min(Math.max(year, NZ_HIJRI_MIN_YEAR), NZ_HIJRI_MAX_YEAR);
    return this.keepTime(
      hijriToGregorian(
        { year: clamped, month, day: Math.min(day, getHijriMonthLength(clamped, month, this.monthOverrides)) },
        this.monthOverrides
      ),
      date
    );
  }

  setMonth(date: Date, month: number): Date {
    return this.addCalendarMonths(date, month - this.getMonth(date));
  }

  setDate(date: Date, day: number): Date {
    const { year, month } = this.toHijri(date);
    return this.keepTime(hijriToGregorian({ year, month, day }, this.monthOverrides), date);
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

  override getCalendarId(): string {
    return 'islamic-umalqura';
  }

  override calendarStartOfWeek(date: Date): Date {
    return startOfWeek(date, { weekStartsOn: this.getFirstDayOfWeek() as Day });
  }

  // =============================================================
  // HIJRI HELPERS
  // =============================================================

  /** Hijri parts of the given date. */
  toHijri(date: Date): NzHijriDateParts {
    return gregorianToHijri(date, this.monthOverrides);
  }

  /** Whether both dates fall in the same Hijri month. */
  sameMonth(first: Date | null | undefined, second: Date | null | undefined): boolean {
    return this.compareUnits(first, second, 'month') === 0;
  }

  /** Whether both dates fall in the same Hijri year. */
  sameYear(first: Date | null | undefined, second: Date | null | undefined): boolean {
    return this.compareUnits(first, second, 'year') === 0;
  }

  /** Whether both dates fall in the same Hijri quarter. */
  sameQuarter(first: Date | null | undefined, second: Date | null | undefined): boolean {
    return this.compareUnits(first, second, 'quarter') === 0;
  }

  /** Whether the first date is in an earlier Hijri month than the second. */
  beforeMonth(first: Date | null | undefined, second: Date | null | undefined): boolean {
    return this.compareUnits(first, second, 'month') < 0;
  }

  /** Whether the first date is in an earlier Hijri year than the second. */
  beforeYear(first: Date | null | undefined, second: Date | null | undefined): boolean {
    return this.compareUnits(first, second, 'year') < 0;
  }

  /** Whether the first date is in an earlier Hijri quarter than the second. */
  beforeQuarter(first: Date | null | undefined, second: Date | null | undefined): boolean {
    return this.compareUnits(first, second, 'quarter') < 0;
  }

  /** Compares two dates by Hijri year, quarter or month. Returns `NaN` when either date is missing. */
  private compareUnits(
    first: Date | null | undefined,
    second: Date | null | undefined,
    unit: 'year' | 'quarter' | 'month'
  ): number {
    if (!first || !second) {
      return NaN;
    }

    const left = this.toHijri(first);
    const right = this.toHijri(second);
    if (unit === 'year' || left.year !== right.year) {
      return left.year - right.year;
    }
    return unit === 'quarter'
      ? Math.floor((left.month - 1) / 3) - Math.floor((right.month - 1) / 3)
      : left.month - right.month;
  }

  /** Copies the time of `source` onto `date`, so changing a calendar unit never changes the time. */
  private keepTime(date: Date, source: Date): Date {
    date.setHours(source.getHours(), source.getMinutes(), source.getSeconds(), source.getMilliseconds());
    return date;
  }

  /**
   * Splits a format string into literals and tokens.
   *
   * `[...]` and `'...'` are literals, a doubled `''` is a literal quote. Everything else is either a
   * known token or a run of the same character handed to date-fns as is.
   */
  private tokenize(formatString: string): Array<{ text: string; literal: boolean }> {
    const parts: Array<{ text: string; literal: boolean }> = [];
    let index = 0;

    while (index < formatString.length) {
      const rest = formatString.slice(index);
      const char = formatString[index];

      if (char === '[') {
        const end = formatString.indexOf(']', index);
        const stop = end === -1 ? formatString.length : end;
        parts.push({ text: formatString.slice(index + 1, stop), literal: true });
        index = stop + 1;
        continue;
      }

      if (char === "'") {
        if (formatString[index + 1] === "'") {
          parts.push({ text: "'", literal: true });
          index += 2;
          continue;
        }
        const end = formatString.indexOf("'", index + 1);
        const stop = end === -1 ? formatString.length : end;
        parts.push({ text: formatString.slice(index + 1, stop), literal: true });
        index = stop + 1;
        continue;
      }

      const token = CALENDAR_TOKEN.exec(rest)?.[0];
      if (token) {
        parts.push({ text: token, literal: false });
        index += token.length;
        continue;
      }

      if (/[a-zA-Z]/.test(char)) {
        // A run of the same letter is one date-fns token, e.g. `EEE` or `mm`
        const run = /^(.)\1*/.exec(rest)![0];
        parts.push({ text: run, literal: false });
        index += run.length;
        continue;
      }

      parts.push({ text: char, literal: true });
      index++;
    }

    return parts;
  }

  /** Renders a single token, delegating anything that is not a calendar unit to date-fns. */
  private formatToken(token: string, date: Date, hijri: NzHijriDateParts): string {
    const pad = (value: number, length: number): string => `${value}`.padStart(length, '0');

    if (/^[yY]{1,4}$/.test(token)) {
      return token.length === 2 ? `${hijri.year}`.slice(-2) : pad(hijri.year, token.length);
    }
    if (/^[ML]{1,4}$/.test(token)) {
      if (token.length === 4) {
        return this.getMonthNames('long')[hijri.month - 1];
      }
      return token.length === 3 ? this.getMonthNames('short')[hijri.month - 1] : pad(hijri.month, token.length);
    }
    if (/^[dD]{1,2}$/.test(token)) {
      return pad(hijri.day, token.length);
    }
    if (/^Q{1,2}$/.test(token)) {
      return pad(Math.floor((hijri.month - 1) / 3) + 1, token.length);
    }
    if (/^[wW]{1,2}$/.test(token)) {
      return pad(this.getISOWeek(date), token.length);
    }

    try {
      return fnsFormat(date, token, { locale: this.locale });
    } catch {
      return token;
    }
  }

  /** Parses `value` against a single format, returning `null` when it does not match. */
  private parseWithFormat(value: string, formatString: string): Date | null {
    const groups: string[] = [];
    let pattern = '';

    for (const part of this.tokenize(formatString)) {
      if (part.literal) {
        pattern += escapeRegExp(part.text);
        continue;
      }

      const token = part.text;
      if (/^[yY]{1,4}$/.test(token)) {
        groups.push('year');
        pattern += '(\\d{1,4})';
      } else if (/^[ML]{3,4}$/.test(token)) {
        groups.push('monthName');
        pattern += '(.+?)';
      } else if (/^[ML]{1,2}$/.test(token)) {
        groups.push('month');
        pattern += '(\\d{1,2})';
      } else if (/^[dD]{1,2}$/.test(token)) {
        groups.push('day');
        pattern += '(\\d{1,2})';
      } else if (/^Q{1,2}$/.test(token)) {
        groups.push('quarter');
        pattern += '(\\d)';
      } else if (/^[wW]{1,2}$/.test(token)) {
        groups.push('week');
        pattern += '(\\d{1,2})';
      } else if (/^H{1,2}$/.test(token) || /^h{1,2}$/.test(token)) {
        groups.push(token[0] === 'H' ? 'hours' : 'hours12');
        pattern += '(\\d{1,2})';
      } else if (/^m{1,2}$/.test(token)) {
        groups.push('minutes');
        pattern += '(\\d{1,2})';
      } else if (/^s{1,2}$/.test(token)) {
        groups.push('seconds');
        pattern += '(\\d{1,2})';
      } else if (/^a+$/i.test(token)) {
        groups.push('meridiem');
        pattern += '(.+?)';
      } else {
        // Weekday names and anything else are redundant for reconstructing the date
        groups.push('ignored');
        pattern += '(.+?)';
      }
    }

    const match = new RegExp(`^${pattern}$`).exec(value.trim());
    if (!match) {
      return null;
    }

    const now = this.toHijri(new Date());
    const parts: Record<string, string> = {};
    groups.forEach((name, index) => (parts[name] = match[index + 1]));

    const monthNames = this.getMonthNames('long');
    const shortMonthNames = this.getMonthNames('short');
    const namedMonth = parts.monthName
      ? Math.max(monthNames.indexOf(parts.monthName), shortMonthNames.indexOf(parts.monthName)) + 1
      : 0;

    const year = parts.year ? Number(parts.year) : now.year;
    const month =
      namedMonth ||
      (parts.month ? Number(parts.month) : parts.quarter ? (Number(parts.quarter) - 1) * 3 + 1 : now.month);
    const day = parts.day ? Number(parts.day) : 1;

    if (
      (parts.monthName && !namedMonth) ||
      year < NZ_HIJRI_MIN_YEAR ||
      year > NZ_HIJRI_MAX_YEAR ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > getHijriMonthLength(year, month, this.monthOverrides)
    ) {
      return null;
    }

    const result = hijriToGregorian({ year, month, day }, this.monthOverrides);

    if (parts.week) {
      // A week value only pins down the week of the year, so move to that week keeping the weekday
      const weekStart = this.calendarStartOfWeek(hijriToGregorian({ year, month: 1, day: 1 }, this.monthOverrides));
      return addDays(weekStart, (Number(parts.week) - 1) * 7);
    }

    let hours = parts.hours ? Number(parts.hours) : parts.hours12 ? Number(parts.hours12) % 12 : 0;
    if (parts.hours12 && /p/i.test(parts.meridiem ?? '')) {
      hours += 12;
    }
    result.setHours(hours, Number(parts.minutes ?? 0), Number(parts.seconds ?? 0), 0);

    return this.isValid(result) ? result : null;
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Provides the {@link NzHijriDateAdapter} as the application wide `NzDateAdapter` implementation.
 *
 * `nz-hijri-date-picker` already provides it for its own panels, so this is only needed to switch
 * other date driven components (`nz-calendar`, `nz-date-picker`, ...) to the Hijri calendar.
 *
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideNzHijriDateAdapter({ locale: arSA, firstDayOfWeek: 6 })]
 * };
 * ```
 */
export function provideNzHijriDateAdapter(config?: NzHijriDateAdapterConfig): EnvironmentProviders {
  const { monthOverrides, ...adapterConfig } = config ?? {};
  return makeEnvironmentProviders([
    provideNzDateAdapter(NzHijriDateAdapter, adapterConfig),
    ...(monthOverrides ? [{ provide: NZ_HIJRI_MONTH_OVERRIDES, useValue: monthOverrides }] : [])
  ]);
}
