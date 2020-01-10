import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import enDateLocale from 'date-fns/locale/en';
import { NZ_DATE_CONFIG } from './date-config';
import { DateHelperByDatePipe, DateHelperService } from './date-helper.service';
import en_US from './languages/en_US';
import { NzI18nModule } from './nz-i18n.module';
import { NZ_DATE_LOCALE, NZ_I18N } from './nz-i18n.token';

describe('DateHelperService', () => {
  let injector: Injector;
  let dateHelper: DateHelperService;

  describe('Formatting with DatePipe', () => {
    beforeEach(() => {
      injector = TestBed.configureTestingModule({
        imports: [NzI18nModule],
        providers: [{ provide: NZ_I18N, useValue: en_US }]
      });

      dateHelper = injector.get(DateHelperService);
    });

    it('should do formatting by DatePipe', () => {
      expect(dateHelper instanceof DateHelperByDatePipe).toBeTruthy();
    });

    it('should do formatting correctly', () => {
      const date = new Date('2018-12-31 12:11:10');
      expect(dateHelper.format(date, 'yyyy-MM-dd')).toBe('2018-12-31');
      expect(dateHelper.format(date, 'yyyy-ww')).toBe('2018-53');
    });

    it('should get first day of week with 0 by en_US', () => {
      expect(dateHelper.getFirstDayOfWeek()).toBe(0);
    });
  });

  describe('Formatting with Data-fns', () => {
    beforeEach(() => {
      injector = TestBed.configureTestingModule({
        imports: [NzI18nModule],
        providers: [{ provide: NZ_DATE_LOCALE, useValue: enDateLocale }]
      });

      dateHelper = injector.get(DateHelperService);
    });

    it('should do formatting by Date-fns', () => {
      expect(dateHelper instanceof DateHelperByDatePipe).toBeFalsy();
    });

    it('should do formatting correctly', () => {
      const date = new Date('2018-12-31 12:11:10');
      expect(dateHelper.format(date, 'YYYY-MM-DD')).toBe('2018-12-31');
      expect(dateHelper.format(date, 'WW')).toBe('01'); // ISO week
    });
  });

  describe('Custom firstDayOfWeek', () => {
    beforeEach(() => {
      injector = TestBed.configureTestingModule({
        imports: [NzI18nModule],
        providers: [{ provide: NZ_DATE_CONFIG, useValue: { firstDayOfWeek: 4 } }]
      });

      dateHelper = injector.get(DateHelperService);
    });

    it('should set first day of week to 4', () => {
      expect(dateHelper.getFirstDayOfWeek()).toBe(4);
    });
  });
});
