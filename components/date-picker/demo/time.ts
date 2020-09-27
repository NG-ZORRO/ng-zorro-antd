import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-time',
  template: `
    <nz-date-picker
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      ngModel
      (ngModelChange)="onChange($event)"
      (nzOnOk)="onOk($event)"
    ></nz-date-picker>
    <br />
    <nz-range-picker
      [nzShowTime]="{ nzFormat: 'HH:mm' }"
      nzFormat="yyyy-MM-dd HH:mm"
      ngModel
      (ngModelChange)="onChange($event)"
      (nzOnCalendarChange)="onCalendarChange($event)"
      (nzOnOk)="onOk($event)"
    ></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerTimeComponent {
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }
}
