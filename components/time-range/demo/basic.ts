import { Component } from '@angular/core';
import { NzTimeRangeChange } from 'ng-zorro-antd/time-range';

@Component({
  selector: 'nz-demo-time-range-basic',
  template: `
    <nz-time-range [(nzRanges)]="ranges" (nzTimeRangeChange)="onTimeRangeChange($event)"> </nz-time-range>
  `
})
export class NzDemoTimeRangeBasicComponent {
  ranges: number[] = [600000, 3600000, 21600000];
  range = 3600000;

  onTimeRangeChange(range: NzTimeRangeChange): void {
    console.log(range);
  }
}
