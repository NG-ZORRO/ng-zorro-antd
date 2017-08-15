import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-disable-date',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'" [nzDisabledDate]="_disabledDate"></nz-datepicker>`,
  styles  : []
})
export class NzDemoDatePickerDisableDateComponent implements OnInit {
  _date = null;
  _disabledDate = function (current) {
    return current && current.getTime() > Date.now();
  };

  constructor() {
  }

  ngOnInit() {
  }
}

