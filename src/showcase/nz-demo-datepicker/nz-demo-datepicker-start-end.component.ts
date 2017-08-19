import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'nz-demo-datepicker-start-end',
  template: `
    <nz-datepicker style="width: 40%;" (ngModelChange)="_startDate=$event;_startValueChange()" [ngModel]="_startDate" [nzDisabledDate]="_disabledStartDate" [nzShowTime]="true" [nzFormat]="'YYYY-MM-DD HH:mm:ss'" [nzPlaceHolder]="'Start date'"></nz-datepicker>
    <nz-datepicker style="width: 40%;" (ngModelChange)="_endDate=$event;_endValueChange()" [ngModel]="_endDate" [nzDisabledDate]="_disabledEndDate" [nzShowTime]="_endTime" [nzFormat]="'YYYY-MM-DD HH:mm:ss'" [nzPlaceHolder]="'End date'"></nz-datepicker>`,
  styles  : []
})
export class NzDemoDatePickerStartEndComponent implements OnInit {
  _startDate = null;
  _endDate = null;
  newArray = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  };
  _startValueChange = () => {
    if (this._startDate > this._endDate) {
      this._endDate = null;
    }
  };
  _endValueChange = () => {
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
  };
  _disabledStartDate = (startValue) => {
    if (!startValue || !this._endDate) {
      return false;
    }
    return startValue.getTime() >= this._endDate.getTime();
  };
  _disabledEndDate = (endValue) => {
    if (!endValue || !this._startDate) {
      return false;
    }
    return endValue.getTime() <= this._startDate.getTime();
  };
  get _isSameDay() {
    return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
  }
  get _endTime() {
    return {
      nzHideDisabledOptions: true,
      nzDisabledHours: () => {
        return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
      },
      nzDisabledMinutes: (h) => {
        if (this._isSameDay && h === this._startDate.getHours()) {
          return this.newArray(this._startDate.getMinutes());
        }
        return [];
      },
      nzDisabledSeconds: (h, m) => {
        if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
          return this.newArray(this._startDate.getSeconds());
        }
        return [];
      }
    }
  }

  constructor() {
  }

  ngOnInit() {
  }
}

