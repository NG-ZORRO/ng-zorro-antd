/**
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
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-calendar-header',
  exportAs: 'nzCalendarHeader',
  template: `
    @if (nzCustomHeader) {
      <ng-container *nzStringTemplateOutlet="nzCustomHeader">{{ nzCustomHeader }}</ng-container>
    } @else {
      <div class="ant-picker-calendar-header">
        <nz-select
          class="ant-picker-calendar-year-select"
          [nzSize]="size"
          [nzDropdownMatchSelectWidth]="false"
          [ngModel]="activeYear"
          (ngModelChange)="updateYear($event)"
        >
          @for (year of years; track year.value) {
            <nz-option [nzLabel]="year.label" [nzValue]="year.value" />
          }
        </nz-select>

        @if (mode === 'month') {
          <nz-select
            class="ant-picker-calendar-month-select"
            [nzSize]="size"
            [nzDropdownMatchSelectWidth]="false"
            [ngModel]="activeMonth"
            (ngModelChange)="monthChange.emit($event)"
          >
            @for (month of months; track month.value) {
              <nz-option [nzLabel]="month.label" [nzValue]="month.value" />
            }
          </nz-select>
        }

        <nz-radio-group
          class="ant-picker-calendar-mode-switch"
          [(ngModel)]="mode"
          (ngModelChange)="modeChange.emit($event)"
          [nzSize]="size"
        >
          <label nz-radio-button nzValue="month">{{ monthTypeText }}</label>
          <label nz-radio-button nzValue="year">{{ yearTypeText }}</label>
        </nz-radio-group>
      </div>
    }
  `,
  host: {
    class: 'ant-fullcalendar-header',
    '[style.display]': `'block'`
  },
  imports: [NzSelectModule, FormsModule, NzRadioModule, NzStringTemplateOutletDirective]
})
export class NzCalendarHeaderComponent implements OnInit, OnChanges {
  private readonly dateHelper = inject(DateHelperService);
  private readonly i18n = inject(NzI18nService);

  @Input() mode: 'month' | 'year' = 'month';
  @Input({ transform: booleanAttribute }) fullscreen: boolean = true;
  @Input() activeDate: CandyDate = new CandyDate();
  @Input() nzCustomHeader?: string | TemplateRef<void>;

  @Output() readonly modeChange = new EventEmitter<'month' | 'year'>();
  @Output() readonly yearChange = new EventEmitter<number>();
  @Output() readonly monthChange = new EventEmitter<number>();

  yearOffset: number = 10;
  yearTotal: number = 20;
  years: Array<{ label: string; value: number }> = [];
  months: Array<{ label: string; value: number }> = [];

  get activeYear(): number {
    return this.activeDate.getYear();
  }

  get activeMonth(): number {
    return this.activeDate.getMonth();
  }

  get size(): NzSelectSizeType {
    return this.fullscreen ? 'default' : 'small';
  }

  get yearTypeText(): string {
    return this.i18n.getLocale().Calendar.lang.year;
  }

  get monthTypeText(): string {
    return this.i18n.getLocale().Calendar.lang.month;
  }

  ngOnInit(): void {
    this.setUpYears();
    this.setUpMonths();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeDate']) {
      const previousActiveDate = changes['activeDate'].previousValue as CandyDate;
      const currentActiveDate = changes['activeDate'].currentValue as CandyDate;
      if (previousActiveDate?.getYear() !== currentActiveDate?.getYear()) {
        this.setUpYears();
      }
    }
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
