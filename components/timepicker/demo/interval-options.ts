import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-interval-options',
  template: `
    <nz-timepicker [nzMinuteStep]="15" [nzSecondStep]="10"></nz-timepicker>
  `
})
export class NzDemoTimepickerIntervalOptionsComponent { }
