import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import setMonth from 'date-fns/set_month';
import { NzI18nService as I18n } from '../i18n/nz-i18n.service';

@Component({
  selector   : 'nz-calendar-header',
  templateUrl: './nz-calendar-header.component.html',
  host       : {
    '[style.display]'                : `'block'`,
    '[class.ant-fullcalendar-header]': `true`
  }
})
export class NzCalendarHeaderComponent implements OnInit {
  @Input() mode: 'month' | 'year' = 'month';
  @Output() modeChange: EventEmitter<'month' | 'year'> = new EventEmitter();

  @Input() fullscreen: boolean = true;
  @Input() activeDate: Date = new Date();

  @Output() yearChange: EventEmitter<number> = new EventEmitter();
  @Output() monthChange: EventEmitter<number> = new EventEmitter();

  yearOffset: number = 10;
  yearTotal: number = 20;
  years: Array<{ label: string, value: number }>;
  months: Array<{ label: string, value: number }>;

  get activeYear(): number {
    return this.activeDate.getFullYear();
  }

  get activeMonth(): number {
    return this.activeDate.getMonth();
  }

  get size(): string {
    return this.fullscreen ? 'default' : 'small';
  }

  get yearTypeText(): string {
    return this.i18n.getLocale().Calendar.year;
  }

  get monthTypeText(): string {
    return this.i18n.getLocale().Calendar.month;
  }

  private prefixCls = 'ant-fullcalendar';

  constructor(private i18n: I18n) {
  }

  ngOnInit(): void {
    this.setUpYears();
    this.setUpMonths();
  }

  updateYear(year: number): void {
    this.yearChange.emit(year);
    this.setUpYears(year);
  }

  private setUpYears(year?: number): void {
    const start = (year || this.activeYear) - this.yearOffset;
    const end = start + this.yearTotal;

    this.years = [];
    for (let i = start; i < end; i++) {
      this.years.push({ label: `${i}`, value: i });
    }
  }

  private setUpMonths(): void {
    this.months = [];

    for (let i = 0; i < 12; i++) {
      const dateInMonth = setMonth(this.activeDate, i);
      const monthText = this.i18n.formatDate(dateInMonth, 'MMM');
      this.months.push({ label: monthText, value: i });
    }
  }
}
