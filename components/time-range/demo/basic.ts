import { Component } from '@angular/core';
import { NzTimeRangeChange } from 'ng-zorro-antd/time-range';

@Component({
  selector: 'nz-demo-time-range-basic',
  template: `
    <nz-time-range [nzRange]="3600000" [nzRanges]="ranges" (nzTimeRangeChange)="onTimeRangeChange($event)">
    </nz-time-range>
  `
})
export class NzDemoTimeRangeBasicComponent {
  ranges: number[] = [600000, 3600000, 21600000];

  onTimeRangeChange(change: NzTimeRangeChange): void {
    console.log(change);
  }
}
