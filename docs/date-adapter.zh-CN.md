---
order: 4
title: 日期适配器
tag: new
---

NG-ZORRO 的日期类组件通过 `NzDateAdapter` 访问日期能力。从 v22 开始，NG-ZORRO 不再默认提供日期引擎适配器，应用需要在根配置中显式提供 adapter。如果你希望与之前版本保持一致，请使用内置的 `date-fns` 适配器。

## 使用内置 Adapter

如果你希望使用基于 `date-fns` 的内置适配器，可以使用 `provideNzDateFnsAdapter`：

```ts
import { ApplicationConfig } from '@angular/core';
import { zhCN } from 'date-fns/locale';

import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';

export const appConfig: ApplicationConfig = {
  providers: [provideNzDateFnsAdapter({ locale: zhCN, firstDayOfWeek: 1 })]
};
```

如果你希望日期能力使用原生 `Date` 和 `Intl.DateTimeFormat` 语义，可以使用内置的 native adapter：

```ts
import { ApplicationConfig } from '@angular/core';

import { provideNzNativeDateAdapter } from 'ng-zorro-antd/core/time';

export const appConfig: ApplicationConfig = {
  providers: [provideNzNativeDateAdapter({ locale: 'zh-CN', firstDayOfWeek: 1 })]
};
```

`NZ_I18N` 控制 NG-ZORRO 组件文案；adapter 的 `locale` 控制日期库的格式化和周规则，例如月份名称、星期名称和周起始日。如果运行时切换语言，也需要用当前 adapter 期望的 locale 值调用 `dateAdapter.setLocale(...)`。

## 使用自定义 Adapter

自定义 adapter 需要继承 `NzDateAdapter<TDate, TLocale>`，其中 `TDate` 是组件使用的日期值类型，`TLocale` 是 locale 类型。为了保持现有组件 API 与表单值兼容，推荐让 `TDate` 继续使用 `Date`，只把格式化、解析和日期计算委托给第三方日期库。

先在你的应用中安装需要的日期库：

```bash
npm install dayjs
```

下面示例使用 Day.js 实现一个 `NzDateAdapter<Date, string>`：

```ts
import { Injectable } from '@angular/core';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import 'dayjs/locale/zh-cn';

import { NzDateAdapter } from 'ng-zorro-antd/core/time';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);
dayjs.extend(localeData);
dayjs.extend(quarterOfYear);

@Injectable()
export class DayjsDateAdapter extends NzDateAdapter<Date, string> {
  constructor() {
    super();
    this.setLocale('zh-cn');
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

在应用根配置中注册它：

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNzDateAdapter } from 'ng-zorro-antd/core/time';
import { DayjsDateAdapter } from './dayjs-date-adapter';

export const appConfig: ApplicationConfig = {
  providers: [provideNzDateAdapter(DayjsDateAdapter, { locale: 'zh-cn', firstDayOfWeek: 1 })]
};
```

## 在业务代码中使用 Adapter

如果业务代码需要和组件使用同一套日期规则，可以直接注入 `NzDateAdapter`：

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

## 注意事项

- DatePicker、Calendar、TimePicker 使用应用根部提供的 adapter。从 v22 开始，如果没有显式配置 adapter，相关组件会因为缺少 `NzDateAdapter` provider 而无法工作。
- `format` 与 `parse` 的格式字符串由当前 adapter 解释。切换日期库后，请确认 `nzFormat`、默认格式和手动解析格式都符合新日期库的 token 语法。
- 如果使用 TimePicker 或 DatePicker 的时间选择能力，请实现 `setTime`、`getHours`、`getMinutes`、`getSeconds`、`parseTime`、`addSeconds` 等时间相关方法。
- 不同日期库的 locale 类型可能不同，自定义 adapter 需要自行解释这个值。
