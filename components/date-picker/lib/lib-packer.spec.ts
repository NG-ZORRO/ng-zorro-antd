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

// Calendar months follow Gregorian month lengths, but begin fourteen days later.
@Injectable()
class ShiftedDateAdapter extends NativeDateAdapter {
  private shift(date: Date, days: number): Date {
    const result = this.clone(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  override today(): Date {
    return new Date(2024, 1, 20);
  }

  override getFirstDayOfWeek(): number {
    return 6;
  }

  override getYear(date: Date): number {
    return this.shift(date, -14).getFullYear();
  }

  override getMonth(date: Date): number {
    return this.shift(date, -14).getMonth();
  }

  override getDate(date: Date): number {
    return this.shift(date, -14).getDate();
  }

  override createDate(year: number, month: number, day: number): Date {
    return new Date(year, month, day + 14);
  }

  override getNumDaysInMonth(date: Date): number {
    return new Date(this.getYear(date), this.getMonth(date) + 1, 0).getDate();
  }

  override addCalendarDays(date: Date, days: number): Date {
    return this.shift(date, days);
  }

  override addCalendarMonths(date: Date, months: number): Date {
    const result = this.shift(date, -14);
    const day = result.getDate();
    result.setDate(1);
    result.setMonth(result.getMonth() + months);
    result.setDate(Math.min(day, new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate()));
    return this.shift(result, 14);
  }

  override setYear(date: Date, year: number): Date {
    const result = this.shift(date, -14);
    result.setFullYear(year);
    return this.shift(result, 14);
  }

  override setMonth(date: Date, month: number): Date {
    const result = this.shift(date, -14);
    result.setMonth(month);
    return this.shift(result, 14);
  }

  override setDate(date: Date, day: number): Date {
    const result = this.shift(date, -14);
    result.setDate(day);
    return this.shift(result, 14);
  }

  override format(date: Date, displayFormat: unknown): string {
    if (displayFormat === 'E' || displayFormat === 'EEEEEE' || displayFormat === 'dd') {
      return super.format(date, displayFormat);
    }
    return `${this.getYear(date)}-${this.getMonth(date) + 1}-${this.getDate(date)}`;
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
      expect(headRow[0].value).toEqual(new Date(2024, 4, 28));
      expect(componentInstance.makeBodyRows()[0].dateCells[0].value).toEqual(new Date(2024, 4, 28));
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
      expect(componentInstance.makeBodyRows()[0].dateCells[0].value).toEqual(new Date(2024, 4, 30));
      expect(dateAdapter.format(new Date(2024, 10, 1), 'MMM')).toBe('11月');
    });
  });

  describe('DateTable with a custom calendar', () => {
    let fixture: ComponentFixture<DateTableComponent>;
    let component: DateTableComponent;

    beforeEach(() => {
      TestBed.overrideProvider(NzDateAdapter, { useFactory: () => new ShiftedDateAdapter(), deps: [] });
      fixture = TestBed.createComponent(DateTableComponent);
      component = fixture.componentInstance;
    });

    it.each<[Date, Date, Date, number]>([
      // Active date, calendar month start, Saturday at the start of the grid, month length.
      [new Date(2024, 0, 10), new Date(2023, 11, 15), new Date(2023, 11, 9), 31],
      [new Date(2024, 1, 10), new Date(2024, 0, 15), new Date(2024, 0, 13), 31],
      [new Date(2024, 2, 10), new Date(2024, 1, 15), new Date(2024, 1, 10), 29],
      [new Date(2024, 3, 10), new Date(2024, 2, 15), new Date(2024, 2, 9), 31]
    ])('should build the calendar grid for %s', (active, monthStart, gridStart, monthLength) => {
      component.activeDate = new CandyDate(active);
      const cells = component.makeBodyRows().flatMap(row => row.dateCells);
      const offset = Math.round((monthStart.getTime() - gridStart.getTime()) / 86400000);

      expect(cells).toHaveLength(42);
      expect(cells.map(cell => cell.value)).toEqual(
        Array.from(
          { length: 42 },
          (_, i) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i)
        )
      );
      expect(component.makeHeadRow().map(cell => cell.value)).toEqual(cells.slice(0, 7).map(cell => cell.value));
      expect(component.makeHeadRow()[0].value.getDay()).toBe(6);
      expect(cells.slice(offset, offset + monthLength).map(cell => cell.content)).toEqual(
        Array.from({ length: monthLength }, (_, i) => `${i + 1}`)
      );
      expect(cells.map(cell => component.getClassMap(cell)['ant-picker-cell-in-view'])).toEqual(
        cells.map((_, i) => i >= offset && i < offset + monthLength)
      );
      expect(cells[offset].title).toBe(`${monthStart.getFullYear()}-${monthStart.getMonth() + 1}-1`);
    });

    it('should use adapter today and select by calendar day, with no selection for an absent value', () => {
      component.activeDate = new CandyDate(new Date(2024, 1, 20));
      component.canSelectWeek = true;
      fixture.detectChanges();
      expect(component.bodyRows.flatMap(row => row.dateCells).filter(cell => cell.isSelected)).toEqual([]);
      expect(component.bodyRows.some(row => row.isActive)).toBe(false);
      const element: HTMLElement = fixture.nativeElement;
      const today = element.querySelectorAll('.ant-picker-cell-today');
      expect(today).toHaveLength(1);
      expect(today[0].textContent?.trim()).toBe('6');

      component.value = new CandyDate(new Date(2024, 1, 20, 19, 30));
      const rows = component.makeBodyRows();
      expect(
        rows
          .flatMap(row => row.dateCells)
          .filter(cell => cell.isSelected)
          .map(cell => cell.value)
      ).toEqual([new Date(2024, 1, 20)]);
      expect(rows.filter(row => row.isActive)).toHaveLength(1);
      fixture.componentRef.setInput('value', null);
      expect(
        component
          .makeBodyRows()
          .flatMap(row => row.dateCells)
          .some(cell => cell.isSelected)
      ).toBe(false);
      expect(rows.find(row => row.isActive)?.classMap).toMatchObject({ 'ant-picker-week-panel-row-selected': true });
    });

    it('should preserve time and inputs when clicking current and overflow days and emitting hover', () => {
      const active = new Date(2024, 1, 14, 12, 34, 56, 789); // Calendar January 31.
      component.activeDate = new CandyDate(active);
      component.value = new CandyDate(active);
      component.disabledDate = date => date.getTime() === new Date(2024, 1, 13).getTime();
      const selected: CandyDate[] = [];
      const hovered: CandyDate[] = [];
      component.valueChange.subscribe(value => selected.push(value));
      component.cellHover.subscribe(value => hovered.push(value));
      fixture.detectChanges();
      const sourceCells = component.bodyRows.flatMap(row => row.dateCells);
      const element: HTMLElement = fixture.nativeElement;
      const cells = element.querySelectorAll<HTMLElement>('tbody td');
      const disabledIndex = sourceCells.findIndex(cell => cell.isDisabled);
      cells[disabledIndex].click();
      expect(selected).toEqual([]);
      // Calendar February 1 is still in native February, but must rerender the grid.
      const overflowIndex = sourceCells.findIndex(cell => cell.value.getTime() === new Date(2024, 1, 15).getTime());
      cells[overflowIndex].dispatchEvent(new MouseEvent('mouseenter'));
      cells[overflowIndex].click();
      expect(hovered.map(value => value.nativeDate)).toEqual([new Date(2024, 1, 15)]);
      expect(selected.map(value => value.nativeDate)).toEqual([new Date(2024, 1, 15, 12, 34, 56, 789)]);
      expect(component.bodyRows[0].dateCells[0].value).toEqual(new Date(2024, 1, 10));
      fixture.detectChanges();
      const currentIndex = component.bodyRows.flatMap(row => row.dateCells).findIndex(cell => cell.content === '2');
      element.querySelectorAll<HTMLElement>('tbody td')[currentIndex].click();
      expect(selected[1].nativeDate).toEqual(new Date(2024, 1, 16, 12, 34, 56, 789));
      expect(active).toEqual(new Date(2024, 1, 14, 12, 34, 56, 789));
      expect(component.value.nativeDate).toEqual(active);
      expect(sourceCells[overflowIndex].value).toEqual(new Date(2024, 1, 15));
    });

    it('should use calendar range boundaries across a year with missing endpoints', () => {
      component.activeDate = new CandyDate(new Date(2024, 0, 15));
      const start = new CandyDate(new Date(2024, 0, 14, 18)); // Last day of calendar 2023.
      const end = new CandyDate(new Date(2024, 0, 16, 9));
      component.selectedValue = [start, end];
      component.hoverValue = [start, end];
      const cells = component.makeBodyRows().flatMap(row => row.dateCells);
      expect(cells.find(cell => cell.value.getTime() === new Date(2024, 0, 14).getTime())?.classMap).toMatchObject({
        'ant-picker-cell-range-start': true,
        'ant-picker-cell-range-hover-start': true,
        'ant-picker-cell-range-hover-edge-end': true,
        'ant-picker-cell-in-view': false
      });
      expect(cells.find(cell => cell.value.getTime() === new Date(2024, 0, 15).getTime())?.classMap).toMatchObject({
        'ant-picker-cell-in-range': true,
        'ant-picker-cell-range-hover': true,
        'ant-picker-cell-range-hover-edge-start': true,
        'ant-picker-cell-in-view': true
      });
      expect(cells.find(cell => cell.value.getTime() === new Date(2024, 0, 16).getTime())?.classMap).toMatchObject({
        'ant-picker-cell-range-end': true,
        'ant-picker-cell-range-hover-end': true
      });
      component.selectedValue = [start];
      component.hoverValue = [start];
      expect(
        component
          .makeBodyRows()
          .flatMap(row => row.dateCells)
          .some(cell => cell.isInSelectedRange || cell.isInHoverRange)
      ).toBe(false);
      component.selectedValue = [null!, end];
      component.hoverValue = [start, end];
      expect(
        component
          .makeBodyRows()
          .flatMap(row => row.dateCells)
          .some(cell => cell.isInSelectedRange)
      ).toBe(false);
      component.selectedValue = [];
      component.hoverValue = [start, end];
      expect(
        component
          .makeBodyRows()
          .flatMap(row => row.dateCells)
          .some(cell => cell.isSelectedStart || cell.isSelectedEnd || cell.isInSelectedRange)
      ).toBe(false);
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
