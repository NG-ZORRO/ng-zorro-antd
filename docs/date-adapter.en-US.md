---
order: 4
title: Custom Date Library
---

NG-ZORRO date components access date operations through `NzDateAdapter`. Components use the built-in `date-fns` adapter by default. If you want to use native `Date`, Day.js, Luxon, Jalali, or another date library, provide your own adapter at the application root.

## Built-in Adapters

The default adapter is based on `date-fns`. You can configure it explicitly with `provideNzDateFnsAdapter`:

```ts
import { ApplicationConfig } from '@angular/core';
import { enUS } from 'date-fns/locale';

import { provideNzDateFnsAdapter, NZ_DATE_LOCALE } from 'ng-zorro-antd/core/time';

export const appConfig: ApplicationConfig = {
  providers: [provideNzDateFnsAdapter({ firstDayOfWeek: 1 }), { provide: NZ_DATE_LOCALE, useValue: enUS }]
};
```

If you do not want to depend on `date-fns`, use the built-in native adapter:

```ts
import { ApplicationConfig } from '@angular/core';

import { provideNzNativeDateAdapter, NZ_DATE_LOCALE } from 'ng-zorro-antd/core/time';

export const appConfig: ApplicationConfig = {
  providers: [provideNzNativeDateAdapter({ firstDayOfWeek: 1 }), { provide: NZ_DATE_LOCALE, useValue: 'en-US' }]
};
```

## Custom Adapter

A custom adapter extends `NzDateAdapter<D, L>`, where `D` is the date value type used by components and `L` is the locale type. To stay compatible with existing component APIs and form values, prefer keeping `D` as `Date` and delegating formatting, parsing, and date math to your chosen date library.

Install the date library in your application first:

```bash
npm install dayjs
```

The following example implements `NzDateAdapter<Date, string>` with Day.js:

```ts
import { Injectable } from '@angular/core';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

import { NzDateAdapter } from 'ng-zorro-antd/core/time';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);
dayjs.extend(localeData);
dayjs.extend(quarterOfYear);

@Injectable()
export class DayjsDateAdapter extends NzDateAdapter<Date, string> {
  constructor() {
    super();
    this.setLocale('en');
  }

  override setLocale(locale: string): void {
    dayjs.locale(locale);
    super.setLocale(locale);
  }

  today(): Date {
    return new Date();
  }

  createDate(year: number, month: number, date: number): Date {
    const result = dayjs().year(year).month(month).date(date).startOf('day');
    return result.isValid() && result.month() === month ? result.toDate() : this.invalid();
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  getYear(date: Date): number {
    return dayjs(date).year();
  }

  getMonth(date: Date): number {
    return dayjs(date).month();
  }

  getDate(date: Date): number {
    return dayjs(date).date();
  }

  getDayOfWeek(date: Date): number {
    return dayjs(date).day();
  }

  getNumDaysInMonth(date: Date): number {
    return dayjs(date).daysInMonth();
  }

  getYearName(date: Date): string {
    return dayjs(date).format('YYYY');
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const format = style === 'long' ? 'MMMM' : style === 'short' ? 'MMM' : 'M';
    return Array.from({ length: 12 }, (_, i) => dayjs().month(i).format(format));
  }

  getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => String(i + 1));
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const format = style === 'long' ? 'dddd' : style === 'short' ? 'ddd' : 'dd';
    return Array.from({ length: 7 }, (_, i) => dayjs().day(i).format(format));
  }

  getFirstDayOfWeek(): number {
    return dayjs.localeData().firstDayOfWeek();
  }

  addCalendarYears(date: Date, years: number): Date {
    return dayjs(date).add(years, 'year').toDate();
  }

  addCalendarMonths(date: Date, months: number): Date {
    return dayjs(date).add(months, 'month').toDate();
  }

  addCalendarDays(date: Date, days: number): Date {
    return dayjs(date).add(days, 'day').toDate();
  }

  format(date: Date, displayFormat: unknown): string {
    return this.isValid(date) ? dayjs(date).format(String(displayFormat)) : '';
  }

  parse(value: unknown, parseFormat: unknown): Date | null {
    if (value == null || value === '') {
      return null;
    }
    if (value instanceof Date) {
      return this.clone(value);
    }
    const parsed =
      typeof parseFormat === 'string'
        ? dayjs(String(value), parseFormat, this.locale, true)
        : dayjs(value as string | number);
    return parsed.isValid() ? parsed.toDate() : this.invalid();
  }

  isDateInstance(obj: unknown): boolean {
    return obj instanceof Date;
  }

  isValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  invalid(): Date {
    return new Date(NaN);
  }

  toIso8601(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  getQuarter(date: Date): number {
    return dayjs(date).quarter();
  }

  setQuarter(date: Date, quarter: number): Date {
    return dayjs(date).quarter(quarter).toDate();
  }

  startOfQuarter(date: Date): Date {
    return dayjs(date).startOf('quarter').toDate();
  }

  getISOWeek(date: Date): number {
    return dayjs(date).isoWeek();
  }

  setYear(date: Date, year: number): Date {
    return dayjs(date).year(year).toDate();
  }

  setMonth(date: Date, month: number): Date {
    return dayjs(date).month(month).toDate();
  }

  setDate(date: Date, dateOfMonth: number): Date {
    return dayjs(date).date(dateOfMonth).toDate();
  }

  override setTime(date: Date, hours: number, minutes: number, seconds: number): Date {
    return dayjs(date).hour(hours).minute(minutes).second(seconds).millisecond(0).toDate();
  }

  override getHours(date: Date): number {
    return dayjs(date).hour();
  }

  override getMinutes(date: Date): number {
    return dayjs(date).minute();
  }

  override getSeconds(date: Date): number {
    return dayjs(date).second();
  }

  override parseTime(value: unknown, parseFormat: unknown = 'HH:mm:ss'): Date | null {
    return this.parse(value, parseFormat);
  }

  override addSeconds(date: Date, amount: number): Date {
    return dayjs(date).add(amount, 'second').toDate();
  }

  override getMilliseconds(date: Date): number {
    return dayjs(date).millisecond();
  }

  override getTime(date: Date): number {
    return date.getTime();
  }
}
```

Register it in the application root:

```ts
import { ApplicationConfig } from '@angular/core';

import { provideNzDateAdapter, NZ_DATE_LOCALE } from 'ng-zorro-antd/core/time';

import { DayjsDateAdapter } from './dayjs-date-adapter';

export const appConfig: ApplicationConfig = {
  providers: [provideNzDateAdapter(DayjsDateAdapter), { provide: NZ_DATE_LOCALE, useValue: 'en' }]
};
```

## Use the Adapter in Application Code

If application code needs the same date rules as NG-ZORRO components, inject `NzDateAdapter` directly:

```ts
import { Component, inject } from '@angular/core';

import { NzDateAdapter } from 'ng-zorro-antd/core/time';

@Component({
  selector: 'app-demo',
  template: `{{ label }}`
})
export class DemoComponent {
  private readonly dateAdapter = inject(NzDateAdapter);

  readonly value = this.dateAdapter.today();
  readonly label = this.dateAdapter.format(this.value, 'YYYY-MM-DD');
}
```

## Notes

- DatePicker, Calendar, and TimePicker prefer the adapter provided at the application root. If no adapter is configured explicitly, components fall back to the default `date-fns` adapter.
- `format` and `parse` formats are interpreted by the current adapter. After switching date libraries, make sure `nzFormat`, default formats, and manually parsed formats use the token syntax of that library.
- If you use TimePicker or DatePicker time selection, implement time-related methods such as `setTime`, `getHours`, `getMinutes`, `getSeconds`, `parseTime`, and `addSeconds`.
- `NZ_DATE_LOCALE` is passed to the current adapter. Different date libraries use different locale value types, so custom adapters should interpret this value themselves.
