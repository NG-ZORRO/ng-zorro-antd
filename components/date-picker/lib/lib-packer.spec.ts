/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vi } from 'vitest';

import { CandyDate } from 'ng-zorro-antd/core/time';
import { en_US, NzI18nModule } from 'ng-zorro-antd/i18n';

import { DateHeaderComponent } from './date-header.component';
import { DateTableComponent } from './date-table.component';
import { LibPackerModule } from './lib-packer.module';

// TODO: Add unit test of date-table and month-table
describe('Coverage supplements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibPackerModule, NzI18nModule]
    });
  });

  describe('DateTable', () => {
    let componentInstance: DateTableComponent;

    beforeEach(() => {
      componentInstance = TestBed.createComponent(DateTableComponent).componentInstance;
    });

    it('should cover untouched branches', () => {
      componentInstance.value = new CandyDate('2018-11-11');
      componentInstance.showWeek = true;
      const weekRows = componentInstance.makeBodyRows();
      expect(weekRows.length > 0).toBeTruthy();
    });
  });

  // Tests for issue #9650
  describe('DateHeader', () => {
    let fixture: ComponentFixture<DateHeaderComponent>;
    let componentInstance: DateHeaderComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(DateHeaderComponent);
      componentInstance = fixture.componentInstance;
      componentInstance.value = new CandyDate('2020-02-25');
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
      const newValue = new CandyDate('2020-03-15');
      componentInstance.changeValue(newValue);
      expect(componentInstance.mode).toBe(initialMode);
      expect(componentInstance.mode).toBe('week');
    });

    it('should emit panelChange with correct mode when value changes', () => {
      fixture.componentRef.setInput('mode', 'week');
      fixture.detectChanges();
      vi.spyOn(componentInstance.panelChange, 'emit').mockImplementation(() => {});
      const newValue = new CandyDate('2020-03-15');
      componentInstance.changeValue(newValue);
      expect(componentInstance.panelChange.emit).toHaveBeenCalledWith({
        mode: 'week',
        date: newValue.nativeDate
      });
    });
  });
});
