import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-time',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzShowTime]="true" [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY-MM-DD HH:mm:ss'"></nz-datepicker>`,
  styles  : []
})

export class NzDemoDatePickerTimeComponent implements OnInit {
  _date = null;

  constructor() {
  }

  ngOnInit() {
  }
}
