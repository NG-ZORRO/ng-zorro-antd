import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'nz-demo-datepicker-disable-date',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'" [nzDisabledDate]="_disabledDate"></nz-datepicker>
    <nz-datepicker [(ngModel)]="_moment" [nzPlaceHolder]="'Select month'" [nzMode]="'month'" [nzDisabledDate]="_disabledMonth" [nzFormat]="'YYYY-MM'"></nz-datepicker>
  `,
  styles  : []
})
export class NzDemoDatePickerDisableDateComponent {
  _date = null;
  _moment = null;
  _disabledDate = function (current) {
    return current && current.getTime() > Date.now();
  };

  _disabledMonth = function (current) {
    return current && moment(current).day(0).valueOf() > moment().valueOf();
  };
}
