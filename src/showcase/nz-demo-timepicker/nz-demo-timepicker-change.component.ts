import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-change',
  template: `
    <nz-timepicker [(ngModel)]="_date" (ngModelChange)="_console($event)"></nz-timepicker>`,
  styles  : []
})
export class NzDemoTimePickerChangeComponent implements OnInit {
  _date = null;

  _console(value) {
    console.log(value);
  };

  constructor() {
  }

  ngOnInit() {
  }
}

