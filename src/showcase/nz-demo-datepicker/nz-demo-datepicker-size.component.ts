import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-size',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzSize]="'large'" [nzPlaceHolder]="'Select date'"></nz-datepicker>
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'"></nz-datepicker>
    <nz-datepicker [(ngModel)]="_date" [nzSize]="'small'" [nzPlaceHolder]="'Select date'"></nz-datepicker>`,
  styles  : []
})
export class NzDemoDatePickerSizeComponent implements OnInit {
  _date = null;

  constructor() {
  }

  ngOnInit() {
  }
}

