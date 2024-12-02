import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-date-picker-switch',
  imports: [FormsModule, NzDatePickerModule, NzSelectModule, NzSpaceModule],
  template: `
    <nz-space>
      <nz-select *nzSpaceItem [(ngModel)]="mode">
        <nz-option nzValue="date" nzLabel="Date"></nz-option>
        <nz-option nzValue="week" nzLabel="Week"></nz-option>
        <nz-option nzValue="month" nzLabel="Month"></nz-option>
        <nz-option nzValue="quarter" nzLabel="Quarter"></nz-option>
        <nz-option nzValue="year" nzLabel="Year"></nz-option>
      </nz-select>
      <nz-date-picker *nzSpaceItem [nzMode]="mode"></nz-date-picker>
    </nz-space>
  `
})
export class NzDemoDatePickerSwitchComponent {
  mode = 'date';
}
