import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-disabled',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'" [nzDisabled]="true"></nz-datepicker>`,
  styles  : []
})
export class NzDemoDatePickerDisabledComponent implements OnInit {
  _date = new Date();

  constructor() {
  }

  ngOnInit() {
  }
}

