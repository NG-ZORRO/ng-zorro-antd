/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { forwardRef, Injectable } from '@angular/core';

import {
  addDays,
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  isSameSecond,
  isSameYear,
  isToday,
  isValid,
  setDay,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek
} from 'date-fns';

import { CandyDateMode, WeekDayIndex } from 'ng-zorro-antd/core/time/candy-date';

export type DateMode = CandyDateMode;

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => DateFnsDateAdapter)
})
export abstract class NzDateAdapter<D = Date> {
  abstract calendarStartOfWeek(date: D, options?: { weekStartsOn: WeekDayIndex | undefined }): D;

  abstract calendarStartOfMonth(date: D): D;

  abstract deserialize(input: D | Date | string | number | never): D;

  abstract toNativeDate(input: D): Date;

  abstract today(): D;

  abstract getYear(date: D): number;

  abstract getMonth(date: D): number;

  abstract getDay(date: D): number;

  abstract getTime(date: D): number;

  abstract getDate(date: D): number;

  abstract getHours(date: D): number;

  abstract getMinutes(date: D): number;

  abstract getSeconds(date: D): number;

  abstract getMilliseconds(date: D): number;

  abstract clone(date: D): D;

  abstract setHms(date: D, hour: number, minute: number, second: number): D;

  abstract setYear(date: D, year: number): D;

  abstract addYears(date: D, amount: number): D;

  abstract setMonth(date: D, amount: number): D;

  abstract addMonths(date: D, amount: number): D;

  abstract setDay(date: D, day: number, options?: { weekStartsOn: WeekDayIndex | undefined }): D;

  abstract setDate(date: D, amount: number): D;

  abstract addDays(date: D, amount: number): D;

  abstract isSame(first: D, second: D, mode: DateMode): boolean;

  abstract isBefore(first: D, second: D, mode: DateMode): boolean;

  abstract isToday(date: D): boolean;

  abstract isValid(date: D): boolean;

  abstract isFirstDayOfMonth(date: D): boolean;

  abstract isLastDayOfMonth(date: D): boolean;

  abstract format(date: D, displayFormat: string): string;
}

@Injectable({
  providedIn: 'root'
})
export class DateFnsDateAdapter extends NzDateAdapter<Date> {
  today(): Date {
    return new Date();
  }

  deserialize(input: Date | string | number | never): Date {
    if (input instanceof Date || typeof input === 'string' || typeof input === 'number') {
      return new Date(input);
    }

    throw new Error('The input date type is not supported ("Date" is now recommended)');
  }

  toNativeDate(input: Date): Date {
    return input;
  }

  calendarStartOfWeek(date: Date, options?: { weekStartsOn: WeekDayIndex | undefined }): Date {
    return startOfWeek(date, options);
  }

  calendarStartOfMonth(date: Date): Date {
    return startOfMonth(date);
  }

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getMonth(date: Date): number {
    return date.getMonth();
  }

  getDay(date: Date): number {
    return date.getDay();
  }

  getTime(date: Date): number {
    return date.getTime();
  }

  getDate(date: Date): number {
    return date.getDate();
  }

  getHours(date: Date): number {
    return date.getHours();
  }

  getMinutes(date: Date): number {
    return date.getMinutes();
  }

  getSeconds(date: Date): number {
    return date.getSeconds();
  }

  getMilliseconds(date: Date): number {
    return date.getMilliseconds();
  }

  clone(date: Date): Date {
    return new Date(date);
  }

  setHms(date: Date, hour: number, minute: number, second: number): Date {
    return new Date(date.setHours(hour, minute, second));
  }

  setYear(date: Date, year: number): Date {
    return setYear(date, year);
  }

  addYears(date: Date, amount: number): Date {
    return addYears(date, amount);
  }

  addDays(date: Date, amount: number): Date {
    return addDays(date, amount);
  }

  addMonths(date: Date, amount: number): Date {
    return addMonths(date, amount);
  }

  setDate(date: Date, amount: number): Date {
    const newDate = new Date(date);
    return new Date(newDate.setDate(amount));
  }

  setDay(date: Date, day: number, options?: { weekStartsOn: WeekDayIndex | undefined }): Date {
    return setDay(date, day, options);
  }

  setMonth(date: Date, month: number): Date {
    return setMonth(date, month);
  }

  isSame(first: Date, second: Date, mode: DateMode): boolean {
    let fn;
    switch (mode) {
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
    return fn(first, second);
  }

  isBefore(first: Date, second: Date, mode: CandyDateMode): boolean {
    if (second === null) {
      return false;
    }
    let fn;
    switch (mode) {
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
    return fn(first, second) < 0;
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  isValid(date: Date): boolean {
    return isValid(date);
  }

  isFirstDayOfMonth(date: Date): boolean {
    return isFirstDayOfMonth(date);
  }

  isLastDayOfMonth(date: Date): boolean {
    return isLastDayOfMonth(date);
  }

  format(date: Date, displayFormat: string): string {
    return format(date, displayFormat as string);
  }
}
