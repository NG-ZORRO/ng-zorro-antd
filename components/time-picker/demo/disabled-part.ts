import { Component } from '@angular/core';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-disabled-part',
  imports: [NzTimePickerModule],
  template: `
    <nz-time-picker
      [nzDisabledHours]="disabledHours"
      [nzDisabledMinutes]="disabledMinutes"
      [nzDisabledSeconds]="disabledSeconds"
    ></nz-time-picker>
  `
})
export class NzDemoTimePickerDisabledPartComponent {
  disabledHours(): number[] {
    return [1, 2, 3];
  }

  disabledMinutes(hour: number): number[] {
    if (hour === 4) {
      return [20, 21, 22, 23, 24, 25];
    } else {
      return [];
    }
  }

  disabledSeconds(hour: number, minute: number): number[] {
    if (hour === 5 && minute === 1) {
      return [20, 21, 22, 23, 24, 25];
    } else {
      return [];
    }
  }
}
