import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { fakeAsync, inject, TestBed } from '@angular/core/testing';

import { CandyDate } from 'ng-zorro-antd/core/time';
import { DateHelperService } from '../../i18n/date-helper.service';
import { NzI18nService } from '../../i18n/nz-i18n.service';
import { DateTableComponent } from './date-table.component';
import { LibPackerModule } from './lib-packer.module';
import { MonthTableComponent } from './month-table.component';

registerLocaleData(zh);

describe('Coverage supplements', () => {
  let componentInstance: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  let dateHelper: DateHelperService;
  let i18n: NzI18nService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [LibPackerModule]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([NzI18nService, DateHelperService], (i18nService: NzI18nService, dateHelperService: DateHelperService) => {
    dateHelper = dateHelperService;
    i18n = i18nService;
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
      componentInstance = new DateTableComponent(i18n, dateHelper);
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
      componentInstance = new MonthTableComponent(dateHelper);
    });

    it('should cover untouched branches', () => {
      componentInstance.value = new CandyDate();
      spyOn(componentInstance, 'render');
      componentInstance.ngOnChanges({ disabledDate: true }); // Fake
      expect(componentInstance.render).toHaveBeenCalled();
    });
  }); // /MonthTable
});
