/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  isSameSecond,
  isSameYear,
  isToday,
  isValid,
  setYear,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';
import setDay from 'date-fns/set_day';
import setMonth from 'date-fns/set_month';
import { warn } from '../logger';
import { IndexableObject } from '../types';

export type CandyDateCompareGrain = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
export type CandyDateType = CandyDate | Date | null;

export function sortRangeValue(rangeValue: CandyDate[]): CandyDate[] {
  if (Array.isArray(rangeValue)) {
    const [start, end] = rangeValue;
    return start && end && start.isAfterSecond(end) ? [end, start] : [start, end];
  }
  return rangeValue;
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

  // getLocale(): string {
  //   return this.locale;
  // }

  // setLocale(locale: string): CandyDate {
  //   this.locale = locale;
  //   return this;
  // }

  calendarStart(options?: { weekStartsOn: number | undefined }): CandyDate {
    return new CandyDate(startOfWeek(startOfMonth(this.nativeDate), options));
  }

  // ---------------------------------------------------------------------
  // | Native shortcuts
  // ---------------------------------------------------------------------

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
    const date = new Date(this.nativeDate);
    date.setHours(hour, minute, second);
    return new CandyDate(date);
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

  setDay(day: number, options?: { weekStartsOn: number }): CandyDate {
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

  isSame(date: CandyDateType, grain: CandyDateCompareGrain = 'day'): boolean {
    let fn;
    switch (grain) {
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

  compare(date: CandyDateType, grain: CandyDateCompareGrain = 'day', isBefore: boolean = true): boolean {
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
    return isBefore
      ? fn(this.nativeDate, this.toNativeDate(date)) < 0
      : fn(this.nativeDate, this.toNativeDate(date)) > 0;
  }

  isBeforeYear(date: CandyDateType): boolean {
    return this.compare(date, 'year');
  }

  isBeforeMonth(date: CandyDateType): boolean {
    return this.compare(date, 'month');
  }

  isBeforeDay(date: CandyDateType): boolean {
    return this.compare(date, 'day');
  }

  isBeforeHour(date: CandyDateType): boolean {
    return this.compare(date, 'hour');
  }

  isBeforeMinute(date: CandyDateType): boolean {
    return this.compare(date, 'minute');
  }

  isBeforeSecond(date: CandyDateType): boolean {
    return this.compare(date, 'second');
  }

  // TODO: isBefore
  isAfterYear(date: CandyDateType): boolean {
    return this.compare(date, 'year', false);
  }

  isAfterMonth(date: CandyDateType): boolean {
    return this.compare(date, 'month', false);
  }

  isAfterDay(date: CandyDateType): boolean {
    return this.compare(date, 'day', false);
  }

  isAfterHour(date: CandyDateType): boolean {
    return this.compare(date, 'hour', false);
  }

  isAfterMinute(date: CandyDateType): boolean {
    return this.compare(date, 'minute', false);
  }

  isAfterSecond(date: CandyDateType): boolean {
    return this.compare(date, 'second', false);
  }

  // Equal to today accurate to "day"
  isToday(): boolean {
    return isToday(this.nativeDate);
  }

  isValid(): boolean {
    return isValid(this.nativeDate);
  }

  // tslint:disable-next-line: no-any
  private toNativeDate(date: any): Date {
    return date instanceof CandyDate ? date.nativeDate : date;
  }
}
