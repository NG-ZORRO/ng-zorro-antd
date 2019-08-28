import { Component } from '@angular/core';
import { NzTimeRangeChange } from 'ng-zorro-antd/time-range';

@Component({
  selector: 'nz-demo-time-range-auto-refresh',
  template: `
    <nz-time-range
      [(nzRanges)]="ranges"
      [nzAutoRefresh]="true"
      [nzShowAutoRefresh]="true"
      (nzRangeChange)="onRangeChange($event)"
      (nzAutoRefreshChange)="onAutoRefreshChange($event)"
    >
    </nz-time-range>
  `
})
export class NzDemoTimeRangeAutoRefreshComponent {
  ranges: number[] = [600000, 3600000, 21600000];
  range = 3600000;

  onRangeChange(range: NzTimeRangeChange): void {
    console.log(range);
  }

  onAutoRefreshChange(auto: boolean): void {
    console.log('auto:', auto);
  }
}
