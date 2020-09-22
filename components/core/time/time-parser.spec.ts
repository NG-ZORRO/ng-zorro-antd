import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Injector, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgTimeParser, TimeResult } from './time-parser';

describe('Parse time with angular format', () => {
  let injector: Injector;
  let localeId: string;
  let parser: NgTimeParser;
  let result: TimeResult | null;
  let time: Date;

  describe('default locale', () => {
    beforeEach(() => {
      injector = TestBed.configureTestingModule({});
      localeId = injector.get(LOCALE_ID);
    });

    it('should parse hh:mm:ss a', () => {
      parser = new NgTimeParser('hh:mm:ss a', localeId);
      result = parser.getTimeResult('12:30:22 AM');
      expect(result?.hour).toBe(12);
      expect(result?.minute).toBe(30);
      expect(result?.second).toBe(22);
      expect(result?.period).toBe(0);

      result = parser.getTimeResult('12:30:22 PM');
      expect(result?.period).toBe(1);

      time = parser.toDate('12:30:22 PM');
      expect(time.getHours()).toBe(12);
      expect(time.getMinutes()).toBe(30);
      expect(time.getSeconds()).toBe(22);

      time = parser.toDate('05:30:22 PM');
      expect(time.getHours()).toBe(17);
    });

    it('should parse hh:mm:ss aaaaa', () => {
      parser = new NgTimeParser('hh:mm:ss aaaaa', localeId);
      result = parser.getTimeResult('12:30:22 a');
      expect(result?.hour).toBe(12);
      expect(result?.minute).toBe(30);
      expect(result?.second).toBe(22);
      expect(result?.period).toBe(0);

      result = parser.getTimeResult('12:30:22 p');
      expect(result?.period).toBe(1);
    });

    it('should parse mm(ss) HH', () => {
      parser = new NgTimeParser('mm(ss) HH', localeId);
      result = parser.getTimeResult('30(22) 12');
      expect(result?.period).toBe(null);

      time = parser.toDate('30(22) 12');
      expect(time.getHours()).toBe(12);
      expect(time.getMinutes()).toBe(30);
      expect(time.getSeconds()).toBe(22);
    });

    it('should parse ss + mm', () => {
      parser = new NgTimeParser('ss + mm', localeId);
      time = parser.toDate('10 + 42');
      const now = new Date();
      expect(time.getHours()).toBe(now.getHours());
      expect(time.getMinutes()).toBe(42);
      expect(time.getSeconds()).toBe(10);
    });
  });

  describe('zh locale', () => {
    registerLocaleData(zh);
    beforeEach(() => {
      injector = TestBed.configureTestingModule({
        providers: [{ provide: LOCALE_ID, useValue: 'zh-CN' }]
      });
      localeId = injector.get(LOCALE_ID);
    });

    it('should parse hh:mm:ss a', () => {
      parser = new NgTimeParser('hh:mm:ss a', localeId);
      result = parser.getTimeResult('04:45:22 上午');
      expect(result?.hour).toBe(4);
      expect(result?.minute).toBe(45);
      expect(result?.second).toBe(22);
      expect(result?.period).toBe(0);

      time = parser.toDate('04:45:22 下午');
      expect(time.getHours()).toBe(16);
    });
  });
});
