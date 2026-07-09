/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vi } from 'vitest';

import { CandyDate, NativeDateAdapter, NzDateAdapter, provideNzDateAdapter } from 'ng-zorro-antd/core/time';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { en_US, NzI18nModule } from 'ng-zorro-antd/i18n';

import { DateHeaderComponent } from './date-header.component';
import { DateTableComponent } from './date-table.component';
import { LibPackerModule } from './lib-packer.module';

@Injectable()
class TuesdayStartDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 2;
  }

  override format(date: Date, displayFormat: NzSafeAny): string {
    if (displayFormat === 'E') {
      return `weekday-${date.getDay()}`;
    }
    return super.format(date, displayFormat);
  }
}

// TODO: Add unit test of date-table and month-table
describe('Coverage supplements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibPackerModule, NzI18nModule],
      providers: [provideNzDateAdapter(TuesdayStartDateAdapter)]
    });
  });

  describe('DateTable', () => {
    let componentInstance: DateTableComponent;

    beforeEach(() => {
      componentInstance = TestBed.createComponent(DateTableComponent).componentInstance;
    });

    it('should cover untouched branches', () => {
      componentInstance.value = new CandyDate(new Date(2018, 10, 11));
      componentInstance.showWeek = true;
      const weekRows = componentInstance.makeBodyRows();
      expect(weekRows.length > 0).toBeTruthy();
    });

    it('should use the configured adapter for week start and formatting', () => {
      componentInstance.activeDate = new CandyDate(new Date(2024, 5, 15));
      const headRow = componentInstance.makeHeadRow();

      expect(headRow[0].value.getDay()).toBe(2);
      expect(headRow[0].title).toBe('weekday-2');
    });

    it('should configure custom adapter provider', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [LibPackerModule, NzI18nModule],
        providers: [provideNzDateAdapter(NativeDateAdapter, { firstDayOfWeek: 4, locale: 'zh-CN' })]
      });
      componentInstance = TestBed.createComponent(DateTableComponent).componentInstance;
      componentInstance.activeDate = new CandyDate(new Date(2024, 5, 15));
      const dateAdapter = TestBed.inject(NzDateAdapter);

      expect(componentInstance.makeHeadRow()[0].value.getDay()).toBe(4);
      expect(dateAdapter.format(new Date(2024, 10, 1), 'MMM')).toBe('11月');
    });
  });

  // Tests for issue #9650
  describe('DateHeader', () => {
    let fixture: ComponentFixture<DateHeaderComponent>;
    let componentInstance: DateHeaderComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(DateHeaderComponent);
      componentInstance = fixture.componentInstance;
      componentInstance.value = new CandyDate(new Date(2020, 1, 25));
      componentInstance.locale = en_US.DatePicker.lang;
    });

    it('should accept mode as an input and use default value of "date"', () => {
      expect(componentInstance.mode).toBe('date');
    });

    it('should accept mode input and maintain it as "week"', () => {
      fixture.componentRef.setInput('mode', 'week');
      fixture.detectChanges();
      expect(componentInstance.mode).toBe('week');
    });

    it('should preserve mode when calling changeValue', () => {
      fixture.componentRef.setInput('mode', 'week');
      fixture.detectChanges();
      const initialMode = componentInstance.mode;
      const newValue = new CandyDate(new Date(2020, 2, 15));
      componentInstance.changeValue(newValue);
      expect(componentInstance.mode).toBe(initialMode);
      expect(componentInstance.mode).toBe('week');
    });

    it('should emit panelChange with correct mode when value changes', () => {
      fixture.componentRef.setInput('mode', 'week');
      fixture.detectChanges();
      vi.spyOn(componentInstance.panelChange, 'emit').mockImplementation(() => {});
      const newValue = new CandyDate(new Date(2020, 2, 15));
      componentInstance.changeValue(newValue);
      expect(componentInstance.panelChange.emit).toHaveBeenCalledWith({
        mode: 'week',
        date: newValue.nativeDate
      });
    });
  });
});
