/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';

import { enUS } from 'date-fns/locale';

import { NzDateAdapter } from './date-adapter';
import { NZ_DATE_LOCALE } from './date-config';
import { DateFnsDateAdapter, provideNzDateFnsAdapter } from './date-fns-adapter';

describe('DateFnsDateAdapter', () => {
  let adapter: DateFnsDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzDateFnsAdapter(), { provide: NZ_DATE_LOCALE, useValue: enUS }]
    });
    adapter = TestBed.inject(NzDateAdapter) as DateFnsDateAdapter;
  });

  // --- Material Core Methods ---

  describe('material core', () => {
    it('today() should return current date', () => {
      const today = adapter.today();
      expect(today instanceof Date).toBeTruthy();
      expect(Math.abs(today.getTime() - Date.now())).toBeLessThan(1000);
    });

    it('createDate() should create a date', () => {
      const date = adapter.createDate(2024, 5, 15);
      expect(adapter.getYear(date)).toBe(2024);
      expect(adapter.getMonth(date)).toBe(5);
      expect(adapter.getDate(date)).toBe(15);
    });

    it('clone() should create an independent copy', () => {
      const date = new Date(2024, 5, 15);
      const cloned = adapter.clone(date);
      expect(cloned.getTime()).toBe(date.getTime());
      expect(cloned).not.toBe(date);
    });

    it('getYear/getMonth/getDate/getDayOfWeek', () => {
      const date = new Date(2024, 5, 15, 10, 30, 45, 123);
      expect(adapter.getYear(date)).toBe(2024);
      expect(adapter.getMonth(date)).toBe(5);
      expect(adapter.getDate(date)).toBe(15);
      expect(adapter.getDayOfWeek(date)).toBe(6); // Saturday
    });

    it('getNumDaysInMonth', () => {
      expect(adapter.getNumDaysInMonth(new Date(2024, 0, 1))).toBe(31); // January
      expect(adapter.getNumDaysInMonth(new Date(2024, 1, 1))).toBe(29); // February (leap year)
      expect(adapter.getNumDaysInMonth(new Date(2023, 1, 1))).toBe(28); // February (non-leap year)
    });

    it('getMonthNames/getDateNames/getDayOfWeekNames', () => {
      expect(adapter.getMonthNames('long').length).toBe(12);
      expect(adapter.getDateNames().length).toBe(31);
      expect(adapter.getDayOfWeekNames('short').length).toBe(7);
    });

    it('addCalendarYears/addCalendarMonths/addCalendarDays', () => {
      const date = new Date(2024, 5, 15);
      expect(adapter.getYear(adapter.addCalendarYears(date, 2))).toBe(2026);
      expect(adapter.getMonth(adapter.addCalendarMonths(date, 3))).toBe(8);
      expect(adapter.getDate(adapter.addCalendarDays(date, 10))).toBe(25);
    });

    it('isDateInstance', () => {
      expect(adapter.isDateInstance(new Date())).toBeTruthy();
      expect(adapter.isDateInstance('2024-06-15')).toBeFalsy();
    });

    it('isValid', () => {
      expect(adapter.isValid(new Date())).toBeTruthy();
      expect(adapter.isValid(new Date('invalid'))).toBeFalsy();
    });

    it('invalid', () => {
      const invalidDate = adapter.invalid();
      expect(adapter.isValid(invalidDate)).toBeFalsy();
    });

    it('toIso8601', () => {
      const date = new Date(2024, 5, 15);
      expect(adapter.toIso8601(date)).toContain('2024');
    });
  });

  // --- NG-ZORRO Core Methods ---

  describe('ng-zorro core', () => {
    it('getQuarter', () => {
      expect(adapter.getQuarter(new Date(2024, 1, 15))).toBe(1);
      expect(adapter.getQuarter(new Date(2024, 4, 15))).toBe(2);
      expect(adapter.getQuarter(new Date(2024, 7, 15))).toBe(3);
      expect(adapter.getQuarter(new Date(2024, 10, 15))).toBe(4);
    });

    it('setQuarter', () => {
      const result = adapter.setQuarter(new Date(2024, 1, 15), 3);
      expect(adapter.getQuarter(result)).toBe(3);
    });

    it('startOfQuarter', () => {
      const result = adapter.startOfQuarter(new Date(2024, 4, 15));
      expect(adapter.getMonth(result)).toBe(3); // April
      expect(adapter.getDate(result)).toBe(1);
    });

    it('getISOWeek', () => {
      expect(adapter.getISOWeek(new Date(2024, 0, 1))).toBe(1);
    });

    it('setYear/setMonth/setDate', () => {
      const date = new Date(2024, 5, 15);
      expect(adapter.getYear(adapter.setYear(date, 2030))).toBe(2030);
      expect(adapter.getMonth(adapter.setMonth(date, 0))).toBe(0);
      expect(adapter.getDate(adapter.setDate(date, 1))).toBe(1);
    });
  });

  // --- Material Optional: Time Methods ---

  describe('time methods', () => {
    const date = new Date(2024, 5, 15, 10, 30, 45);

    it('setTime', () => {
      const result = adapter.setTime(date, 8, 15, 30);
      expect(adapter.getHours(result)).toBe(8);
      expect(adapter.getMinutes(result)).toBe(15);
      expect(adapter.getSeconds(result)).toBe(30);
    });

    it('getHours/getMinutes/getSeconds', () => {
      expect(adapter.getHours(date)).toBe(10);
      expect(adapter.getMinutes(date)).toBe(30);
      expect(adapter.getSeconds(date)).toBe(45);
    });

    it('parseTime', () => {
      const result = adapter.parseTime('14:30', 'HH:mm');
      expect(result).toBeTruthy();
      expect(result!.getHours()).toBe(14);
      expect(result!.getMinutes()).toBe(30);
    });
  });

  // --- Format / Parse ---

  describe('format', () => {
    it('should format date with date-fns tokens', () => {
      const date = new Date(2024, 5, 15);
      expect(adapter.format(date, 'yyyy-MM-dd')).toBe('2024-06-15');
    });

    it('should return empty string for null-like date', () => {
      expect(adapter.format(null as any, 'yyyy-MM-dd')).toBe(''); // eslint-disable-line @typescript-eslint/no-explicit-any
    });

    it('should throw for invalid date', () => {
      expect(() => adapter.format(new Date('invalid'), 'yyyy-MM-dd')).toThrowError();
    });
  });

  describe('parse', () => {
    it('should parse date string with format', () => {
      const result = adapter.parse('2024-06-15', 'yyyy-MM-dd');
      expect(result).toBeTruthy();
      expect(result!.getFullYear()).toBe(2024);
    });

    it('should return null for empty value', () => {
      expect(adapter.parse('', 'yyyy-MM-dd')).toBeNull();
    });

    it('should handle Date input', () => {
      const date = new Date(2024, 5, 15);
      const result = adapter.parse(date, 'yyyy-MM-dd');
      expect(result).toBeTruthy();
      expect(result!.getTime()).toBe(date.getTime());
    });

    it('should handle number input', () => {
      const timestamp = new Date(2024, 5, 15).getTime();
      const result = adapter.parse(timestamp, 'yyyy-MM-dd');
      expect(result).toBeTruthy();
      expect(result!.getTime()).toBe(timestamp);
    });
  });

  // --- Material Derived Methods ---

  describe('material derived', () => {
    it('compareDate', () => {
      const d1 = new Date(2024, 5, 15);
      const d2 = new Date(2024, 5, 20);
      expect(adapter.compareDate(d1, d2)).toBeLessThan(0);
      expect(adapter.compareDate(d2, d1)).toBeGreaterThan(0);
      expect(adapter.compareDate(d1, new Date(2024, 5, 15))).toBe(0);
    });

    it('sameDate', () => {
      expect(adapter.sameDate(null, null)).toBeTruthy();
      expect(adapter.sameDate(null, new Date())).toBeFalsy();
      expect(adapter.sameDate(new Date(2024, 5, 15), new Date(2024, 5, 15))).toBeTruthy();
    });

    it('clampDate', () => {
      const date = new Date(2024, 5, 15);
      const min = new Date(2024, 5, 10);
      const max = new Date(2024, 5, 20);
      expect(adapter.clampDate(date, min, max)).toBe(date);
      expect(adapter.clampDate(new Date(2024, 5, 5), min, max).getTime()).toBe(min.getTime());
      expect(adapter.clampDate(new Date(2024, 5, 25), min, max).getTime()).toBe(max.getTime());
    });
  });

  // --- NG-ZORRO Derived: Mode-based Comparison ---

  describe('ng-zorro derived', () => {
    const date1 = new Date(2024, 5, 15);
    const date2 = new Date(2024, 5, 20);
    const date3 = new Date(2025, 5, 15);

    it('compareDateWithMode', () => {
      expect(adapter.compareDateWithMode(date1, date2, 'day')).toBeLessThan(0);
      expect(adapter.compareDateWithMode(date1, date3, 'year')).toBeLessThan(0);
    });

    it('isSameWithMode', () => {
      expect(adapter.isSameWithMode(date1, new Date(2024, 5, 15), 'day')).toBeTruthy();
      expect(adapter.isSameWithMode(date1, date2, 'day')).toBeFalsy();
      expect(adapter.isSameWithMode(date1, date3, 'year')).toBeFalsy();
    });

    it('isBeforeWithMode', () => {
      expect(adapter.isBeforeWithMode(date1, date2, 'day')).toBeTruthy();
      expect(adapter.isBeforeWithMode(date2, date1, 'day')).toBeFalsy();
    });

    it('isFirstDayOfMonth', () => {
      expect(adapter.isFirstDayOfMonth(new Date(2024, 5, 1))).toBeTruthy();
      expect(adapter.isFirstDayOfMonth(new Date(2024, 5, 15))).toBeFalsy();
    });

    it('isLastDayOfMonth', () => {
      expect(adapter.isLastDayOfMonth(new Date(2024, 5, 30))).toBeTruthy();
      expect(adapter.isLastDayOfMonth(new Date(2024, 5, 15))).toBeFalsy();
    });

    it('isToday', () => {
      expect(adapter.isToday(new Date())).toBeTruthy();
      expect(adapter.isToday(date1)).toBeFalsy();
    });

    it('calendarStartOfMonth', () => {
      const result = adapter.calendarStartOfMonth(date1);
      expect(adapter.getDate(result)).toBe(1);
      expect(adapter.getMonth(result)).toBe(5);
    });

    it('calendarStartOfWeek', () => {
      const result = adapter.calendarStartOfWeek(date1);
      expect(adapter.getDayOfWeek(result)).toBe(0); // Sunday
    });
  });

  // --- getFirstDayOfWeek ---

  describe('getFirstDayOfWeek', () => {
    it('should return configured firstDayOfWeek', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [provideNzDateFnsAdapter({ firstDayOfWeek: 4 }), { provide: NZ_DATE_LOCALE, useValue: enUS }]
      });
      const a = TestBed.inject(NzDateAdapter) as DateFnsDateAdapter;
      expect(a.getFirstDayOfWeek()).toBe(4);
    });
  });

  // --- localeChanges ---

  describe('locale management', () => {
    it('should emit on localeChanges when setLocale is called', () => {
      let emitted = false;
      adapter.localeChanges.subscribe(() => (emitted = true));
      adapter.setLocale(enUS);
      expect(emitted).toBeTruthy();
    });
  });
});
