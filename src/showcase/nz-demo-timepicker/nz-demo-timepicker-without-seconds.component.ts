import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-without-seconds',
  template: `
    <nz-timepicker [(ngModel)]="_date" [nzFormat]="'HH:mm'"></nz-timepicker>`,
  styles  : []
})
export class NzDemoTimePickerWithoutSecondsComponent {
  _date = new Date();
}
