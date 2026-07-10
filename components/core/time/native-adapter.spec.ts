/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';

import { NzDateAdapter } from './date-adapter';
import { NativeDateAdapter, provideNzNativeDateAdapter } from './native-adapter';
import { NzSafeAny } from '../types';

describe('NativeDateAdapter', () => {
  let adapter: NativeDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNativeDateAdapter({ locale: 'en-US' })]
    });
    adapter = TestBed.inject(NzDateAdapter) as NativeDateAdapter;
  });

  // --- Material Core Methods ---

  describe('root provider', () => {
    it('should configure locale from provideNzNativeDateAdapter', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [provideNzNativeDateAdapter({ locale: 'zh-CN' })]
      });
      const a = TestBed.inject(NzDateAdapter) as NativeDateAdapter;
      expect(a.format(new Date(2024, 10, 1), 'MMM')).toBe('11月');
    });
  });

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
    it('should format date with Intl options', () => {
      const date = new Date(2024, 5, 15);
      const result = adapter.format(date, { year: 'numeric', month: '2-digit', day: '2-digit' });
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty string for null-like date', () => {
      expect(adapter.format(null as NzSafeAny, 'yyyy-MM-dd')).toBe('');
    });

    it('should throw for invalid date', () => {
      expect(() => adapter.format(new Date('invalid'), 'yyyy-MM-dd')).toThrow();
    });

    it('should format date with string tokens', () => {
      const date = new Date(2024, 5, 15);
      const result = adapter.format(date, 'yyyy-MM-dd');
      expect(typeof result).toBe('string');
      expect(result).toContain('2024');
    });

    it('should zero-pad numeric time tokens', () => {
      const date = new Date(2024, 0, 2, 0, 5, 6);
      expect(adapter.format(date, 'yyyy-MM-dd HH:mm:ss')).toBe('2024-01-02 00:05:06');
    });

    it('should keep bracket literals out of token replacement', () => {
      const date = new Date(2024, 0, 2, 0, 5, 6);
      expect(adapter.format(date, 'yyyy-[Q]Q [at] HH:mm')).toBe('2024-Q1 at 00:05');
    });

    it('should not replace tokens inside formatted values', () => {
      const date = new Date(2024, 2, 2);
      expect(adapter.format(date, 'MMMM M')).toBe('March 3');
    });

    it('should support date table weekday tokens', () => {
      const date = new Date(2024, 0, 2);
      expect(adapter.format(date, 'E')).toBe('Tue');
      expect(adapter.format(date, 'EEEEE')).toBe('T');
      expect(adapter.format(date, 'EEEEEE')).toBe('T');
    });
  });

  describe('parse', () => {
    it('should parse Date input', () => {
      const date = new Date(2024, 5, 15);
      const result = adapter.parse(date, '');
      expect(result).toBeTruthy();
      expect(result!.getTime()).toBe(date.getTime());
    });

    it('should return null for empty value', () => {
      expect(adapter.parse('', '')).toBeNull();
    });

    it('should handle number input', () => {
      const timestamp = new Date(2024, 5, 15).getTime();
      const result = adapter.parse(timestamp, '');
      expect(result).toBeTruthy();
      expect(result!.getTime()).toBe(timestamp);
    });

    it('should parse string input', () => {
      const result = adapter.parse('2024-06-15', '');
      expect(result).toBeTruthy();
      expect(result!.getFullYear()).toBe(2024);
    });

    it('should parse string input by token format', () => {
      const result = adapter.parse('2024-06-15 14:30:45', 'yyyy-MM-dd HH:mm:ss');
      expect(result).toBeTruthy();
      expect(result!.getFullYear()).toBe(2024);
      expect(result!.getMonth()).toBe(5);
      expect(result!.getDate()).toBe(15);
      expect(result!.getHours()).toBe(14);
      expect(result!.getMinutes()).toBe(30);
      expect(result!.getSeconds()).toBe(45);
    });

    it('should return invalid date for invalid token-parsed dates', () => {
      const result = adapter.parse('2024-02-31', 'yyyy-MM-dd');
      expect(result).toBeTruthy();
      expect(adapter.isValid(result!)).toBeFalsy();
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

  describe('ng-zorro derived', () => {
    const date1 = new Date(2024, 5, 15);

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

  // --- NG-ZORRO Optional: Extended Methods ---

  describe('ng-zorro optional', () => {
    it('getCalendarId should return gregory', () => {
      const result = adapter.getCalendarId(new Date(2024, 5, 15));
      expect(result).toBe('gregory');
    });

    it('getMilliseconds', () => {
      const date = new Date(2024, 5, 15, 10, 30, 45, 123);
      expect(adapter.getMilliseconds(date)).toBe(123);
    });

    it('getTime', () => {
      const date = new Date(2024, 5, 15);
      expect(adapter.getTime(date)).toBe(date.getTime());
    });
  });

  // --- getFirstDayOfWeek ---

  describe('getFirstDayOfWeek', () => {
    it('should default to 0 for en-US', () => {
      expect(adapter.getFirstDayOfWeek()).toBe(0);
    });

    it('should return configured firstDayOfWeek', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [provideNzNativeDateAdapter({ firstDayOfWeek: 4, locale: 'en-US' })]
      });
      const a = TestBed.inject(NzDateAdapter) as NativeDateAdapter;
      expect(a.getFirstDayOfWeek()).toBe(4);
    });

    it('should return 1 for zh-cn locale', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [provideNzNativeDateAdapter({ locale: 'zh-cn' })]
      });
      const a = TestBed.inject(NzDateAdapter) as NativeDateAdapter;
      expect(a.getFirstDayOfWeek()).toBe(1);
    });
  });

  // --- localeChanges ---

  describe('locale management', () => {
    it('should emit on localeChanges when setLocale is called', () => {
      let emitted = false;
      adapter.localeChanges.subscribe(() => (emitted = true));
      adapter.setLocale('zh-cn');
      expect(emitted).toBeTruthy();
    });
  });
});
