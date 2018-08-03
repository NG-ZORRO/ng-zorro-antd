import * as addMonths from 'date-fns/add_months';
import * as addYears from 'date-fns/add_years';
import * as endOfMonth from 'date-fns/end_of_month';
import * as setDay from 'date-fns/set_day';
import * as setMonth from 'date-fns/set_month';
// import * as setYear from 'date-fns/set_year';
import { firstDayOfWeek } from './util';

/**
 * Wrapping kind APIs for date operating and unify
 * NOTE: every new API return new CandyDate object without side effects to the former Date object
 * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
 * TODO: support format() against to angular's core API
 */
export class CandyDate {
  nativeDate: Date;
  // locale: string; // Custom specified locale ID

  constructor(date?: Date | string) {
    // if (!(this instanceof CandyDate)) {
    //   return new CandyDate(date);
    // }

    if (date) {
      if (date instanceof Date) {
        this.nativeDate = date;
      } else if (typeof date === 'string') {
        this.nativeDate = new Date(date);
      } else {
        throw new Error('The input date type is not supported ("Date" and "string" is now recommended)');
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
    // return new CandyDate(setYear(this.date, year));
    const date = new Date(this.nativeDate);
    date.setFullYear(year);
    return new CandyDate(date);
  }

  addYears(amount: number): CandyDate {
    return new CandyDate(addYears(this.nativeDate, amount));
  }

  // NOTE: month starts from 0
  // NOTE: Don't use the native API for month manipulation as it not restrict the date when it overflows, eg. (new Date('2018-7-31')).setMonth(1) will be date of 2018-3-03 instead of 2018-2-28
  setMonth(month: number): CandyDate {
    // const date = new Date(this.nativeDate);
    // date.setMonth(month);
    // return new CandyDate(date);
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

  endOf(grain: 'month'): CandyDate {
    switch (grain) {
      case 'month': return new CandyDate(endOfMonth(this.nativeDate));
    }
    return null;
  }

  isSame(date: CandyDate | Date, grain: CandyDateCompareGrain): boolean { // TODO: Precipitate into a function "compare()"
    if (date) {
      const left = this.toNativeDate();
      const right = this.toNativeDate(date);
      switch (grain) {
        case 'year':
          return left.getFullYear() === right.getFullYear();
        case 'month':
          return left.getFullYear() === right.getFullYear()
            && left.getMonth() === right.getMonth();
        case 'day':
          return left.getFullYear() === right.getFullYear()
            && left.getMonth() === right.getMonth()
            && left.getDate() === right.getDate();
        case 'hour':
          return left.getFullYear() === right.getFullYear()
            && left.getMonth() === right.getMonth()
            && left.getDate() === right.getDate()
            && left.getHours() === right.getHours();
        case 'minute':
          return left.getFullYear() === right.getFullYear()
            && left.getMonth() === right.getMonth()
            && left.getDate() === right.getDate()
            && left.getHours() === right.getHours()
            && left.getMinutes() === right.getMinutes();
        case 'second':
          return left.getFullYear() === right.getFullYear()
            && left.getMonth() === right.getMonth()
            && left.getDate() === right.getDate()
            && left.getHours() === right.getHours()
            && left.getMinutes() === right.getMinutes()
            && left.getSeconds() === right.getSeconds();
      }
    }
    return false;
  }

  isAfter(date: CandyDate | Date, grain: CandyDateCompareGrain): boolean { // TODO: Precipitate into a function "compare()"
    if (date) {
      const left = this.toNativeDate();
      const right = this.toNativeDate(date);
      switch (grain) {
        case 'year':
          return left.getFullYear() > right.getFullYear();
        case 'month':
          return (left.getFullYear() > right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() > right.getMonth());
        case 'day':
          return (left.getFullYear() > right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() > right.getMonth())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() > right.getDate());
        case 'hour':
          return (left.getFullYear() > right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() > right.getMonth())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() > right.getDate())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() > right.getHours());
        case 'minute':
          return (left.getFullYear() > right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() > right.getMonth())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() > right.getDate())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() > right.getHours())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() === right.getHours() && left.getMinutes() > right.getMinutes());
        case 'second':
          return (left.getFullYear() > right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() > right.getMonth())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() > right.getDate())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() > right.getHours())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() === right.getHours() && left.getMinutes() > right.getMinutes())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() === right.getHours() && left.getMinutes() === right.getMinutes() && left.getSeconds() > right.getSeconds());
      }
    }
    return false;
  }

  isBefore(date: CandyDate | Date, grain: CandyDateCompareGrain): boolean { // TODO: Precipitate into a function "compare()"
    if (date) {
      const left = this.toNativeDate();
      const right = this.toNativeDate(date);
      switch (grain) {
        case 'year':
          return left.getFullYear() < right.getFullYear();
        case 'month':
          return (left.getFullYear() < right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() < right.getMonth());
        case 'day':
          return (left.getFullYear() < right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() < right.getMonth())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() < right.getDate());
        case 'hour':
          return (left.getFullYear() < right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() < right.getMonth())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() < right.getDate())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() < right.getHours());
        case 'minute':
          return (left.getFullYear() < right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() < right.getMonth())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() < right.getDate())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() < right.getHours())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() === right.getHours() && left.getMinutes() < right.getMinutes());
        case 'second':
          return (left.getFullYear() < right.getFullYear())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() < right.getMonth())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() < right.getDate())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() < right.getHours())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() === right.getHours() && left.getMinutes() < right.getMinutes())
            || (left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate() && left.getHours() === right.getHours() && left.getMinutes() === right.getMinutes() && left.getSeconds() < right.getSeconds());
      }
    }
    return false;
  }

  // Equal to today accurate to "day"
  isToday(): boolean {
    return this.isSame(new Date(), 'day');
  }

  isInvalid(): boolean {
    return isNaN(this.nativeDate.valueOf());
  }

  /**
   * 0-6 (Sunday to Saturday)
   */
  firstDayOfWeek(locale?: string): number {
    return firstDayOfWeek(locale);
  }

  private toNativeDate(date: CandyDate | Date = this): Date {
    return date instanceof CandyDate ? date.nativeDate : date;
  }

  // compare(date: CandyDate, Date, grain: CandyDateCompareGrain = 'millisecond'): number {
  //   const level = { 'millisecond': 1, 'second': 1000, 'minute': 1000 * 60, 'hour': 1000 * 60 * 60, 'day': 1000 * 60 * 60 * 24 }[ grain ];
  //   const left = this.nativeDate.getTime() / level;
  //   const right = (date instanceof CandyDate ? date.nativeDate : date).getTime() / level;
  //   return Math.floor(left) - Math.floor(right);
  // }
}

export type CandyDateCompareGrain = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export type CandyDateCompareType = 'eq' | 'gt' | 'lt';
