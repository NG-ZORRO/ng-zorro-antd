/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';

import { enUS } from 'date-fns/locale';

import { DateFnsDateAdapter, provideNzDateAdapter } from 'ng-zorro-antd/core/time';

import { NZ_DATE_CONFIG } from './date-config';
import { DateHelperService } from './date-helper.service';
import en_US from './languages/en_US';
import { NzI18nModule } from './nz-i18n.module';
import { NZ_DATE_LOCALE, provideNzI18n } from './nz-i18n.token';

describe('DateHelperService', () => {
  let dateHelper: DateHelperService;

  describe('Formatting with DateFnsDateAdapter', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NzI18nModule],
        providers: [
          provideNzDateAdapter(DateFnsDateAdapter),
          provideNzI18n(en_US),
          { provide: NZ_DATE_LOCALE, useValue: enUS }
        ]
      });

      dateHelper = TestBed.inject(DateHelperService);
    });

    it('should do formatting correctly', () => {
      const date = new Date('2018-12-31 12:11:10');
      expect(dateHelper.format(date, 'yyyy-MM-dd')).toBe('2018-12-31');
      expect(dateHelper.format(date, 'RRRR-II')).toBe('2019-01'); // ISO week
    });

    it('should get first day of week', () => {
      // When using enUS locale, date-fns default weekStartsOn is 0 (Sunday)
      expect(dateHelper.getFirstDayOfWeek()).toBe(0);
    });

    it('should do parseTime correctly', () => {
      expect(dateHelper.parseTime('14:00', 'HH:mm')?.toTimeString().substr(0, 8)).toBe('14:00:00');
      expect(dateHelper.parseTime('4:00', 'H:mm')?.toTimeString().substr(0, 8)).toBe('04:00:00');
    });

    it('should do formatting quarter', () => {
      const date = new Date('2024-04-08 18:18:10');
      expect(dateHelper.format(date, 'yyyy-Q')).toBe('2024-2');
      expect(dateHelper.format(date, 'yyyy-QQ')).toBe('2024-02');
      expect(dateHelper.format(date, 'yyyy-QQQ')).toBe('2024-Q2');
      expect(dateHelper.format(date, 'yyyy-QQQQ')).toBe('2024-2nd quarter');
    });
  });

  describe('Custom firstDayOfWeek', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NzI18nModule],
        providers: [
          provideNzDateAdapter(DateFnsDateAdapter),
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
