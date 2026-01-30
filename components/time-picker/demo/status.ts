import { Component } from '@angular/core';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-status',
  imports: [NzTimePickerModule],
  template: `
    <nz-time-picker nzStatus="error" />
    <br />
    <br />
    <nz-time-picker nzStatus="warning">></nz-time-picker>
  `
})
export class NzDemoTimePickerStatusComponent {}
