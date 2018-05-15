import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-time',
  template: `
    <nz-date-picker
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      nzPlaceholder="Select Time"
      (ngModelChange)="onChange($event)"
      (nzOnOk)="onOk($event)"
    ></nz-date-picker>
    <br>
    <nz-range-picker
      [nzShowTime]="{ nzFormat: 'HH:mm' }"
      nzFormat="yyyy-MM-dd HH:mm"
      [nzPlaceholder]="[ 'Start Time', 'End Time' ]"
      (ngModelChange)="onChange($event)"
      (nzOnOk)="onOk($event)"
    ></nz-range-picker>
  `,
  styles  : [ `
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  ` ]
})

export class NzDemoDatePickerTimeComponent {
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    console.log('onOk', result);
  }
}
