/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import * as momentNs from 'jalali-moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'jalali-moment';
import { IndexableObject } from 'ng-zorro-antd/core';
const moment = momentNs;
/**
 * Wrapping kind APIs for date operating and unify
 * NOTE: every new API return new CandyDate object without side effects to the former Date object
 * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
 * TODO: support format() against to angular's core API
 */
export class CandyDate implements IndexableObject {
  _moment: Moment;
  // locale: string; // Custom specified locale ID

  constructor(date?: Moment | Date | string, private dateLocale: string = 'en') {
    if (date) {
      this._moment = moment(date);
    } else {
      this._moment = moment();
    }
    // tslint:disable-no-parameter-reassignment
    // dateLocale = 'fa';
    this._moment.locale(dateLocale);
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
    return this._moment.year();
  }

  getMonth(): number {
    return this._moment.month();
  }

  getDay(): number {
    return this._moment.day();
  }

  getTime(): number {
    return this._moment.valueOf();
  }

  getDate(): number {
    return this._moment.date();
  }

  getHours(): number {
    return this._moment.hour();
  }

  getMinutes(): number {
    return this._moment.minute();
  }

  getSeconds(): number {
    return this._moment.second();
  }

  getMilliseconds(): number {
    return this._moment.millisecond();
  }

  // ---------------------------------------------------------------------
  // | New implementing APIs
  // ---------------------------------------------------------------------

  clone(): CandyDate {
    return new CandyDate(this._moment, this.dateLocale);
  }

  setHms(hour: number, minute: number, second: number): CandyDate {
    const date = moment(this._moment);
    date.set({
      hour: hour,
      minute: minute,
      second: second
    });
    return new CandyDate(date, this.dateLocale);
  }

  setYear(year: number): CandyDate {
    this._moment.year(year);
    return new CandyDate(this._moment, this.dateLocale);
  }

  addYears(amount: number): CandyDate {
    this._moment.add(amount, 'years');
    return new CandyDate(this._moment, this.dateLocale);
  }

  // NOTE: month starts from 0
  setMonth(month: number): CandyDate {
    this._moment.month(month);
    return new CandyDate(this._moment, this.dateLocale);
  }

  addMonths(amount: number): CandyDate {
    this._moment.add(amount, 'months');
    return new CandyDate(this._moment, this.dateLocale);
  }

  setDay(day: number): CandyDate {
    this._moment.day(day);
    return new CandyDate(this._moment, this.dateLocale);
  }

  setDate(amount: number): CandyDate {
    this._moment.date(amount);
    return new CandyDate(this._moment, this.dateLocale);
  }

  setLocale(locale: string): CandyDate {
    return new CandyDate(this._moment, locale);
  }
  addDays(amount: number): CandyDate {
    this._moment.add(amount, 'days');
    return new CandyDate(this._moment, this.dateLocale);
  }

  endOf(grain: 'month'): CandyDate | null {
    switch (grain) {
      case 'month':
        this._moment.endOf('month');
        return new CandyDate(this._moment, this.dateLocale);
    }
    return null;
  }

  isSame(date: Moment | CandyDate | Date, grain: CandyDateCompareGrain): boolean {
    // TODO: Precipitate into a function "compare()"
    if (date) {
      const left = this.toMoment();
      const right = this.toMoment(date);
      return left.isSame(right, grain);
    }
    return false;
  }

  isAfter(date: Moment | CandyDate | Date | null, grain: CandyDateCompareGrain): boolean {
    // TODO: Precipitate into a function "compare()"
    if (date) {
      const left = this.toMoment();
      const right = this.toMoment(date);
      return left.isAfter(right, grain);
    }
    return false;
  }

  // TODO: Precipitate into a function "compare()"
  isBefore(date: Moment | CandyDate | Date | null, grain: CandyDateCompareGrain): boolean {
    // TODO: Precipitate into a function "compare()"
    if (date) {
      const left = this.toMoment();
      const right = this.toMoment(date);
      return left.isBefore(right, grain);
    }
    return false;
  }

  // Equal to today accurate to "day"
  isToday(): boolean {
    return this.isSame(moment(), 'day');
  }

  isInvalid(): boolean {
    return isNaN(this._moment.valueOf());
  }

  private toMoment(date: Moment | CandyDate | Date = this): Moment {
    return date instanceof CandyDate ? date._moment : moment(date);
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
