import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-start-end',
  template: `
    <nz-datepicker style="width: 40%;" (ngModelChange)="_startDate=$event;_startValueChange()" [ngModel]="_startDate" [nzDisabledDate]="_disabledStartDate" [nzShowTime]="true" [nzFormat]="'YYYY-MM-DD HH:mm:ss'" [nzPlaceHolder]="'Start date'"></nz-datepicker>
    <nz-datepicker style="width: 40%;" (ngModelChange)="_endDate=$event;_endValueChange()" [ngModel]="_endDate" [nzDisabledDate]="_disabledEndDate" [nzShowTime]="true" [nzFormat]="'YYYY-MM-DD HH:mm:ss'" [nzPlaceHolder]="'End date'"></nz-datepicker>`,
  styles  : []
})
export class NzDemoDatePickerStartEndComponent implements OnInit {
  _startDate = null;
  _endDate = null;
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

  constructor() {
  }

  ngOnInit() {
  }
}

