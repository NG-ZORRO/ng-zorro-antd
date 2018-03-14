import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-hide-column',
  template: `
    <nz-timepicker [(ngModel)]="time" nzFormat="HH:mm"></nz-timepicker>
  `
})
export class NzDemoTimepickerHideColumnComponent {
  time = new Date();
}
