import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-switch',
  template: `
    <nz-space>
      <nz-space-item>
        <nz-select [(ngModel)]="mode">
          <nz-option nzValue="date" nzLabel="Date"></nz-option>
          <nz-option nzValue="week" nzLabel="Week"></nz-option>
          <nz-option nzValue="month" nzLabel="Month"></nz-option>
          <nz-option nzValue="year" nzLabel="Year"></nz-option>
        </nz-select>
      </nz-space-item>
      <nz-space-item>
        <nz-date-picker [nzMode]="mode"></nz-date-picker>
      </nz-space-item>
    </nz-space>
  `
})
export class NzDemoDatePickerSwitchComponent {
  mode = 'date';
}
