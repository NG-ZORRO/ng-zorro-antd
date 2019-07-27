/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import moment from 'jalali-moment';
import { IndexableObject } from 'ng-zorro-antd/core';
/**
 * Wrapping kind APIs for date operating and unify
 * NOTE: every new API return new CandyDate object without side effects to the former Date object
 * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
 * TODO: support format() against to angular's core API
 */
export class CandyDate implements IndexableObject {
  _moment: moment.Moment;
  _locale: string;
  // locale: string; // Custom specified locale ID

  constructor(date?: moment.Moment | Date | string, locale: string = 'en') {
    // if (!(this instanceof CandyDate)) {
    //   return new CandyDate(date);
    // }
    this._moment = moment();
    this._locale = locale;
    this._moment.locale(this._locale);
    if (date) {
      this._moment = moment(date);
    } else {
      this._moment = moment(new Date());
    }
    console.log(this._moment.format());
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
    return this._moment.weekday();
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
    return new CandyDate(this._moment, this._locale);
  }

  setHms(hour: number, minute: number, second: number): CandyDate {
    const date = moment(this._moment);
    date.set({
      hour: hour,
      minute: minute,
      second: second
    });
    return new CandyDate(date, this._locale);
  }

  setYear(year: number): CandyDate {
    this._moment.year(year);
    return new CandyDate(this._moment, this._locale);
  }

  addYears(amount: number): CandyDate {
    this._moment.add(amount, 'years');
    return new CandyDate(this._moment, this._locale);
  }

  // NOTE: month starts from 0
  setMonth(month: number): CandyDate {
    this._moment.month(month);
    return new CandyDate(this._moment, this._locale);
  }

  addMonths(amount: number): CandyDate {
    this._moment.add(amount, 'months');
    return new CandyDate(this._moment, this._locale);
  }

  setDay(day: number): CandyDate {
    this._moment.weekday(day);
    return new CandyDate(this._moment, this._locale);
  }

  setDate(amount: number): CandyDate {
    this._moment.date(amount);
    return new CandyDate(this._moment, this._locale);
  }

  addDays(amount: number): CandyDate {
    this._moment.add(amount, 'days');
    return new CandyDate(this._moment, this._locale);
  }

  endOf(grain: 'month'): CandyDate | null {
    switch (grain) {
      case 'month':
        this._moment.endOf('month');
        return new CandyDate(this._moment, this._locale);
    }
    return null;
  }

  isSame(date: moment.Moment | CandyDate | Date, grain: CandyDateCompareGrain): boolean {
    // TODO: Precipitate into a function "compare()"
    if (date) {
      const left = this.toMoment();
      const right = this.toMoment(date);
      return left.isSame(right, grain);
    }
    return false;
  }

  isAfter(date: moment.Moment | CandyDate | Date | null, grain: CandyDateCompareGrain): boolean {
    // TODO: Precipitate into a function "compare()"
    if (date) {
      const left = this.toMoment();
      const right = this.toMoment(date);
      return left.isAfter(right, grain);
    }
    return false;
  }

  // TODO: Precipitate into a function "compare()"
  isBefore(date: moment.Moment | CandyDate | Date | null, grain: CandyDateCompareGrain): boolean {
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

  private toMoment(date: moment.Moment | CandyDate | Date = this): moment.Moment {
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
