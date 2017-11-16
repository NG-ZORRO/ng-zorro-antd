import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-formatter',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY/MM/DD'"></nz-datepicker>
    <nz-datepicker [(ngModel)]="_month" [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY/MM'" [nzMode]="'month'"></nz-datepicker>
  `,
  styles  : []
})
export class NzDemoDatePickerFormatterComponent implements OnInit {
  _date = new Date();
  _month = new Date();
  constructor() {
  }

  ngOnInit() {
  }
}

