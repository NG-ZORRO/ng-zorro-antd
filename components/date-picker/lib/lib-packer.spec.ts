/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { fakeAsync, TestBed } from '@angular/core/testing';

import { CandyDate } from 'ng-zorro-antd/core/time';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { en_US, NzI18nModule } from 'ng-zorro-antd/i18n';

import { DateTableComponent } from './date-table.component';
import { MonthTableComponent } from './month-table.component';
import { DateHeaderComponent } from './date-header.component';
import { LibPackerModule } from './lib-packer.module';

describe('Coverage supplements', () => {
  let componentInstance: NzSafeAny;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [LibPackerModule, NzI18nModule]
    });
  }));

  // describe('CalendarHeader', () => {
  //   beforeEach(() => {
  //     componentInstance = new CalendarHeaderComponent(dateHelper);
  //   });
  //
  //   it('should not render if no relative changes', () => {
  //     // Currently: value/showTimePicker/panelMode will trigger render()
  //     spyOn(componentInstance, 'render');
  //     componentInstance.ngOnChanges({});
  //     expect(componentInstance.render).not.toHaveBeenCalled();
  //   });
  //
  //   it('should step into yearToMonth branch', () => {
  //     const testDate = new CandyDate();
  //     componentInstance.yearToMonth = true;
  //     spyOn(componentInstance, 'changePanel');
  //     componentInstance.onChooseYear(testDate);
  //     expect(componentInstance.changePanel).toHaveBeenCalledWith('month', testDate);
  //   });
  //
  //   it('cover branches of createYearMonthDaySelectors', () => {
  //     componentInstance.value = new CandyDate();
  //     componentInstance.locale = {
  //       monthBeforeYear: true,
  //       monthFormat: 'yyyy-MM'
  //     };
  //     componentInstance.showTimePicker = true;
  //     spyOn(componentInstance, 'changePanel');
  //     spyOn(componentInstance, 'changeToMonthPanel');
  //     spyOn(componentInstance, 'formatDateTime');
  //     const result = componentInstance.createYearMonthDaySelectors();
  //
  //     // should support locale.monthBeforeYear
  //     expect(result[0].className).toContain('month-select'); // "month" tobe the first place
  //
  //     // should not fire onClick of year/month selector when showTimePicker=true
  //     result[0].onClick(); // month
  //     result[2].onClick(); // year
  //     expect(componentInstance.changePanel).not.toHaveBeenCalled();
  //     expect(componentInstance.changeToMonthPanel).not.toHaveBeenCalled();
  //
  //     // should support locale.monthFormat
  //     expect(componentInstance.formatDateTime).toHaveBeenCalledWith(componentInstance.locale.monthFormat);
  //   });
  // }); // /CalendarHeader

  // TODO: Unit test of date-table and month-table
  describe('DateTable', () => {
    beforeEach(() => {
      componentInstance = TestBed.createComponent(DateTableComponent).componentInstance;
    });

    it('should cover untouched branches', () => {
      componentInstance.value = new CandyDate('2018-11-11');
      componentInstance.showWeek = true;
      const weekRows = componentInstance.makeBodyRows();
      expect(weekRows.length > 0).toBeTruthy();
    });
  }); // /DateTable

  describe('MonthTable', () => {
    beforeEach(() => {
      componentInstance = TestBed.createComponent(MonthTableComponent).componentInstance;
    });

    it('should cover untouched branches', () => {
      componentInstance.value = new CandyDate();
      spyOn(componentInstance, 'render');
      componentInstance.ngOnChanges({ disabledDate: true }); // Fake
      expect(componentInstance.render).toHaveBeenCalled();
    });
  }); // /MonthTable

  // Tests for issue #9650
  describe('DateHeader', () => {
    beforeEach(() => {
      componentInstance = TestBed.createComponent(DateHeaderComponent).componentInstance;
      componentInstance.value = new CandyDate('2020-02-25');
      componentInstance.locale = en_US.DatePicker.lang;
    });

    it('should accept mode as an input and use default value of "date"', () => {
      componentInstance.ngOnInit();
      expect(componentInstance.mode).toBe('date');
    });

    it('should accept mode input and maintain it as "week"', () => {
      componentInstance.mode = 'week';
      componentInstance.ngOnInit();
      expect(componentInstance.mode).toBe('week');
    });

    it('should preserve mode when calling changeValue', () => {
      componentInstance.mode = 'week';
      componentInstance.ngOnInit();
      const initialMode = componentInstance.mode;
      const newValue = new CandyDate('2020-03-15');
      componentInstance.changeValue(newValue);
      expect(componentInstance.mode).toBe(initialMode);
      expect(componentInstance.mode).toBe('week');
    });

    it('should emit panelChange with correct mode when value changes', () => {
      componentInstance.mode = 'week';
      componentInstance.ngOnInit();
      spyOn(componentInstance.panelChange, 'emit');
      const newValue = new CandyDate('2020-03-15');
      componentInstance.changeValue(newValue);
      expect(componentInstance.panelChange.emit).toHaveBeenCalledWith({
        mode: 'week',
        date: newValue.nativeDate
      });
    });
  }); // /DateHeader
});
