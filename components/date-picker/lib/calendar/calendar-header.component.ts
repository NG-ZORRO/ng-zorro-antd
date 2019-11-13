/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { DateHelperByDatePipe, DateHelperService, NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';

import { CandyDate } from 'ng-zorro-antd/core';
import { PanelMode } from '../../standard-types';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'calendar-header',
  exportAs: 'calendarHeader',
  templateUrl: 'calendar-header.component.html'
})
export class CalendarHeaderComponent implements OnInit, OnChanges {
  @Input() locale: NzCalendarI18nInterface;
  @Input() enablePrev: boolean = true;
  @Input() enableNext: boolean = true;
  @Input() disabledMonth: (date: Date) => boolean;
  @Input() disabledYear: (date: Date) => boolean;
  @Input() showTimePicker: boolean = false;

  @Input() value: CandyDate;
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  @Input() panelMode: PanelMode;
  @Output() readonly panelModeChange = new EventEmitter<PanelMode>();

  @Output() readonly chooseDecade = new EventEmitter<CandyDate>();
  @Output() readonly chooseYear = new EventEmitter<CandyDate>();
  @Output() readonly chooseMonth = new EventEmitter<CandyDate>();

  prefixCls: string = 'ant-calendar';
  yearMonthDaySelectors: YearMonthDaySelector[];

  private yearToMonth: boolean = false; // Indicate whether should change to month panel when current is year panel (if referer=month, it should show month panel when choosed a year)

  constructor(private dateHelper: DateHelperService) {}

  ngOnInit(): void {
    if (!this.value) {
      this.value = new CandyDate(); // Show today by default
    }
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.showTimePicker || changes.panelMode) {
      this.render();
    }
  }

  previousYear(): void {
    this.gotoYear(-1);
  }

  nextYear(): void {
    this.gotoYear(1);
  }

  previousMonth(): void {
    this.gotoMonth(-1);
  }

  nextMonth(): void {
    this.gotoMonth(1);
  }

  changePanel(mode: PanelMode, value?: CandyDate): void {
    this.panelModeChange.emit(mode);
    if (value) {
      this.changeValueFromInside(value);
    }
  }

  onChooseDecade(value: CandyDate): void {
    this.changePanel('year', value);
    this.chooseDecade.emit(value);
  }

  onChooseYear(value: CandyDate): void {
    this.changePanel(this.yearToMonth ? 'month' : 'date', value);
    this.yearToMonth = false; // Clear
    this.chooseYear.emit(value);
  }

  onChooseMonth(value: CandyDate): void {
    this.changePanel('date', value);
    this.yearToMonth = false; // Clear
    this.chooseMonth.emit(value);
  }

  changeToMonthPanel(): void {
    this.changePanel('month');
    this.yearToMonth = true;
  }

  private render(): void {
    if (this.value) {
      this.yearMonthDaySelectors = this.createYearMonthDaySelectors();
    }
  }

  private gotoMonth(amount: number): void {
    this.changeValueFromInside(this.value.addMonths(amount));
  }

  private gotoYear(amount: number): void {
    this.changeValueFromInside(this.value.addYears(amount));
  }

  private changeValueFromInside(value: CandyDate): void {
    if (this.value !== value) {
      this.value = value;
      this.valueChange.emit(this.value);
      this.render();
    }
  }

  private formatDateTime(localeFormat: string): string {
    return this.dateHelper.format(this.value.nativeDate, localeFormat);
  }

  private createYearMonthDaySelectors(): YearMonthDaySelector[] {
    let year: YearMonthDaySelector;
    let month: YearMonthDaySelector;
    let day: YearMonthDaySelector;

    // NOTE: Compat for DatePipe formatting rules
    let yearFormat: string = this.locale.yearFormat;
    if (this.dateHelper.relyOnDatePipe) {
      yearFormat = (this.dateHelper as DateHelperByDatePipe).transCompatFormat(yearFormat);
    }
    year = {
      className: `${this.prefixCls}-year-select`,
      title: this.locale.yearSelect,
      onClick: () => (this.showTimePicker ? null : this.changePanel('year')),
      label: this.formatDateTime(yearFormat)
    };

    month = {
      className: `${this.prefixCls}-month-select`,
      title: this.locale.monthSelect,
      onClick: () => (this.showTimePicker ? null : this.changeToMonthPanel()),
      label: this.formatDateTime(this.locale.monthFormat || 'MMM')
    };

    // NOTE: Compat for DatePipe formatting rules
    let dayFormat: string = this.locale.dayFormat;
    if (this.dateHelper.relyOnDatePipe) {
      dayFormat = (this.dateHelper as DateHelperByDatePipe).transCompatFormat(dayFormat);
    }
    if (this.showTimePicker) {
      day = {
        className: `${this.prefixCls}-day-select`,
        label: this.formatDateTime(dayFormat)
      };
    }

    let result: YearMonthDaySelector[];

    if (this.locale.monthBeforeYear) {
      result = [month, day!, year];
    } else {
      result = [year, month, day!];
    }

    return result.filter(selector => !!selector);
  }
}

export interface YearMonthDaySelector {
  className: string;
  title?: string;
  label: string;
  onClick?(): void;
}
