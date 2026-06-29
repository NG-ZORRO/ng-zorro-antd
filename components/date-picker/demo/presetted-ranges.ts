import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

function endOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
}

@Component({
  selector: 'nz-demo-date-picker-presetted-ranges',
  imports: [FormsModule, NzDatePickerModule],
  template: `
    <nz-range-picker [nzRanges]="ranges" ngModel (ngModelChange)="onChange($event)" />
    <br />
    <nz-range-picker
      [nzRanges]="ranges"
      nzShowTime
      nzFormat="yyyy/MM/dd HH:mm:ss"
      ngModel
      (ngModelChange)="onChange($event)"
    />
  `,
  styles: `
    nz-date-picker,
    nz-range-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerPresettedRangesComponent {
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };

  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1]);
  }
}
