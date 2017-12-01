import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-formatter',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY/MM/DD'"></nz-datepicker>
    <nz-datepicker [(ngModel)]="_month" [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY/MM'" [nzMode]="'month'"></nz-datepicker>
    <nz-rangepicker [(ngModel)]="_dateRange" [nzFormat]="'YYYY/MM/DD'"></nz-rangepicker>

  `,
  styles  : []
})
export class NzDemoDatePickerFormatterComponent {
  _date = new Date();
  _month = new Date();
  _dateRange = [new Date(), new Date(Date.now() + 3600 * 24 * 5 * 1000)];
  constructor() {
  }

}
