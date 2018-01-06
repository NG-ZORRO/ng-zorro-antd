import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-time',
  template: `
    <nz-datepicker [(ngModel)]="_date" nzShowTime [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY-MM-DD HH:mm:ss'"></nz-datepicker>
    <nz-rangepicker [(ngModel)]="_dateRange" nzShowTime [nzFormat]="'YYYY-MM-DD HH:mm:ss'"></nz-rangepicker>
  `,
  styles  : []
})

export class NzDemoDatePickerTimeComponent {
  _date = null;
  _dateRange = [null, null];
}
