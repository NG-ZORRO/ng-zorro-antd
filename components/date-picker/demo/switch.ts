import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-switch',
  template: `
    <nz-space>
      <nz-select *nzSpaceItem [(ngModel)]="mode">
        <nz-option nzValue="date" nzLabel="Date"></nz-option>
        <nz-option nzValue="week" nzLabel="Week"></nz-option>
        <nz-option nzValue="month" nzLabel="Month"></nz-option>
        <nz-option nzValue="year" nzLabel="Year"></nz-option>
      </nz-select>
      <nz-date-picker *nzSpaceItem [nzMode]="mode"></nz-date-picker>
    </nz-space>
  `
})
export class NzDemoDatePickerSwitchComponent {
  mode = 'date';
}
