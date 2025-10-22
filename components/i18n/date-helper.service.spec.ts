/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';

import { enUS } from 'date-fns/locale';

import { NZ_DATE_CONFIG } from './date-config';
import { DateHelperByDatePipe, DateHelperService } from './date-helper.service';
import en_US from './languages/en_US';
import { NzI18nModule } from './nz-i18n.module';
import { NZ_DATE_LOCALE, provideNzI18n } from './nz-i18n.token';

describe('DateHelperService', () => {
  let dateHelper: DateHelperService;

  describe('Formatting with DatePipe', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NzI18nModule],
        providers: [provideNzI18n(en_US)]
      });

      dateHelper = TestBed.inject(DateHelperService);
    });

    it('should do formatting by DatePipe', () => {
      expect(dateHelper instanceof DateHelperByDatePipe).toBeTruthy();
    });

    it('should do formatting correctly', () => {
      const date = new Date('2018-12-31 12:11:10');
      expect(dateHelper.format(date, 'yyyy-MM-dd')).toBe('2018-12-31');
      expect(dateHelper.format(date, 'ww')).toBe('01');
    });

    it('should get first day of week with 0 by en_US', () => {
      expect(dateHelper.getFirstDayOfWeek()).toBe(0);
    });

    it('should do parseTime correctly', () => {
      expect(dateHelper.parseTime('14:00', 'HH:mm')?.toTimeString().substr(0, 5)).toBe('14:00');
      expect(dateHelper.parseTime('4:00', 'H:mm')?.toTimeString().substr(0, 5)).toBe('04:00');
    });

    it('should do formatting quarter', () => {
      const date = new Date('2024-04-08 18:18:10');
      expect(dateHelper.format(date, 'yyyy-Q')).toBe('2024-2');
      expect(dateHelper.format(date, 'yyyy-QQ')).toBe('2024-02');
      expect(dateHelper.format(date, 'yyyy-QQQ')).toBe('2024-Q2');
      expect(dateHelper.format(date, 'yyyy-QQQQ')).toBe('2024-2');
      expect(dateHelper.format(date, 'yyyy-[Q]Q')).toBe('2024-Q2');
      expect(dateHelper.format(date, 'yyyy-[QQ]Q')).toBe('2024-QQ2');
    });
  });

  describe('Formatting with Data-fns', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NzI18nModule],
        providers: [{ provide: NZ_DATE_LOCALE, useValue: enUS }]
      });

      dateHelper = TestBed.inject(DateHelperService);
    });

    it('should do formatting by Date-fns', () => {
      expect(dateHelper instanceof DateHelperByDatePipe).toBeFalsy();
    });

    it('should do formatting correctly', () => {
      const date = new Date('2018-12-31 12:11:10');
      expect(dateHelper.format(date, 'yyyy-MM-dd')).toBe('2018-12-31');
      expect(dateHelper.format(date, 'RRRR-II')).toBe('2019-01'); // ISO week
    });

    it('should do parseTime correctly', () => {
      expect(dateHelper.parseTime('14:00', 'HH:mm')?.toTimeString().substr(0, 8)).toBe('14:00:00');
      expect(dateHelper.parseTime('4:00', 'H:mm')?.toTimeString().substr(0, 8)).toBe('04:00:00');
    });
  });

  describe('Custom firstDayOfWeek', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NzI18nModule],
        providers: [
          { provide: NZ_DATE_LOCALE, useValue: enUS },
          { provide: NZ_DATE_CONFIG, useValue: { firstDayOfWeek: 4 } }
        ]
      });

      dateHelper = TestBed.inject(DateHelperService);
    });

    it('should set first day of week to 4', () => {
      expect(dateHelper.getFirstDayOfWeek()).toBe(4);
    });
  });
});
