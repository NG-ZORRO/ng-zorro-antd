import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { NzCalendarI18nInterface } from '../../../i18n/nz-i18n.interface';
import { NzI18nService } from '../../../i18n/nz-i18n.service';
import { PanelMode } from '../../standard-types';
import { CandyDate } from '../candy-date';

@Component({
  selector: 'calendar-header',
  templateUrl: 'calendar-header.component.html'
})

export class CalendarHeaderComponent implements OnInit, OnChanges {
  @Input() locale: NzCalendarI18nInterface;
  @Input() enablePrev: boolean = true;
  @Input() enableNext: boolean = true;
  @Input() disabledMonth: (date: Date) => boolean;
  @Input() showTimePicker: boolean = false;

  @Input() value: CandyDate;
  @Output() valueChange = new EventEmitter<CandyDate>();

  @Input() panelMode: PanelMode;
  @Output() panelModeChange = new EventEmitter<PanelMode>();

  @Output() chooseDecade = new EventEmitter<CandyDate>();
  @Output() chooseYear = new EventEmitter<CandyDate>();
  @Output() chooseMonth = new EventEmitter<CandyDate>();

  prefixCls: string = 'ant-calendar';
  yearMonthDaySelectors: YearMonthDaySelector[];

  private yearToMonth: boolean = false; // Indicate whether should change to month panel when current is year panel (if referer=month, it should show month panel when choosed a year)

  constructor(private i18n: NzI18nService) { }

  ngOnInit(): void {
    if (!this.value) {
      this.value = new CandyDate(); // Show today by default
    }
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
    return this.i18n.formatDateCompatible(this.value.nativeDate, localeFormat);
  }

  private createYearMonthDaySelectors(): YearMonthDaySelector[] {
    let year: YearMonthDaySelector;
    let month: YearMonthDaySelector;
    let day: YearMonthDaySelector;

    year = {
      className: `${this.prefixCls}-year-select`,
      title: this.locale.yearSelect,
      onClick: () => this.showTimePicker ? null : this.changePanel('year'),
      label: this.formatDateTime(this.locale.yearFormat)
    };

    month = {
      className: `${this.prefixCls}-month-select`,
      title: this.locale.monthSelect,
      onClick: () => this.showTimePicker ? null : this.changeToMonthPanel(),
      label: this.locale.monthFormat ? this.formatDateTime(this.locale.monthFormat) : this.i18n.formatDate(this.value.nativeDate, 'MMM')
    };

    if (this.showTimePicker) {
      day = {
        className: `${this.prefixCls}-day-select`,
        label: this.formatDateTime(this.locale.dayFormat)
      };
    }

    let result: YearMonthDaySelector[];

    if (this.locale.monthBeforeYear) {
      result = [ month, day, year ];
    } else {
      result = [ year, month, day ];
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
