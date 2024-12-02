import { Component } from '@angular/core';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-date-picker-status',
  imports: [NzDatePickerModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-date-picker *nzSpaceItem nzStatus="error" style="width: 100%"></nz-date-picker>
      <nz-date-picker *nzSpaceItem nzStatus="warning" style="width: 100%"></nz-date-picker>
      <nz-range-picker *nzSpaceItem nzStatus="error" style="width: 100%"></nz-range-picker>
      <nz-range-picker *nzSpaceItem nzStatus="warning" style="width: 100%"></nz-range-picker>
    </nz-space>
  `
})
export class NzDemoDatePickerStatusComponent {}
