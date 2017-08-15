import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-basic',
  template: `
    <nz-timepicker [(ngModel)]="_date"></nz-timepicker>`,
  styles  : []
})
export class NzDemoTimePickerBasicComponent implements OnInit {
  _date = null;

  constructor() {
  }

  ngOnInit() {
  }
}

