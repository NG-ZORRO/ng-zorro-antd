import {
  Component,
  ViewEncapsulation,
  Input,
  ElementRef,
  forwardRef,
  ChangeDetectorRef,
  ViewChild,
  HostBinding, OnInit
} from '@angular/core';
import * as moment from 'moment';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropDownAnimation } from '../core/animation/dropdown-animations';
import { NzTimePickerInnerComponent } from '../time-picker/nz-timepicker-inner.component';
import { DEFAULT_DATEPICKER_POSITIONS } from '../core/overlay/overlay-position-map';
import { ConnectionPositionPair } from '../core/overlay/index';

@Component({
  selector     : 'nz-datepicker',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    DropDownAnimation
  ],
  template     : `
    <span style="display: block"
      (click)="_openCalendar()"
      nz-overlay-origin
      #origin="nzOverlayOrigin"
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
      nz-connected-overlay
      hasBackdrop
      [positions]="_positions"
      [origin]="origin"
      (backdropClick)="_closeCalendar()"
      (detach)="_closeCalendar()"
      (positionChange)="onPositionChange($event)"
      [open]="_open">
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
            <a class="ant-calendar-clear-btn" title="清除"></a>
          </div>
          <div class="ant-calendar-date-panel">
            <div class="ant-calendar-header">
              <div style="position: relative;" *ngIf="_mode!='time'">
                <a class="ant-calendar-prev-year-btn" title="上一年" (click)="_preYear()"></a>
                <a class="ant-calendar-prev-month-btn" title="上个月" (click)="_preMonth()"></a>
                <span class="ant-calendar-ym-select">
                <a class="ant-calendar-month-select" title="选择月份" (click)="_changeMonthView()">{{_showMonth + 1}}月</a>
                <a class="ant-calendar-year-select" title="选择年份" (click)="_changeDecadeView($event)">{{_showYear}}年</a>
                </span>
                <a class="ant-calendar-next-month-btn" title="下个月" (click)="_nextMonth()"></a>
                <a class="ant-calendar-next-year-btn" title="下一年" (click)="_nextYear()"></a>
              </div>
              <div style="position: relative;" *ngIf="_mode=='time'">
                <span class="ant-calendar-my-select">
                  <a class="ant-calendar-year-select" title="Choose a month">{{_selectedYear}}年</a>
                  <a class="ant-calendar-month-select" title="Choose a month">{{_showMonth + 1}}月</a>
                  <a class="ant-calendar-day-select">{{_selectedDate}}日</a>
                </span>
              </div>
              <div class="ant-calendar-month-panel" *ngIf="_mode=='month'">
                <div>
                  <div class="ant-calendar-month-panel-header">
                    <a class="ant-calendar-month-panel-prev-year-btn" title="上一年" (click)="_preYear()"></a>
                    <a class="ant-calendar-month-panel-year-select" title="选择年份" (click)="_changeDecadeView($event)">
                      <span class="ant-calendar-month-panel-year-select-content">{{_showYear}}</span>
                      <span class="ant-calendar-month-panel-year-select-arrow">x</span>
                    </a>
                    <a class="ant-calendar-month-panel-next-year-btn" title="下一年" (click)="_nextYear()"></a>
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
                      [nzDatePicker]="true">
                    </nz-calendar>
                  </div>
                </div>
              </div>
              <div class="ant-calendar-year-panel" *ngIf="_mode=='decade'">
                <div>
                  <div class="ant-calendar-year-panel-header">
                    <a class="ant-calendar-year-panel-prev-decade-btn" title="上一年代" (click)="_preDecade()"></a>
                    <a class="ant-calendar-year-panel-decade-select" title="选择年代">
                      <span class="ant-calendar-year-panel-decade-select-content">{{_startDecade}}-{{_startDecade + 9}}</span>
                      <span class="ant-calendar-year-panel-decade-select-arrow">x</span>
                    </a>
                    <a class="ant-calendar-year-panel-next-decade-btn" title="下一年代" (click)="_nextDecade()"></a>
                  </div>
                  <div class="ant-calendar-year-panel-body">
                    <table class="ant-calendar-year-panel-table" cellspacing="0" role="grid">
                      <tbody class="ant-calendar-year-panel-tbody">
                        <tr *ngFor="let tr of _yearPanel">
                          <ng-template ngFor let-td [ngForOf]="tr">
                            <td class="ant-calendar-year-panel-cell ant-calendar-year-panel-last-decade-cell" *ngIf="td=='start'">
                              <a class="ant-calendar-year-panel-year" (click)="_preDecade()">{{_startDecade - 1}}</a>
                            </td>
                            <td *ngIf="(td!='start')&&(td!='end')" [attr.title]="_startDecade+td" class="ant-calendar-year-panel-cell" [ngClass]="{'ant-calendar-year-panel-selected-cell':(_startDecade+td==_showYear)}">
                              <a class="ant-calendar-year-panel-year" (click)="_setShowYear(_startDecade+td,$event)">{{_startDecade + td}}</a>
                            </td>
                            <td class="ant-calendar-year-panel-cell ant-calendar-year-panel-next-decade-cell" *ngIf="td=='end'">
                              <a class="ant-calendar-year-panel-year" (click)="_nextDecade()">{{_startDecade + 1}}</a>
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
              [nzPlaceHolder]="nzShowTime&&nzShowTime.nzPlaceHolder||'请选择时间'"
              [nzFormat]="nzShowTime&&nzShowTime.nzFormat||'HH:mm:ss'"
              [nzDisabled]="nzShowTime&&nzShowTime.nzDisabled||false"
              [nzDisabledHours]="nzShowTime&&nzShowTime.nzDisabledHours||null"
              [nzDisabledMinutes]="nzShowTime&&nzShowTime.nzDisabledMinutes||null"
              [nzDisabledSeconds]="nzShowTime&&nzShowTime.nzDisabledSeconds||null"
              [nzHideDisabledOptions]="nzShowTime&&nzShowTime.nzHideDisabledOptions||false"
              [ngModel]="_value" (ngModelChange)="_changeTime($event)"
              *ngIf="nzShowTime&&(_mode == 'time')"></nz-timepicker-inner>
            <div class="ant-calendar-calendar-body">
              <nz-calendar [nzClearTime]="!nzShowTime" [nzDisabledDate]="nzDisabledDate" (nzClickDay)="_clickDay($event)" [nzShowMonth]="_showMonth" [nzShowYear]="_showYear" [nzValue]="_value" (nzClickMonth)="_clickMonth($event)" [nzMode]="'year'" [nzFullScreen]="false" [nzShowHeader]="false" [nzDatePicker]="true"></nz-calendar>
            </div>
            <div class="ant-calendar-footer ant-calendar-footer-show-ok">
                <span class="ant-calendar-footer-btn">
                  <a class="ant-calendar-today-btn " [attr.title]="_today|nzDate:nzFormat" (click)="_changeToToday()">{{nzShowTime ? '此刻' : '今天'}}</a>
                  <a class="ant-calendar-time-picker-btn" (click)="_changeTimeView($event)" *ngIf="(_mode != 'time')&&nzShowTime">选择时间</a>
                  <a class="ant-calendar-time-picker-btn" (click)="_changeYearView($event)" *ngIf="(_mode == 'time')&&nzShowTime">选择日期</a>
                  <a class="ant-calendar-ok-btn" *ngIf="nzShowTime" (click)="_closeCalendar()">确 定</a>
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
  ]
})
export class NzDatePickerComponent implements ControlValueAccessor, OnInit {
  _el: HTMLElement;
  _open = false;
  _mode = 'year';
  _dropDownPosition = 'bottom';
  _triggerWidth = 0;
  _value = null;
  _disabled = false;
  _today = new Date();
  _selectedMonth = moment(this.nzValue).month();
  _selectedYear = moment(this.nzValue).year();
  _selectedDate = moment(this.nzValue).date();
  _showMonth = moment(new Date()).month();
  _showYear = moment(new Date()).year();
  _startDecade = Math.floor(this._showYear / 10) * 10;
  _yearPanel: Array<Array<string>> = [];
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_DATEPICKER_POSITIONS ];
  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  @Input() nzDisabledDate;
  @Input() nzAllowClear = true;
  @Input() nzShowTime: any = null;
  @Input() nzPlaceHolder = '请选择日期';
  @Input() nzFormat = 'YYYY-MM-DD';
  @Input() nzSize = '';
  @ViewChild('trigger') trigger;
  @ViewChild(NzTimePickerInnerComponent) timePickerInner: NzTimePickerInnerComponent;
  @HostBinding('class.ant-calendar-picker') _nzCalendarPicker = true;

  @Input()
  get nzDisabled(): boolean {
    return this._disabled;
  };

  set nzDisabled(value: boolean) {
    this._disabled = value;
    this._closeCalendar();
  }

  _setTriggerWidth(): void {
    this._triggerWidth = this.trigger.nativeElement.getBoundingClientRect().width;
  }

  onPositionChange(position) {
    const _position = position.connectionPair.originY === 'bottom' ? 'top' : 'bottom';
    if (this._dropDownPosition !== _position) {
      this._dropDownPosition = _position;
      this._cdr.detectChanges();
    }
  }


  get nzValue(): Date {
    return this._value || new Date();
  };

  set nzValue(value: Date) {
    this._updateValue(value);
  };

  _changeTime($event) {
    this._value = $event;
  }

  _blurInput(box) {
    if (Date.parse(box.value)) {
      this.nzValue = new Date(box.value);
      this.onChange(this._value);
    }
  }

  _preYear() {
    this._showYear = this._showYear - 1;
  }

  _nextYear() {
    this._showYear = this._showYear + 1;
  }

  _preMonth() {
    if (this._showMonth - 1 < 0) {
      this._showMonth = 11;
      this._preYear();
    } else {
      this._showMonth = this._showMonth - 1;
    }
  }

  _nextMonth() {
    if (this._showMonth + 1 > 11) {
      this._showMonth = 0;
      this._nextYear();
    } else {
      this._showMonth = this._showMonth + 1;
    }
  }

  _setShowYear(year, $event) {
    $event.stopPropagation();
    this._showYear = year;
    this._mode = 'year';
  }

  _preDecade() {
    this._startDecade = this._startDecade - 10;
  }

  _nextDecade() {
    this._startDecade = this._startDecade + 10;
  }

  _clearValue(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.nzValue = null;
    this.onChange(this._value);
  }

  _changeToToday() {
    this.nzValue = new Date();
    this.onChange(this._value);
    this._closeCalendar();
  }

  _clickDay(day) {
    if (!this.nzShowTime) {
      this._closeCalendar();
      this.nzValue = day.date.toDate();
      this.onChange(this._value);
    } else {
      this.nzValue = moment(this.nzValue).year(day.date.year()).month(day.date.month()).date(day.date.date()).toDate();
      this.onChange(this._value);
    }

  }

  _clickMonth(month) {
    this._showMonth = month.index;
    this._mode = 'year';
  }

  _openCalendar() {
    if (this.nzDisabled) {
      return;
    }
    this._mode = 'year';
    this._open = true;
    this._setTriggerWidth();
  }

  _closeCalendar() {
    if (!this._open) {
      return;
    }
    if (this.nzShowTime) {
      this.onChange(this._value);
    }
    this._open = false;
  }

  _changeMonthView() {
    this._mode = 'month';
  }

  _changeDecadeView($event) {
    $event.stopPropagation();
    this._mode = 'decade';
  }

  _changeTimeView($event) {
    $event.stopPropagation();
    this._mode = 'time';
    setTimeout(_ => {
      this.timePickerInner._initPosition();
    });
  }

  _changeYearView($event) {
    $event.stopPropagation();
    this._mode = 'year';
  }

  get _showClearIcon() {
    return this._value && !this.nzDisabled && this.nzAllowClear;
  }

  _generateYearPanel() {
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

  constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit() {
    this._generateYearPanel();
  }

  writeValue(value: any): void {
    // this.nzValue = value;
    this._updateValue(value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  private _updateValue(value: any) {
    if (this._value === value) {
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
