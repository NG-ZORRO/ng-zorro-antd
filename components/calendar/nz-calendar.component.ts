/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
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
  HostBinding,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CandyDate, InputBoolean } from 'ng-zorro-antd/core';
import {
  NzDateCellDirective as DateCell,
  NzDateFullCellDirective as DateFullCell,
  NzMonthCellDirective as MonthCell,
  NzMonthFullCellDirective as MonthFullCell
} from './nz-calendar-cells';

type NzCalendarMode = 'month' | 'year';
type NzCalendarDateTemplate = TemplateRef<{ $implicit: Date }>;

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-calendar',
  exportAs: 'nzCalendar',
  templateUrl: './nz-calendar.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }]
})
export class NzCalendarComponent implements ControlValueAccessor {
  activeDate: CandyDate = new CandyDate();
  prefixCls: string = 'ant-picker-calendar';

  private onChangeFn: (date: Date) => void = () => {};
  private onTouchFn: () => void = () => {};

  @Input() nzMode: NzCalendarMode = 'month';

  @Output() readonly nzModeChange: EventEmitter<NzCalendarMode> = new EventEmitter();
  @Output() readonly nzPanelChange: EventEmitter<{ date: Date; mode: NzCalendarMode }> = new EventEmitter();
  @Output() readonly nzSelectChange: EventEmitter<Date> = new EventEmitter();

  @Input() set nzValue(value: Date) {
    this.updateDate(new CandyDate(value), false);
  }
  @Output() readonly nzValueChange: EventEmitter<Date> = new EventEmitter();

  /**
   * Cannot use @Input and @ContentChild on one variable
   * because { static: false } will make @Input property get delayed
   **/
  @Input() nzDateCell: NzCalendarDateTemplate;
  @ContentChild(DateCell, { static: false, read: TemplateRef }) nzDateCellChild: NzCalendarDateTemplate;
  get dateCell(): NzCalendarDateTemplate {
    return this.nzDateCell || this.nzDateCellChild;
  }

  @Input() nzDateFullCell: NzCalendarDateTemplate;
  @ContentChild(DateFullCell, { static: false, read: TemplateRef }) nzDateFullCellChild: NzCalendarDateTemplate;
  get dateFullCell(): NzCalendarDateTemplate {
    return this.nzDateFullCell || this.nzDateFullCellChild;
  }

  @Input() nzMonthCell: NzCalendarDateTemplate;
  @ContentChild(MonthCell, { static: false, read: TemplateRef }) nzMonthCellChild: NzCalendarDateTemplate;
  get monthCell(): NzCalendarDateTemplate {
    return this.nzMonthCell || this.nzMonthCellChild;
  }

  @Input() nzMonthFullCell: NzCalendarDateTemplate;
  @ContentChild(MonthFullCell, { static: false, read: TemplateRef }) nzMonthFullCellChild: NzCalendarDateTemplate;
  get monthFullCell(): NzCalendarDateTemplate {
    return this.nzMonthFullCell || this.nzMonthFullCellChild;
  }

  @Input()
  @InputBoolean()
  @HostBinding('class.ant-fullcalendar--fullscreen')
  nzFullscreen: boolean = true;

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
}
