import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-without-seconds',
  template: `
    <nz-timepicker [(ngModel)]="_date" [nzFormat]="'HH:mm'"></nz-timepicker>`,
  styles  : []
})
export class NzDemoTimePickerWithoutSecondsComponent implements OnInit {
  _date = new Date();

  constructor() {
  }

  ngOnInit() {
  }
}

