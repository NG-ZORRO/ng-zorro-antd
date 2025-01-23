/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { fakeAsync, TestBed } from '@angular/core/testing';

import { CandyDate } from 'ng-zorro-antd/core/time';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { DateTableComponent } from './date-table.component';
import { LibPackerModule } from './lib-packer.module';
import { MonthTableComponent } from './month-table.component';

describe('Coverage supplements', () => {
  let componentInstance: NzSafeAny;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [LibPackerModule]
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
});
