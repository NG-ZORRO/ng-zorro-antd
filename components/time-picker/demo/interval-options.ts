import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-interval-options',
  template: `
    <nz-time-picker [nzMinuteStep]="15" [nzSecondStep]="10"></nz-time-picker>
  `
})
export class NzDemoTimePickerIntervalOptionsComponent {}
