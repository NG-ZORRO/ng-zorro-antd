import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-disabled',
  template: `
    <nz-timepicker [(ngModel)]="_date" [nzDisabled]="true"></nz-timepicker>`,
  styles  : []
})
export class NzDemoTimePickerDisabledComponent implements OnInit {
  _date = new Date();

  constructor() {
  }

  ngOnInit() {
  }
}

