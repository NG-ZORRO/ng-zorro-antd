import { Component } from '@angular/core';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-interval-options',
  imports: [NzTimePickerModule],
  template: `<nz-time-picker [nzMinuteStep]="15" [nzSecondStep]="10" />`
})
export class NzDemoTimePickerIntervalOptionsComponent {}
