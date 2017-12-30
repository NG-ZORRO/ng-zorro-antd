import { ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { DayInterface, MonthInterface } from '../calendar/nz-calendar.component';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { DEFAULT_DATEPICKER_POSITIONS } from '../core/overlay/overlay-position-map';
import { NzLocaleService } from '../locale/index';
import { NzTimePickerInnerComponent } from '../time-picker/nz-timepicker-inner.component';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-datepicker',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    dropDownAnimation
  ],
  template     : `
    <span style="display: block"
      (click)="_openCalendar()"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      #trigger>
    <input
      nz-input
      (blur)="onTouched()"
      [attr.placeholder]="nzPlaceHolder"
      [nzDisabled]="nzDisabled"
      [nzSize]="nzSize"
      class="ant-calendar-picker-input"
      [value]="_value|nzDate:nzFormat">
    <i class="ant-calendar-picker-clear anticon anticon-cross-circle"
      *ngIf="_showClearIcon"
      (click)="onTouched();_clearValue($event)">
    </i>
    <span class="ant-calendar-picker-icon"></span>
  </span>
    <ng-template
      cdkConnectedOverlay
      cdkConnectedOverlayHasBackdrop
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOrigin]="origin"
      (backdropClick)="_closeCalendar()"
      (detach)="_closeCalendar()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayOpen]="_open"
    >
      <div class="ant-calendar-picker-container"
        [class.top]="_dropDownPosition==='top'"
        [class.bottom]="_dropDownPosition==='bottom'"
        [@dropDownAnimation]="_dropDownPosition">
        <div class="ant-calendar" tabindex="0" [class.ant-calendar-time]="nzShowTime">
          <div class="ant-calendar-input-wrap">
            <div class="ant-calendar-date-input-wrap">
              <input class="ant-calendar-input"
                [attr.placeholder]="nzPlaceHolder"
                [value]="_value|nzDate:nzFormat"
                #dateBox
                (blur)="_blurInput(dateBox)">
            </div>
            <a class="ant-calendar-clear-btn" title="{{ 'DateTime.clear' | nzTranslate }}"></a>
          </div>
          <div class="ant-calendar-date-panel">
            <div class="ant-calendar-header">
              <div style="position: relative;" *ngIf="_mode!='time'">
                <a class="ant-calendar-prev-year-btn" title="{{ 'DateTime.prevYear' | nzTranslate }}" (click)="_preYear()"></a>
                <a class="ant-calendar-prev-month-btn" title="{{ 'DateTime.prevMonth' | nzTranslate }}" (click)="_preMonth()"></a>
                <span class="ant-calendar-ym-select">
              <a class="ant-calendar-month-select" title="{{ 'DateTime.chooseMonth' | nzTranslate }}" (click)="_changeMonthView()">{{ 'DateTime.nMonth' | nzTranslate: {num: _showMonth + 1} }}</a>
              <a class="ant-calendar-year-select" title="{{ 'DateTime.chooseYear' | nzTranslate }}" (click)="_changeDecadeView($event)">{{ 'DateTime.nYear' | nzTranslate: {num: _showYear} }}</a>
              </span>
                <a class="ant-calendar-next-month-btn" title="{{ 'DateTime.nextMonth' | nzTranslate }}" (click)="_nextMonth()"></a>
                <a class="ant-calendar-next-year-btn" title="{{ 'DateTime.nextYear' | nzTranslate }}" (click)="_nextYear()"></a>
              </div>
              <div style="position: relative;" *ngIf="_mode=='time'">
              <span class="ant-calendar-my-select">
                <a class="ant-calendar-year-select" title="Choose a month">{{ 'DateTime.nYear' | nzTranslate: {num: _selectedYear} }}</a>
                <a class="ant-calendar-month-select" title="Choose a month">{{ 'DateTime.nMonth' | nzTranslate: {num: _showMonth + 1} }}</a>
                <a class="ant-calendar-day-select">{{ 'DateTime.nDay' | nzTranslate: {num: _selectedDate} }}</a>
              </span>
              </div>
              <div class="ant-calendar-month-panel" *ngIf="_mode=='month'">
                <div>
                  <div class="ant-calendar-month-panel-header">
                    <a class="ant-calendar-month-panel-prev-year-btn" title="{{ 'DateTime.prevYear' | nzTranslate }}" (click)="_preYear()"></a>
                    <a class="ant-calendar-month-panel-year-select" title="{{ 'DateTime.chooseYear' | nzTranslate }}" (click)="_changeDecadeView($event)">
                      <span class="ant-calendar-month-panel-year-select-content">{{ _showYear }}</span>
                      <span class="ant-calendar-month-panel-year-select-arrow">x</span>
                    </a>
                    <a class="ant-calendar-month-panel-next-year-btn" title="{{ 'DateTime.nextYear' | nzTranslate }}" (click)="_nextYear()"></a>
                  </div>
                  <div class="ant-calendar-month-panel-body">
                    <nz-calendar
                      [nzClearTime]="!nzShowTime"
                      [nzDisabledDate]="nzDisabledDate"
                      (nzClickDay)="_clickDay($event)"
                      [nzShowMonth]="_showMonth"
                      [nzShowYear]="_showYear"
                      [nzValue]="_value"
                      (nzClickMonth)="_clickMonth($event)"
                      [nzMode]="'month'"
                      [nzFullScreen]="false"
                      [nzShowHeader]="false"
                      nzDatePicker>
                    </nz-calendar>
                  </div>
                </div>
              </div>
              <div class="ant-calendar-year-panel" *ngIf="_mode=='decade'">
                <div>
                  <div class="ant-calendar-year-panel-header">
                    <a class="ant-calendar-year-panel-prev-decade-btn" title="{{ 'DateTime.prevDecade' | nzTranslate }}" (click)="_preDecade()"></a>
                    <a class="ant-calendar-year-panel-decade-select" title="{{ 'DateTime.chooseDecade' | nzTranslate }}">
                      <span class="ant-calendar-year-panel-decade-select-content">{{ _startDecade }}-{{ _startDecade + 9 }}</span>
                      <span class="ant-calendar-year-panel-decade-select-arrow">x</span>
                    </a>
                    <a class="ant-calendar-year-panel-next-decade-btn" title="{{ 'DateTime.nextDecade' | nzTranslate }}" (click)="_nextDecade()"></a>
                  </div>
                  <div class="ant-calendar-year-panel-body">
                    <table class="ant-calendar-year-panel-table" cellspacing="0" role="grid">
                      <tbody class="ant-calendar-year-panel-tbody">
                        <tr *ngFor="let tr of _yearPanel">
                          <ng-template ngFor let-td [ngForOf]="tr">
                            <td class="ant-calendar-year-panel-cell ant-calendar-year-panel-last-decade-cell" *ngIf="td=='start'">
                              <a class="ant-calendar-year-panel-year" (click)="_preDecade()">{{ _startDecade - 1 }}</a>
                            </td>
                            <td *ngIf="(td!='start')&&(td!='end')" [attr.title]="_startDecade+td" class="ant-calendar-year-panel-cell" [ngClass]="{'ant-calendar-year-panel-selected-cell':(_startDecade+td==_showYear)}">
                              <a class="ant-calendar-year-panel-year" (click)="_setShowYear(_startDecade+td,$event)">{{ _startDecade + td }}</a>
                            </td>
                            <td class="ant-calendar-year-panel-cell ant-calendar-year-panel-next-decade-cell" *ngIf="td=='end'">
                              <a class="ant-calendar-year-panel-year" (click)="_nextDecade()">{{ _startDecade + 10 }}</a>
                            </td>
                          </ng-template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <nz-timepicker-inner
              [nzPlaceHolder]="nzShowTime && nzShowTime.nzPlaceHolder || ('DateTime.chooseTimePlease' | nzTranslate)"
              [nzFormat]="nzShowTime&&nzShowTime.nzFormat||'HH:mm:ss'"
              [nzDisabled]="nzShowTime&&nzShowTime.nzDisabled||false"
              [nzDisabledHours]="nzShowTime&&nzShowTime.nzDisabledHours||null"
              [nzDisabledMinutes]="nzShowTime&&nzShowTime.nzDisabledMinutes||null"
              [nzDisabledSeconds]="nzShowTime&&nzShowTime.nzDisabledSeconds||null"
              [nzHideDisabledOptions]="nzShowTime&&nzShowTime.nzHideDisabledOptions||false"
              [ngModel]="_value" (ngModelChange)="_changeTime($event)"
              *ngIf="nzShowTime&&(_mode == 'time')"></nz-timepicker-inner>
            <div class="ant-calendar-calendar-body">
              <nz-calendar [nzClearTime]="!nzShowTime" [nzDisabledDate]="nzDisabledDate" (nzClickDay)="_clickDay($event)" [nzShowMonth]="_showMonth" [nzShowYear]="_showYear" [nzValue]="_value" (nzClickMonth)="_clickMonth($event)" [nzMode]="'year'" [nzFullScreen]="false" [nzShowHeader]="false" nzDatePicker></nz-calendar>
            </div>
            <div class="ant-calendar-footer ant-calendar-footer-show-ok">
              <span class="ant-calendar-footer-btn">
                <a class="ant-calendar-today-btn" [class.ant-calendar-today-btn-disabled]="_disabledToday" [attr.title]="_today|nzDate:nzFormat" (click)="_changeToToday()">{{ (nzShowTime ? 'DateTime.thisMoment' : 'DateTime.today') | nzTranslate }}</a>
                <a class="ant-calendar-time-picker-btn" (click)="_changeTimeView($event)" *ngIf="(_mode != 'time')&&nzShowTime">{{ 'DateTime.chooseTime' | nzTranslate }}</a>
                <a class="ant-calendar-time-picker-btn" (click)="_changeYearView($event)" *ngIf="(_mode == 'time')&&nzShowTime">{{ 'DateTime.chooseDate' | nzTranslate }}</a>
                <a class="ant-calendar-ok-btn" *ngIf="nzShowTime" (click)="_closeCalendar()">{{ 'DateTime.ok' | nzTranslate }}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </ng-template>`,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzDatePickerComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ],
  host         : {
    '[class.ant-calendar-picker]': 'true'
  }
})
export class NzDatePickerComponent implements ControlValueAccessor, OnInit {
  private _allowClear = true;
  private _disabled = false;
  private _showTime: Partial<NzTimePickerInnerComponent> = null;
  _el: HTMLElement;
  _open = false;
  _mode = 'year';
  _dropDownPosition = 'bottom';
  _value: Date = null;
  _disabledDate;
  _today = new Date();
  _selectedMonth = moment(this.nzValue).month();
  _selectedYear = moment(this.nzValue).year();
  _selectedDate = moment(this.nzValue).date();
  _showMonth = moment(new Date()).month();
  _showYear = moment(new Date()).year();
  _startDecade = Math.floor(this._showYear / 10) * 10;
  _yearPanel: string[][] = [];
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_DATEPICKER_POSITIONS ];
  _allowClear = true;
  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  @Input() nzShowTime: any = null;
  @Input() nzPlaceHolder = this._locale.translate('DateTime.chooseDatePlease');
  @Input() nzFormat = 'YYYY-MM-DD';
  @Input() nzSize = '';
  @Input() nzMode: 'day' | 'month' = 'day';
  @ViewChild('trigger') trigger;
  @ViewChild(NzTimePickerInnerComponent) timePickerInner: NzTimePickerInnerComponent;

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
  set nzAllowClear(value: boolean) {
    this._allowClear = toBoolean(value);
  }

  get nzAllowClear(): boolean {
    return this._allowClear;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this._closeCalendar();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzDisabledDate(value: () => boolean) {
    this._disabledDate = value;
  }

  get nzDisabledDate(): () => boolean {
    if (this._mode === 'month' && this.nzMode === 'day') {
      return;
    }
    return this._disabledDate;
  }

  get _disabledToday(): boolean {
    if (this._disabledDate) {
      return this._disabledDate(new Date());
    } else {
      return false;
    }
  }
  
  @Input()
  set nzAllowClear(value: boolean | string) {
    if (value === '') {
      this._allowClear = true;
    } else {
      this._allowClear = value as boolean;
    }
  }

  get nzAllowClear() {
    return this._allowClear;
  }


  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const _position = position.connectionPair.originY === 'bottom' ? 'top' : 'bottom';
    if (this._dropDownPosition !== _position) {
      this._dropDownPosition = _position;
      this._cdr.detectChanges();
    }
  }

  get nzValue(): Date {
    return this._value || new Date();
  }

  set nzValue(value: Date) {
    this._updateValue(value);
  }

  _changeTime($event: Date): void {
    this._value = $event;
  }

  _blurInput(box: HTMLInputElement): void {
    if (Date.parse(box.value)) {
      this.nzValue = new Date(box.value);
      this.onChange(this._value);
    }
  }

  _preYear(): void {
    this._showYear = this._showYear - 1;
  }

  _nextYear(): void {
    this._showYear = this._showYear + 1;
  }

  _preMonth(): void {
    if (this._showMonth - 1 < 0) {
      this._showMonth = 11;
      this._preYear();
    } else {
      this._showMonth = this._showMonth - 1;
    }
  }

  _nextMonth(): void {
    if (this._showMonth + 1 > 11) {
      this._showMonth = 0;
      this._nextYear();
    } else {
      this._showMonth = this._showMonth + 1;
    }
  }

  _setShowYear(year: number, $event: MouseEvent): void {
    $event.stopPropagation();
    this._showYear = year;
    this._mode = this.nzMode === 'day' ? 'year' : 'month';
  }

  _preDecade(): void {
    this._startDecade = this._startDecade - 10;
  }

  _nextDecade(): void {
    this._startDecade = this._startDecade + 10;
  }

  _clearValue(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.nzValue = null;
    this.onChange(this._value);
  }

  _changeToToday(): void {
    if (!this._disabledToday) {
      this.nzValue = new Date();
      this.onChange(this._value);
      this._closeCalendar();
    }
  }

  _clickDay(day: DayInterface): void {
    if (!this.nzShowTime) {
      this._closeCalendar();
      this.nzValue = day.date.toDate();
      this.onChange(this._value);
    } else {
      this.nzValue = moment(this.nzValue).year(day.date.year()).month(day.date.month()).date(day.date.date()).toDate();
      this.onChange(this._value);
    }

  }

  _clickMonth(month: MonthInterface): void {
    if (this.nzMode === 'month') {
      this._closeCalendar();
      this.nzValue = moment(this.nzValue).year(this._showYear).month(month.index).toDate();
      this.onChange(this._value);
    } else {
      this._showMonth = month.index;
      this._mode = 'year';
    }
  }

  _openCalendar(): void {
    if (this.nzDisabled) {
      return;
    }
    this._mode = this.nzMode === 'day' ? 'year' : 'month';
    this._open = true;
  }

  _closeCalendar(): void {
    if (!this._open) {
      return;
    }
    if (this.nzShowTime) {
      this._updateValue(this._value);
      this.onChange(this._value);
    }
    this._open = false;
  }

  _changeMonthView(): void {
    this._mode = 'month';
  }

  _changeDecadeView($event: MouseEvent): void {
    $event.stopPropagation();
    this._mode = 'decade';
  }

  _changeTimeView($event: MouseEvent): void {
    $event.stopPropagation();
    this._mode = 'time';
    setTimeout(_ => {
      this.timePickerInner._initPosition();
    });
  }

  _changeYearView($event: MouseEvent): void {
    $event.stopPropagation();
    this._mode = 'year';
  }

  get _showClearIcon(): boolean {
    return this._value && !this.nzDisabled && this.nzAllowClear;
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
    this._yearPanel[ 0 ].unshift('start');
    this._yearPanel[ 3 ].push('end');
  }

  constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef, private _locale: NzLocaleService) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this._generateYearPanel();
  }

  writeValue(value: Date): void {
    // this.nzValue = value;
    this._updateValue(value);
  }

  registerOnChange(fn: (_: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  private _updateValue(value: Date): void {
    if (this._value === value) {
      return;
    }
    if (this._disabledDate && this._disabledDate(value)) {
      return;
    }
    this._value = value;
    this._selectedMonth = moment(this.nzValue).month();
    this._selectedYear = moment(this.nzValue).year();
    this._selectedDate = moment(this.nzValue).date();
    this._showYear = moment(this.nzValue).year();
    this._showMonth = moment(this.nzValue).month();
    this._startDecade = Math.floor(this._showYear / 10) * 10;
  }
}
