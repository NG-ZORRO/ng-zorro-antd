/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CandyDate } from 'ng-zorro-antd/core/time';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import {
  NzDateCellDirective as DateCell,
  NzDateFullCellDirective as DateFullCell,
  NzMonthCellDirective as MonthCell,
  NzMonthFullCellDirective as MonthFullCell
} from './calendar-cells';

export type NzCalendarMode = 'month' | 'year';
type NzCalendarDateTemplate = TemplateRef<{ $implicit: Date }>;

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-calendar',
  exportAs: 'nzCalendar',
  template: `
    <nz-calendar-header
      [fullscreen]="nzFullscreen"
      [activeDate]="activeDate"
      [(mode)]="nzMode"
      (modeChange)="onModeChange($event)"
      (yearChange)="onYearSelect($event)"
      (monthChange)="onMonthSelect($event)"
    >
    </nz-calendar-header>

    <div class="ant-picker-panel">
      <div class="ant-picker-{{ nzMode === 'month' ? 'date' : 'month' }}-panel">
        <div class="ant-picker-body">
          <ng-container *ngIf="nzMode === 'month'; then monthModeTable; else yearModeTable"></ng-container>
        </div>
      </div>
    </div>
    <ng-template #monthModeTable>
      <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
      <date-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(dateCell)"
        [fullCellRender]="$any(dateFullCell)"
        [disabledDate]="nzDisabledDate"
        (valueChange)="onDateSelect($event)"
      ></date-table>
    </ng-template>

    <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
    <ng-template #yearModeTable>
      <month-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(monthCell)"
        [fullCellRender]="$any(monthFullCell)"
        (valueChange)="onDateSelect($event)"
      ></month-table>
    </ng-template>
  `,
  host: {
    '[class.ant-picker-calendar]': 'true',
    '[class.ant-picker-calendar-full]': 'nzFullscreen',
    '[class.ant-picker-calendar-mini]': '!nzFullscreen'
  },
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }]
})
export class NzCalendarComponent implements ControlValueAccessor, OnChanges {
  static ngAcceptInputType_nzFullscreen: BooleanInput;

  activeDate: CandyDate = new CandyDate();
  prefixCls: string = 'ant-picker-calendar';

  private onChangeFn: (date: Date) => void = () => {};
  private onTouchFn: () => void = () => {};

  @Input() nzMode: NzCalendarMode = 'month';
  @Input() nzValue?: Date;
  @Input() nzDisabledDate?: (date: Date) => boolean;

  @Output() readonly nzModeChange: EventEmitter<NzCalendarMode> = new EventEmitter();
  @Output() readonly nzPanelChange: EventEmitter<{ date: Date; mode: NzCalendarMode }> = new EventEmitter();
  @Output() readonly nzSelectChange: EventEmitter<Date> = new EventEmitter();
  @Output() readonly nzValueChange: EventEmitter<Date> = new EventEmitter();

  /**
   * Cannot use @Input and @ContentChild on one variable
   * because { static: false } will make @Input property get delayed
   **/
  @Input() nzDateCell?: NzCalendarDateTemplate;
  @ContentChild(DateCell, { static: false, read: TemplateRef }) nzDateCellChild?: NzCalendarDateTemplate;
  get dateCell(): NzCalendarDateTemplate {
    return (this.nzDateCell || this.nzDateCellChild)!;
  }

  @Input() nzDateFullCell?: NzCalendarDateTemplate;
  @ContentChild(DateFullCell, { static: false, read: TemplateRef }) nzDateFullCellChild?: NzCalendarDateTemplate;
  get dateFullCell(): NzCalendarDateTemplate {
    return (this.nzDateFullCell || this.nzDateFullCellChild)!;
  }

  @Input() nzMonthCell?: NzCalendarDateTemplate;
  @ContentChild(MonthCell, { static: false, read: TemplateRef }) nzMonthCellChild?: NzCalendarDateTemplate;
  get monthCell(): NzCalendarDateTemplate {
    return (this.nzMonthCell || this.nzMonthCellChild)!;
  }

  @Input() nzMonthFullCell?: NzCalendarDateTemplate;
  @ContentChild(MonthFullCell, { static: false, read: TemplateRef }) nzMonthFullCellChild?: NzCalendarDateTemplate;
  get monthFullCell(): NzCalendarDateTemplate {
    return (this.nzMonthFullCell || this.nzMonthFullCellChild)!;
  }

  @Input() @InputBoolean() nzFullscreen: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

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
    this.cdr.markForCheck();
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzValue) {
      this.updateDate(new CandyDate(this.nzValue), false);
    }
  }
}
