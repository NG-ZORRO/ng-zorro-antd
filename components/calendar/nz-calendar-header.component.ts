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
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core';
import { DateHelperService, NzI18nService as I18n } from 'ng-zorro-antd/i18n';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-calendar-header',
  exportAs: 'nzCalendarHeader',
  templateUrl: './nz-calendar-header.component.html',
  host: {
    '[style.display]': `'block'`,
    '[class.ant-fullcalendar-header]': `true`
  }
})
export class NzCalendarHeaderComponent implements OnInit {
  @Input() mode: 'month' | 'year' = 'month';
  @Input() fullscreen: boolean = true;

  @Output() readonly modeChange: EventEmitter<'month' | 'year'> = new EventEmitter();

  @Input() activeDate: CandyDate = new CandyDate();

  @Output() readonly yearChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly monthChange: EventEmitter<number> = new EventEmitter();
  // @Output() readonly valueChange: EventEmitter<CandyDate> = new EventEmitter();

  yearOffset: number = 10;
  yearTotal: number = 20;
  years: Array<{ label: string; value: number }>;
  months: Array<{ label: string; value: number }>;

  get activeYear(): number {
    return this.activeDate.getYear();
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

  constructor(private i18n: I18n, private dateHelper: DateHelperService) {}

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
      const dateInMonth = this.activeDate.setMonth(i);
      const monthText = this.dateHelper.format(dateInMonth.nativeDate, 'MMM');
      this.months.push({ label: monthText, value: i });
    }
  }
}
