import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-size',
  template: `
    <nz-timepicker [(ngModel)]="time" nzSize="large"></nz-timepicker>
    <nz-timepicker [(ngModel)]="time"></nz-timepicker>
    <nz-timepicker [(ngModel)]="time" nzSize="small"></nz-timepicker>
  `
})
export class NzDemoTimepickerSizeComponent {
  time = new Date();
}
