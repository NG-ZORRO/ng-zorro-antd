import {
  Component,
  ViewEncapsulation,
  forwardRef,
  ViewChild,
  Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { DropDownAnimation } from '../core/animation/dropdown-animations';
import { NzTimePickerInnerComponent } from './nz-timepicker-inner.component';
import { DEFAULT_DATEPICKER_POSITIONS } from '../core/overlay/overlay-position-map';
import { ConnectionPositionPair } from '../core/overlay/index';

@Component({
  selector     : 'nz-timepicker',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    DropDownAnimation
  ],
  template     : `
    <span
      class="ant-time-picker"
      [class.ant-time-picker-large]="nzSize=='large'"
      [class.ant-time-picker-small]="nzSize=='small'"
      nz-overlay-origin #origin="nzOverlayOrigin"
      #trigger>
      <input
        [disabled]="nzDisabled"
        class="ant-time-picker-input"
        [attr.placeholder]="nzPlaceHolder"
        (click)="_openCalendar()"
        (blur)="onTouched()"
        [value]="_value|nzDate:_format">
      <span class="ant-time-picker-icon"></span>
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
      <div class="ant-time-picker-panel"
        [class.top]="_dropDownPosition==='top'"
        [class.bottom]="_dropDownPosition==='bottom'"
        [style.width]="_width"
        [@dropDownAnimation]="_dropDownPosition">
        <div class="ant-time-picker-panel-inner">
          <div class="ant-time-picker-panel-input-wrap">
            <input class="ant-time-picker-panel-input"
              [attr.placeholder]="nzPlaceHolder"
              #inputTimeInstance
              [value]="_value|nzDate:_format"
              (blur)="_manualChangeInput(inputTimeInstance)"
              (keydown.Enter)="_manualChangeInput(inputTimeInstance)">
            <a class="ant-time-picker-panel-clear-btn" title="清除" (click)="_clearValue()"></a>
          </div>
          <div class="ant-time-picker-panel-combobox">
            <div class="ant-time-picker-panel-select"
              #hourListInstance *ngIf="_showHour"
              (mouseover)="_overHour()">
              <ul>
                <ng-template
                  ngFor
                  let-_hour
                  [ngForOf]="_hourList"
                  let-i="index">
                  <li
                    [class.ant-time-picker-panel-select-option-selected]="_hour.index===_selectedHour"
                    [class.ant-time-picker-panel-select-option-disabled]="_hour.disabled"
                    [ngClass]="_hour.name"
                    *ngIf="!(nzHideDisabledOptions&&_hour.disabled)"
                    (click)="_selectHour(hourListInstance,_hour.index,_hour.disabled)">
                    {{_hour.name}}
                  </li>
                </ng-template>
              </ul>
            </div>
            <div
              class="ant-time-picker-panel-select"
              #minuteListInstance
              *ngIf="_showMinute"
              (mouseover)="_overMinute()">
              <ul>
                <ng-template
                  ngFor
                  let-_minute
                  [ngForOf]="_minuteList"
                  let-i="index">
                  <li
                    [ngClass]="_minute.name"
                    *ngIf="!(nzHideDisabledOptions&&_minute.disabled)"
                    [class.ant-time-picker-panel-select-option-selected]="_minute.index===_selectedMinute"
                    [class.ant-time-picker-panel-select-option-disabled]="_minute.disabled"
                    (click)="_selectMinute(minuteListInstance,_minute.index,_minute.disabled)">
                    {{_minute.name}}
                  </li>
                </ng-template>
              </ul>
            </div>
            <div
              class="ant-time-picker-panel-select"
              #secondListInstance *ngIf="_showSecond"
              (mouseover)="_overSecond()">
              <ul>
                <ng-template
                  ngFor
                  let-_second
                  [ngForOf]="_secondList"
                  let-i="index">
                  <li
                    [ngClass]="_second.name"
                    [class.ant-time-picker-panel-select-option-selected]="_second.index===_selectedSecond"
                    [class.ant-time-picker-panel-select-option-disabled]="_second.disabled"
                    *ngIf="!(nzHideDisabledOptions&&_second.disabled)"
                    (click)="_selectSecond(secondListInstance,_second.index,_second.disabled)">
                    {{_second.name}}
                  </li>
                </ng-template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ng-template>`,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzTimePickerComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzTimePickerComponent extends NzTimePickerInnerComponent {
  _disabled = false;
  _dropDownPosition = 'bottom';
  _triggerWidth = 0;
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_DATEPICKER_POSITIONS ];

  @ViewChild('trigger') trigger;

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

  _manualChangeInput(box) {
    const _tempMoment = moment(box.value, this._format);
    if (Date.parse(_tempMoment.toDate().toString())) {
      this.nzValue = new Date((moment(this._value).hour(_tempMoment.hour()).minute(_tempMoment.minute()).second(_tempMoment.second())).toDate().getTime());
      this.onChange(this._value);
    }
    // this._closeCalendar();
  }

  _overHour() {
    const _start = this._format.indexOf('HH');
    const _end = _start + 2;
    this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
  }

  _overMinute() {
    const _start = this._format.indexOf('mm');
    const _end = _start + 2;
    this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
  }

  _overSecond() {
    const _start = this._format.indexOf('ss');
    const _end = _start + 2;
    this._inputTimeInstance.nativeElement.setSelectionRange(_start, _end);
  }

  _clearValue() {
    this.nzValue = null;
    this._selectedHour = null;
    this._selectedMinute = null;
    this.onChange(this._value);
    this._selectedSecond = null;
  }

  _openCalendar() {
    this._open = true;
    this._setTriggerWidth();
    setTimeout(_ => {
      this._initPosition();
      this._inputTimeInstance.nativeElement.setSelectionRange(0, 8);
    });
  }

  _closeCalendar() {
    if (!this._open) {
      return;
    }
    this._open = false;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }
}
