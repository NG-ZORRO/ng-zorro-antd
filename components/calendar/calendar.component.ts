/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  forwardRef,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CandyDate } from 'ng-zorro-antd/core/time';
import { LibPackerModule } from 'ng-zorro-antd/date-picker';
import { NzCalendarI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

import {
  NzDateCellDirective,
  NzDateFullCellDirective,
  NzMonthCellDirective,
  NzMonthFullCellDirective
} from './calendar-cells';
import { NzCalendarHeaderComponent } from './calendar-header.component';

export type NzCalendarMode = 'month' | 'year';
type NzCalendarDateTemplate = TemplateRef<{ $implicit: Date }>;

@Component({
  selector: 'nz-calendar',
  exportAs: 'nzCalendar',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }],
  imports: [NzCalendarHeaderComponent, LibPackerModule],
  template: `
    <nz-calendar-header
      [fullscreen]="nzFullscreen"
      [activeDate]="activeDate"
      [nzCustomHeader]="nzCustomHeader"
      [(mode)]="nzMode"
      (modeChange)="onModeChange($event)"
      (yearChange)="onYearSelect($event)"
      (monthChange)="onMonthSelect($event)"
    />

    <div class="ant-picker-panel">
      <div class="ant-picker-{{ nzMode === 'month' ? 'date' : 'month' }}-panel">
        <div class="ant-picker-body">
          @if (nzMode === 'month') {
            <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
            <date-table
              [prefixCls]="prefixCls"
              [value]="activeDate"
              [activeDate]="activeDate"
              [locale]="locale"
              [cellRender]="$any(dateCell)"
              [fullCellRender]="$any(dateFullCell)"
              [disabledDate]="nzDisabledDate"
              (valueChange)="onDateSelect($event)"
            />
          } @else {
            <month-table
              [prefixCls]="prefixCls"
              [value]="activeDate"
              [activeDate]="activeDate"
              [locale]="locale"
              [cellRender]="$any(monthCell)"
              [fullCellRender]="$any(monthFullCell)"
              (valueChange)="onDateSelect($event)"
            />
          }
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'ant-picker-calendar',
    '[class.ant-picker-calendar-full]': 'nzFullscreen',
    '[class.ant-picker-calendar-mini]': '!nzFullscreen',
    '[class.ant-picker-calendar-rtl]': `dir() === 'rtl'`
  },
  encapsulation: ViewEncapsulation.None
})
export class NzCalendarComponent implements ControlValueAccessor, OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly i18n = inject(NzI18nService);
  protected readonly dir = inject(Directionality).valueSignal;

  locale!: NzCalendarI18nInterface;
  activeDate = new CandyDate();
  prefixCls = 'ant-picker-calendar';

  private onChangeFn: (date: Date) => void = () => {};
  private onTouchFn: () => void = () => {};

  @Input() nzMode: NzCalendarMode = 'month';
  @Input() nzValue?: Date;
  @Input() nzDisabledDate?: (date: Date) => boolean;

  @Output() readonly nzModeChange = new EventEmitter<NzCalendarMode>();
  @Output() readonly nzPanelChange = new EventEmitter<{ date: Date; mode: NzCalendarMode }>();
  @Output() readonly nzSelectChange = new EventEmitter<Date>();
  @Output() readonly nzValueChange = new EventEmitter<Date>();

  /**
   * Cannot use @Input and @ContentChild on one variable
   * because { static: false } will make @Input property get delayed
   **/
  @Input() nzDateCell?: NzCalendarDateTemplate;
  @ContentChild(NzDateCellDirective, { static: false, read: TemplateRef })
  nzDateCellChild?: NzCalendarDateTemplate;
  get dateCell(): NzCalendarDateTemplate {
    return (this.nzDateCell || this.nzDateCellChild)!;
  }

  @Input() nzDateFullCell?: NzCalendarDateTemplate;
  @ContentChild(NzDateFullCellDirective, { static: false, read: TemplateRef })
  nzDateFullCellChild?: NzCalendarDateTemplate;
  get dateFullCell(): NzCalendarDateTemplate {
    return (this.nzDateFullCell || this.nzDateFullCellChild)!;
  }

  @Input() nzMonthCell?: NzCalendarDateTemplate;
  @ContentChild(NzMonthCellDirective, { static: false, read: TemplateRef })
  nzMonthCellChild?: NzCalendarDateTemplate;
  get monthCell(): NzCalendarDateTemplate {
    return (this.nzMonthCell || this.nzMonthCellChild)!;
  }

  @Input() nzMonthFullCell?: NzCalendarDateTemplate;
  @ContentChild(NzMonthFullCellDirective, { static: false, read: TemplateRef })
  nzMonthFullCellChild?: NzCalendarDateTemplate;
  get monthFullCell(): NzCalendarDateTemplate {
    return (this.nzMonthFullCell || this.nzMonthFullCellChild)!;
  }

  @Input() nzCustomHeader?: string | TemplateRef<void>;
  @Input({ transform: booleanAttribute }) nzFullscreen = true;

  constructor() {
    this.i18n.localeChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Calendar', {}).lang;
      this.cdr.markForCheck();
    });
  }

  onModeChange(mode: NzCalendarMode): void {
    this.nzModeChange.emit(mode);
    this.nzPanelChange.emit({ date: this.activeDate.nativeDate, mode });
  }

  onYearSelect(year: number): void {
    const date = this.activeDate.setYear(year);
    this.updateDate(date);
  }

  onMonthSelect(month: number): void {
    const date = this.activeDate.setMonth(month);
    this.updateDate(date);
  }

  onDateSelect(date: CandyDate): void {
    // Only activeDate is enough in calendar
    // this.value = date;
    this.updateDate(date);
  }

  writeValue(value: Date | null): void {
    this.updateDate(new CandyDate(value as Date), false);
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchFn = fn;
  }

  private updateDate(date: CandyDate, touched: boolean = true): void {
    this.activeDate = date;

    if (touched) {
      this.onChangeFn(date.nativeDate);
      this.onTouchFn();
      this.nzSelectChange.emit(date.nativeDate);
      this.nzValueChange.emit(date.nativeDate);
    }

    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzValue) {
      this.updateDate(new CandyDate(this.nzValue), false);
    }
  }
}
