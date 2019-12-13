import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-use12-hours',
  template: `
    <nz-time-picker [(ngModel)]="time" [nzUse12Hours]="true"></nz-time-picker>
    <nz-time-picker [(ngModel)]="time" [nzUse12Hours]="true" nzFormat="h:mm a"></nz-time-picker>
  `,
  styles: [
    `
      nz-time-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoTimePickerUse12HoursComponent {
  time: Date | null = null;
}
