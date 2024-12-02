import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-use12-hours',
  imports: [FormsModule, NzTimePickerModule],
  template: `
    <nz-time-picker [(ngModel)]="time" nzUse12Hours></nz-time-picker>
    <br />
    <br />
    <nz-time-picker [(ngModel)]="time" nzUse12Hours nzFormat="h:mm a"></nz-time-picker>
  `
})
export class NzDemoTimePickerUse12HoursComponent {
  time: Date | null = null;
}
