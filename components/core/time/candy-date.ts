/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';
import differenceInCalendarYears from 'date-fns/differenceInCalendarYears';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import isFirstDayOfMonth from 'date-fns/isFirstDayOfMonth';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import isSameDay from 'date-fns/isSameDay';
import isSameHour from 'date-fns/isSameHour';
import isSameMinute from 'date-fns/isSameMinute';
import isSameMonth from 'date-fns/isSameMonth';
import isSameSecond from 'date-fns/isSameSecond';
import isSameYear from 'date-fns/isSameYear';
import isToday from 'date-fns/isToday';
import isValid from 'date-fns/isValid';
import setDay from 'date-fns/setDay';
import setMonth from 'date-fns/setMonth';
import setYear from 'date-fns/setYear';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import { warn } from 'ng-zorro-antd/core/logger';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';

export type CandyDateMode = 'decade' | 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
export type NormalizedMode = 'decade' | 'year' | 'month';
export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type CandyDateType = CandyDate | Date | null;
export type SingleValue = CandyDate | null;
export type CompatibleValue = SingleValue | SingleValue[];

export function wrongSortOrder(rangeValue: SingleValue[]): boolean {
  const [start, end] = rangeValue;
  return !!start && !!end && end.isBeforeDay(start);
}

export function normalizeRangeValue(
  value: SingleValue[],
  hasTimePicker: boolean,
  type: NormalizedMode = 'month',
  activePart: 'left' | 'right' = 'left'
): CandyDate[] {
  const [start, end] = value;
  let newStart: CandyDate = start || new CandyDate();
  let newEnd: CandyDate = end || (hasTimePicker ? newStart : newStart.add(1, type));

  if (start && !end) {
    newStart = start;
    newEnd = hasTimePicker ? start : start.add(1, type);
  } else if (!start && end) {
    newStart = hasTimePicker ? end : end.add(-1, type);
    newEnd = end;
  } else if (start && end && !hasTimePicker) {
    if (activePart === 'left') {
      newEnd = newStart.add(1, type);
    } else {
      newStart = newEnd.add(-1, type);
    }
  }
  return [newStart, newEnd];
}

export function cloneDate(value: CompatibleValue): CompatibleValue {
  if (Array.isArray(value)) {
    return value.map(v => (v instanceof CandyDate ? v.clone() : null));
  } else {
    return value instanceof CandyDate ? value.clone() : null;
  }
}

/**
 * Wrapping kind APIs for date operating and unify
 * NOTE: every new API return new CandyDate object without side effects to the former Date object
 * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
 * TODO: support format() against to angular's core API
 */
export class CandyDate implements IndexableObject {
  nativeDate: Date;
  // locale: string; // Custom specified locale ID

  constructor(date?: Date | string | number) {
    if (date) {
      if (date instanceof Date) {
        this.nativeDate = date;
      } else if (typeof date === 'string' || typeof date === 'number') {
        warn('The string type is not recommended for date-picker, use "Date" type');
        this.nativeDate = new Date(date);
      } else {
        throw new Error('The input date type is not supported ("Date" is now recommended)');
      }
    } else {
      this.nativeDate = new Date();
    }
  }

  calendarStart(options?: { weekStartsOn: WeekDayIndex | undefined }): CandyDate {
    return new CandyDate(startOfWeek(startOfMonth(this.nativeDate), options));
  }

  // ---------------------------------------------------------------------
  // | Native shortcuts
  // -----------------------------------------------------------------------------\

  getYear(): number {
    return this.nativeDate.getFullYear();
  }

  getMonth(): number {
    return this.nativeDate.getMonth();
  }

  getDay(): number {
    return this.nativeDate.getDay();
  }

  getTime(): number {
    return this.nativeDate.getTime();
  }

  getDate(): number {
    return this.nativeDate.getDate();
  }

  getHours(): number {
    return this.nativeDate.getHours();
  }

  getMinutes(): number {
    return this.nativeDate.getMinutes();
  }

  getSeconds(): number {
    return this.nativeDate.getSeconds();
  }

  getMilliseconds(): number {
    return this.nativeDate.getMilliseconds();
  }

  // ---------------------------------------------------------------------
  // | New implementing APIs
  // ---------------------------------------------------------------------

  clone(): CandyDate {
    return new CandyDate(new Date(this.nativeDate));
  }

  setHms(hour: number, minute: number, second: number): CandyDate {
    const newDate = new Date(this.nativeDate.setHours(hour, minute, second));
    return new CandyDate(newDate);
  }

  setYear(year: number): CandyDate {
    return new CandyDate(setYear(this.nativeDate, year));
  }

  addYears(amount: number): CandyDate {
    return new CandyDate(addYears(this.nativeDate, amount));
  }

  // NOTE: month starts from 0
  // NOTE: Don't use the native API for month manipulation as it not restrict the date when it overflows, eg. (new Date('2018-7-31')).setMonth(1) will be date of 2018-3-03 instead of 2018-2-28
  setMonth(month: number): CandyDate {
    return new CandyDate(setMonth(this.nativeDate, month));
  }

  addMonths(amount: number): CandyDate {
    return new CandyDate(addMonths(this.nativeDate, amount));
  }

  setDay(day: number, options?: { weekStartsOn: WeekDayIndex }): CandyDate {
    return new CandyDate(setDay(this.nativeDate, day, options));
  }

  setDate(amount: number): CandyDate {
    const date = new Date(this.nativeDate);
    date.setDate(amount);
    return new CandyDate(date);
  }

  addDays(amount: number): CandyDate {
    return this.setDate(this.getDate() + amount);
  }

  add(amount: number, mode: NormalizedMode): CandyDate {
    switch (mode) {
      case 'decade':
        return this.addYears(amount * 10);
        break;
      case 'year':
        return this.addYears(amount);
        break;
      case 'month':
        return this.addMonths(amount);
        break;
      default:
        return this.addMonths(amount);
        break;
    }
  }

  isSame(date: CandyDateType, grain: CandyDateMode = 'day'): boolean {
    let fn;
    switch (grain) {
      case 'decade':
        fn = (pre: Date, next: Date) => Math.abs(pre.getFullYear() - next.getFullYear()) < 11;
        break;
      case 'year':
        fn = isSameYear;
        break;
      case 'month':
        fn = isSameMonth;
        break;
      case 'day':
        fn = isSameDay;
        break;
      case 'hour':
        fn = isSameHour;
        break;
      case 'minute':
        fn = isSameMinute;
        break;
      case 'second':
        fn = isSameSecond;
        break;
      default:
        fn = isSameDay;
        break;
    }
    return fn(this.nativeDate, this.toNativeDate(date));
  }

  isSameYear(date: CandyDateType): boolean {
    return this.isSame(date, 'year');
  }

  isSameMonth(date: CandyDateType): boolean {
    return this.isSame(date, 'month');
  }

  isSameDay(date: CandyDateType): boolean {
    return this.isSame(date, 'day');
  }

  isSameHour(date: CandyDateType): boolean {
    return this.isSame(date, 'hour');
  }

  isSameMinute(date: CandyDateType): boolean {
    return this.isSame(date, 'minute');
  }

  isSameSecond(date: CandyDateType): boolean {
    return this.isSame(date, 'second');
  }

  isBefore(date: CandyDateType, grain: CandyDateMode = 'day'): boolean {
    if (date === null) {
      return false;
    }
    let fn;
    switch (grain) {
      case 'year':
        fn = differenceInCalendarYears;
        break;
      case 'month':
        fn = differenceInCalendarMonths;
        break;
      case 'day':
        fn = differenceInCalendarDays;
        break;
      case 'hour':
        fn = differenceInHours;
        break;
      case 'minute':
        fn = differenceInMinutes;
        break;
      case 'second':
        fn = differenceInSeconds;
        break;
      default:
        fn = differenceInCalendarDays;
        break;
    }
    return fn(this.nativeDate, this.toNativeDate(date)) < 0;
  }

  isBeforeYear(date: CandyDateType): boolean {
    return this.isBefore(date, 'year');
  }

  isBeforeMonth(date: CandyDateType): boolean {
    return this.isBefore(date, 'month');
  }

  isBeforeDay(date: CandyDateType): boolean {
    return this.isBefore(date, 'day');
  }

  // Equal to today accurate to "day"
  isToday(): boolean {
    return isToday(this.nativeDate);
  }

  isValid(): boolean {
    return isValid(this.nativeDate);
  }

  isFirstDayOfMonth(): boolean {
    return isFirstDayOfMonth(this.nativeDate);
  }

  isLastDayOfMonth(): boolean {
    return isLastDayOfMonth(this.nativeDate);
  }

  private toNativeDate(date: NzSafeAny): Date {
    return date instanceof CandyDate ? date.nativeDate : date;
  }
}
