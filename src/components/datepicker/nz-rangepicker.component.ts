import { ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { DayInterface, MonthInterface, RangePart } from '../calendar/nz-calendar.component';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { DEFAULT_DATEPICKER_POSITIONS } from '../core/overlay/overlay-position-map';
import { NzLocaleService } from '../locale/index';
import { NzTimePickerInnerComponent } from '../time-picker/nz-timepicker-inner.component';
import { toBoolean } from '../util/convert';

@Component({
  selector: 'nz-rangepicker',
  encapsulation: ViewEncapsulation.None,
  animations: [
    dropDownAnimation
  ],
  template: `
    <span class="ant-calendar-picker"
          (click)="_openCalendar()"
          cdkOverlayOrigin
          #origin="cdkOverlayOrigin"
          #trigger>
      <span class="ant-calendar-picker-input ant-input"
            [class.ant-input-disabled]="nzDisabled"
            [class.ant-input-sm]="nzSize === 'small'"
            [class.ant-input-lg]="nzSize === 'large'">
        <ng-container *ngTemplateOutlet="inputRangePart; context: { part: _part.Start }"></ng-container>
        <span class="ant-calendar-range-picker-separator"> ~ </span>
        <ng-container *ngTemplateOutlet="inputRangePart; context: { part: _part.End }"></ng-container>
      </span>
      <i class="ant-calendar-picker-clear anticon anticon-cross-circle"
         *ngIf="showClearIcon"
         (click)="onTouched();
         _clearValue($event)">
      </i>
      <span class="ant-calendar-picker-icon"></span>
    </span>

    <ng-template cdkConnectedOverlay
                 cdkConnectedOverlayHasBackdrop
                 [cdkConnectedOverlayPositions]="_positions"
                 [cdkConnectedOverlayOrigin]="origin"
                 (backdropClick)="_closeCalendar()"
                 (detach)="_closeCalendar()"
                 (positionChange)="onPositionChange($event)"
                 [cdkConnectedOverlayOpen]="_open">
      <div class="ant-calendar-picker-container"
           [class.top]="_dropDownPosition === 'top'"
           [class.bottom]="_dropDownPosition === 'bottom'"
           [@dropDownAnimation]="_dropDownPosition">
        <div class="ant-calendar-range-with-ranges ant-calendar ant-calendar-range"
             [class.ant-calendar-time]="nzShowTime"
             [class.ant-calendar-show-time-picker]="_mode[_part.Start] === 'time' || _mode[_part.End] === 'time'"
             tabindex="0">
          <div class="ant-calendar-panel">
            <div class="ant-calendar-date-panel">
              <ng-container *ngTemplateOutlet="calendarRangePart; context: { part: _part.Start }"></ng-container>
              <span class="ant-calendar-range-middle">~</span>
              <ng-container *ngTemplateOutlet="calendarRangePart; context: { part: _part.End }"></ng-container>
            </div>
            <div class="ant-calendar-footer ant-calendar-range-bottom ant-calendar-footer-show-ok">
                <span class="ant-calendar-footer-btn">
                  <a class="ant-calendar-time-picker-btn"
                     [class.ant-calendar-time-picker-btn-disabled]="!_isComplete()"
                     (click)="_changeTimeView($event)"
                     *ngIf="_mode[_part.Start] !== 'time' && nzShowTime">
                    {{ 'DateTime.chooseTime' | nzTranslate }}
                  </a>
                  <a class="ant-calendar-time-picker-btn"
                     (click)="_changeYearView($event)"
                     *ngIf="_mode[_part.Start] === 'time' && nzShowTime">
                    {{ 'DateTime.chooseDate' | nzTranslate }}
                  </a>
                  <a class="ant-calendar-ok-btn"
                     [class.ant-calendar-ok-btn-disabled]="!_isComplete()"
                     *ngIf="nzShowTime" (click)="_closeCalendar()">
                    {{ 'DateTime.ok' | nzTranslate }}
                  </a>
                </span>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
    <!-- input template -->
    <ng-template #inputRangePart let-part="part">
      <input class="ant-calendar-range-picker-input" nz-input [nzDisabled]="nzDisabled"
             [value]="nzValue[part] | nzDate: nzFormat"
             [placeholder]="nzPlaceholder[part]">
    </ng-template>
    <!-- calendar template -->
    <ng-template #calendarRangePart let-part="part">
      <div class="ant-calendar-range-part"
           [class.ant-calendar-range-left]="part === _part.Start"
           [class.ant-calendar-range-right]="part === _part.End">
        <div class="ant-calendar-input-wrap">
          <div class="ant-calendar-date-input-wrap">
            <input class="ant-calendar-input"
                   [placeholder]="nzPlaceholder[part]"
                   [value]="nzValue[part] | nzDate: nzFormat"
                   #dateBox
                   (blur)="_blurInput(dateBox, part)">
          </div>
        </div>
        <div class="ant-calendar-header">
          <div style="position: relative;" *ngIf="_mode[part] !== 'time'">
            <a class="ant-calendar-prev-year-btn"
               *ngIf="part !== _part.End || _showBtn(part)"
               title="{{ 'DateTime.prevYear' | nzTranslate }}"
               (click)="_preYear(part)"></a>
            <a class="ant-calendar-prev-month-btn"
               *ngIf="_mode[part] !== 'month' && (part !== _part.End ||_showBtn(part))"
               title="{{ 'DateTime.prevMonth' | nzTranslate }}"
               (click)="_preMonth(part)"></a>
            <span class="ant-calendar-ym-select">
                        <a class="ant-calendar-month-select"
                           title="{{ 'DateTime.chooseMonth' | nzTranslate }}"
                           *ngIf="_mode[part] !== 'month'"
                           (click)="_mode[part] = 'month'; _bindDisabledDateToPart()">
                          {{ 'DateTime.nMonth' | nzTranslate: {num: _showMonth[part] + 1} }}
                        </a>
                        <a class="ant-calendar-year-select"
                           (click)="_mode[part] = 'decade'"
                           title="{{ 'DateTime.chooseYear' | nzTranslate }}">
                          {{ 'DateTime.nYear' | nzTranslate: {num: _showYear[part]} }}</a>
                      </span>
            <a class="ant-calendar-next-month-btn"
               *ngIf="_mode[part] !== 'month' && (part !== _part.Start || _showBtn(part))"
               title="{{ 'DateTime.nextMonth' | nzTranslate }}"
               (click)="_nextMonth(part)"></a>
            <a class="ant-calendar-next-year-btn"
               *ngIf="part !== _part.Start || _showBtn(part)"
               title="{{ 'DateTime.nextYear' | nzTranslate }}"
               (click)="_nextYear(part)"></a>
          </div>
          <div style="position: relative;" *ngIf="_mode[part] === 'time'">
              <span class="ant-calendar-my-select">
                <a class="ant-calendar-year-select"
                   title="Choose a month">{{ 'DateTime.nYear' | nzTranslate: {num: _selectedYear[part]} }}</a>
                <a class="ant-calendar-month-select"
                   title="Choose a month">{{ 'DateTime.nMonth' | nzTranslate: {num: _showMonth[part] + 1} }}</a>
                <a class="ant-calendar-day-select">{{ 'DateTime.nDay' | nzTranslate: {num: _selectedDate[part]} }}</a>
              </span>
          </div>
        </div>
        <div class="ant-calendar-year-panel" *ngIf="_mode[part] === 'decade'">
          <div>
            <div class="ant-calendar-year-panel-header">
              <a class="ant-calendar-year-panel-prev-decade-btn" title="{{ 'DateTime.prevDecade' | nzTranslate }}"
                 (click)="_preDecade(part)"></a>
              <a class="ant-calendar-year-panel-decade-select" title="{{ 'DateTime.chooseDecade' | nzTranslate }}">
                <span class="ant-calendar-year-panel-decade-select-content">
                  {{ _startDecade[part] }}-{{ _startDecade[part] + 9 }}</span>
                <span class="ant-calendar-year-panel-decade-select-arrow">x</span>
              </a>
              <a class="ant-calendar-year-panel-next-decade-btn" title="{{ 'DateTime.nextDecade' | nzTranslate }}"
                 (click)="_nextDecade(part)"></a>
            </div>
            <div class="ant-calendar-year-panel-body">
              <table class="ant-calendar-year-panel-table" cellspacing="0" role="grid">
                <tbody class="ant-calendar-year-panel-tbody">
                <tr *ngFor="let tr of _yearPanel">
                  <ng-template ngFor let-td [ngForOf]="tr">
                    <td class="ant-calendar-year-panel-cell ant-calendar-year-panel-last-decade-cell"
                        *ngIf="td === 'start'">
                      <a class="ant-calendar-year-panel-year" (click)="_preDecade()">{{ _startDecade[part] - 1 }}</a>
                    </td>
                    <td *ngIf="(td !== 'start') && (td !== 'end')" [attr.title]="_startDecade[part] + td"
                        class="ant-calendar-year-panel-cell"
                        [ngClass]="{'ant-calendar-year-panel-selected-cell':(_startDecade[part] + td === _showYear[part])}">
                      <a class="ant-calendar-year-panel-year"
                         (click)="_setShowYear(_startDecade[part] + td, part, $event)">{{ _startDecade[part] + td }}</a>
                    </td>
                    <td class="ant-calendar-year-panel-cell ant-calendar-year-panel-next-decade-cell"
                        *ngIf="td === 'end'">
                      <a class="ant-calendar-year-panel-year" (click)="_nextDecade()">{{ _startDecade[part] + 10 }}</a>
                    </td>
                  </ng-template>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="ant-calendar-body">
          <nz-calendar
            (nzClickMonth)="_clickMonth($event, part)"
            (nzClickDay)="_clickDay($event, part)"
            [nzClearTime]="!nzShowTime"
            (nzHoverDay)="_hoverDay($event)"
            [nzHoveringSelectValue]="hoveringSelectValue"
            [nzRangeValue]="nzValue"
            [nzShowMonth]="_showMonth[part]"
            [nzShowYear]="_showYear[part]"
            [nzMode]="_mode[part] === 'decade' ? 'year' : _mode[part]"
            [nzDisabledDate]="_disabledDatePart[part]"
            [nzFullScreen]="false"
            [nzShowHeader]="false"
            [nzIsRange]="true"
            [nzDatePicker]="true">
          </nz-calendar>
        </div>
        <div class="ant-calendar-time-picker-body" *ngIf="nzShowTime && _mode[part] === 'time'">
          <nz-timepicker-inner
            [nzPlaceHolder]="nzShowTime && nzShowTime.nzPlaceHolder || ('DateTime.chooseTimePlease' | nzTranslate)"
            [nzFormat]="nzShowTime && nzShowTime.nzFormat||'HH:mm:ss'"
            [nzDisabled]="nzShowTime && nzShowTime.nzDisabled||false"
            [nzDisabledHours]="nzShowTime && nzShowTime.nzDisabledHours||null"
            [nzDisabledMinutes]="nzShowTime && nzShowTime.nzDisabledMinutes||null"
            [nzDisabledSeconds]="nzShowTime && nzShowTime.nzDisabledSeconds||null"
            [nzHideDisabledOptions]="nzShowTime && nzShowTime.nzHideDisabledOptions||false"
            [ngModel]="nzValue[part]" (ngModelChange)="_changeTime($event, part)"></nz-timepicker-inner>
        </div>
      </div>
    </ng-template>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRangePickerComponent),
      multi: true
    }
  ],
  styleUrls: [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzRangePickerComponent implements ControlValueAccessor, OnInit {
  private _disabled = false;
  private _showTime: Partial<NzTimePickerInnerComponent> = null;
  private _now = moment();
  private _el;
  private _oldValue: Date[]  = this._defaultRangeValue;
  private _value: Date[] = this._defaultRangeValue;

  // avoid reference types
  private get _defaultRangeValue(): Date[] {
    return [null, null];
  }

  private get start(): moment.Moment {
    return moment(this._value[RangePart.Start]);
  }

  private get end(): moment.Moment {
    return moment(this._value[RangePart.End]);
  }

  _part = RangePart; // provided to template
  hoveringSelectValue: Date;
  _open;
  _disabledDate: (value: Date) => boolean;
  _disabledDatePart: Array<(value: Date) => boolean> = [null, null];
  _mode = ['year', 'year'];
  _selectedMonth: number[] = [];
  _selectedYear: number[] = [];
  _selectedDate: number[] = [];
  _showMonth = [this._now.month(), this._now.clone().add(1, 'month').month()];
  _showYear = [this._now.year(), this._now.year()];
  _yearPanel: string[][] = [];
  _startDecade = new Array(2).fill(Math.floor(this._showYear[RangePart.Start] / 10) * 10);
  _triggerWidth = 0;
  _dropDownPosition = 'bottom';
  _positions: ConnectionPositionPair[] = [...DEFAULT_DATEPICKER_POSITIONS];
  @ViewChild('trigger') trigger;
  onTouched: () => void = () => null;
  onChange: (value: Date[]) => void = () => null;
  @Input() nzSize = '';
  @Input() nzFormat = 'YYYY-MM-DD';
  @Input() nzAllowClear = true;
  @Input() nzPlaceholder: string[] = [this._locale.translate('DateTime.chooseStartDatePlease'), this._locale.translate('DateTime.chooseEndDatePlease')];
  @ViewChildren(NzTimePickerInnerComponent) timePickerInner: QueryList<NzTimePickerInnerComponent>;

  get showClearIcon(): boolean {
    return this._isComplete() && !this.nzDisabled && this.nzAllowClear;
  }

  @Input()
  set nzShowTime(value: Partial<NzTimePickerInnerComponent>) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      this._showTime = toBoolean(value) ? {} : null;
    } else {
      this._showTime = value;
    }
  }

  get nzShowTime(): Partial<NzTimePickerInnerComponent> {
    return this._showTime;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this._closeCalendar();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  get nzValue(): Date[] {
    return this._value || this._defaultRangeValue;
  }

  set nzValue(value: Date[]) {
    this._updateValue(value);
  }

  @Input()
  set nzDisabledDate(value: (value: Date) => boolean) {
    this._disabledDate = value;
    this._bindDisabledDateToPart();
  }

  get nzDisabledDate(): (value: Date) => boolean {
    return this._disabledDate;
  }

  constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef, private _locale: NzLocaleService) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this._generateYearPanel();
  }

  _bindDisabledDateToPart(): void {
    // when the mode is month, not needed disable it
    this._disabledDatePart[RangePart.Start] = this._mode[RangePart.Start] === 'month' ? null : this._disabledDate;
    this._disabledDatePart[RangePart.End] = this._mode[RangePart.End] === 'month' ? null : this._disabledDate;
  }

  _generateYearPanel(): void {
    let _t = [];
    for (let i = 0; i < 10; i++) {
      if (i === 1 || i === 4 || i === 7 || i === 9) {
        _t.push(i);
        this._yearPanel.push(_t);
        _t = [];
      } else {
        _t.push(i);
      }
    }
    this._yearPanel[0].unshift('start');
    this._yearPanel[3].push('end');
  }

  _openCalendar(): void {
    if (this.nzDisabled) {
      return;
    }
    this._mode = ['year', 'year'];
    this._open = true;
    this._setTriggerWidth();
    this._initShow();
  }

  _closeCalendar(): void {
    if (!this._open) {
      return;
    }
    if (this._isComplete()) {
        this._onChange();
    } else {
      this._value = [...this._oldValue];
    }
    this._open = false;
  }

  _clearValue(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.nzValue = this._defaultRangeValue;
    this.onChange(this._value);
  }

  _setTriggerWidth(): void {
    this._triggerWidth = this.trigger.nativeElement.getBoundingClientRect().width;
  }

  _setShowYear(year: number, part: RangePart, $event: MouseEvent): void {
    $event.stopPropagation();
    this._showYear[part] = year;
    this._mode[part] = 'month';
  }

  _isValid(part: RangePart): boolean {
    return moment(this._value[part]).isValid();
  }

  _isComplete(): boolean {
    return this.start.isValid() && this.end.isValid();
  }

  _changeTime($event: Date, part: RangePart): void {
    this._value[part] = $event;
  }

  _blurInput(box: HTMLInputElement, part: RangePart): void {
    if (Date.parse(box.value)) {
      this._value[part] = new Date(box.value);
      this._onChange();
    }
  }

  _hoverDay(day: DayInterface): void {
    if (!this._isComplete() && this._value.some(e => moment(e).isValid())) {
      this.hoveringSelectValue = day.date.toDate();
    } else {
      this.hoveringSelectValue = null;
    }
  }

  _clickDay(day: DayInterface, part: RangePart): void {
    const newDate = day.date.toDate();
    // if have completed, then reset
    if (this._isComplete()) {
      this._value = this._defaultRangeValue;
      this._value[part] = newDate;
      this.rangeValueSort();
      return;
    }
    if (moment(this._value[part]).isValid()) {
      if (part === RangePart.Start) {
        this._value[RangePart.End] = newDate;
      } else {
        this._value[RangePart.Start] = newDate;
      }
    } else {
      this._value[part] = newDate;
    }
    // the result depends the before step
    if (this._isComplete()) {
      this.rangeValueSort();
      if (!this.nzShowTime) {
        this._closeCalendar();
        return;
      }
      this._initShow();
    }
    this.rangeValueSort();
  }

  _clickMonth(month: MonthInterface, part: RangePart): void {
    this._showMonth[part] = month.index;
    this._mode[part] = 'year';
    this._bindDisabledDateToPart();
    this.adjustShowMonth();
  }

  _changeTimeView($event: MouseEvent): void {
    $event.stopPropagation();
    this._mode = ['time', 'time'];
    this.setSelectedValue();
    setTimeout(_ => {
      this.timePickerInner.forEach(e => e._initPosition());
    });
  }

  _changeYearView($event: MouseEvent): void {
    $event.stopPropagation();
    this._mode = ['year', 'year'];
  }

  _showBtn(part: RangePart): boolean {
    if (this._mode[part] === 'month') {
      return true;
    }
    const showStart = moment().month(this._showMonth[RangePart.Start]).year(this._showYear[RangePart.Start]);
    const showEnd = moment().month(this._showMonth[RangePart.End]).year(this._showYear[RangePart.End]);
    return !showStart.add(1, 'month').isSame(showEnd, 'month');
  }

  _preYear(part: RangePart): void {
    this._showYear[part] = this._showYear[part] - 1;
    this.adjustShowMonth();
  }

  _nextYear(part: RangePart): void {
    this._showYear[part] = this._showYear[part] + 1;
    this.adjustShowMonth();
  }

  _preMonth(part: RangePart): void {
    if (this._showMonth[part] - 1 < 0) {
      this._showMonth[part] = 11;
      this._preYear(part);
    } else {
      this._showMonth[part] = this._showMonth[part] - 1;
    }
  }

  _nextMonth(part: RangePart): void {
    if (this._showMonth[part] + 1 > 11) {
      this._showMonth[part] = 0;
      this._nextYear(part);
    } else {
      this._showMonth[part] = this._showMonth[part] + 1;
    }
  }

  _preDecade(part: RangePart): void {
    this._startDecade[part] = this._startDecade[part] - 10;
  }

  _nextDecade(part: RangePart): void {
    this._startDecade[part] = this._startDecade[part] + 10;
  }

  rangeValueSort(): void {
    if (this.start.isValid() && this.end.isValid() && this.start.isAfter(this.end)) {
      this._value = this._value.reverse();
    } else {
      this._value = this._value.concat();
    }
  }

  _initShow(): void {
    if (this.start.isValid()) {
      this._showMonth[RangePart.Start] = this.start.month();
      this._showYear[RangePart.Start] = this.start.year();
    } else {
      this._showMonth[RangePart.Start] = this._now.month();
      this._showYear[RangePart.Start] = this._now.year();
    }
    if (this.end.isValid() && !this.start.isSameOrAfter(this.end, 'month')) {
      this._showMonth[RangePart.End] = this.end.month();
      this._showYear[RangePart.End] = this.end.year();
    } else {
      const nextMonthOfStart = this.start.clone().add(1, 'month');
      const nextMonthOfNow = this._now.clone().add(1, 'month');
      this._showMonth[RangePart.End] = this.start.isValid() ? nextMonthOfStart.month() : nextMonthOfNow.month();
      this._showYear[RangePart.End] = this.start.isValid() ? nextMonthOfStart.year() : nextMonthOfNow.year();
    }
    this._showMonth = this._showMonth.concat();
    this._showYear = this._showYear.concat();
  }

  adjustShowMonth(): void {
    if (this._showYear[RangePart.Start] === this._showYear[RangePart.End] && this._showMonth[RangePart.Start] === this._showMonth[RangePart.End]) {
      this._nextMonth(RangePart.End);
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const _position = position.connectionPair.originY === 'bottom' ? 'top' : 'bottom';
    if (this._dropDownPosition !== _position) {
      this._dropDownPosition = _position;
      this._cdr.detectChanges();
    }
  }

  setSelectedValue(): void {
    this._selectedYear = [this.start.year(), this.end.year()];
    this._selectedMonth = [this.start.month(), this.end.month()];
    this._selectedDate = [this.start.date(), this.end.date()];
  }

  isValueChange(): boolean {
    return this._value.some((value: Date, index: number) => {
      return this._oldValue[index] === null
        || (moment.isDate(this._oldValue[index])
          && moment.isDate(value)
          && this._oldValue[index].getTime() !== value.getTime());
    });
  }

  writeValue(value: Date[]): void {
    this._updateValue(value);
  }

  registerOnChange(fn: (_: Date[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  private _updateValue(value: Date[]): void {
    if (Array.isArray(value) && value.length === 2) {
      this._value = [value[RangePart.Start], value[RangePart.End]];
    } else {
      this._value = this._defaultRangeValue;
    }
    this._oldValue = [...this._value];
  }

  private _onChange(): void {
    if (this._isValid(RangePart.Start) && this._isValid(RangePart.End) && this.isValueChange()) {
      this.onChange(this._value);
      this._oldValue = [...this._value];
    }
  }
}
