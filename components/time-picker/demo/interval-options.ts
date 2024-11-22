import { Component } from '@angular/core';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-interval-options',
  standalone: true,
  imports: [NzTimePickerModule],
  template: `<nz-time-picker [nzMinuteStep]="15" [nzSecondStep]="10"></nz-time-picker>`
})
export class NzDemoTimePickerIntervalOptionsComponent {}
