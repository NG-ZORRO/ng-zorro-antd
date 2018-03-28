import { Component, OnInit } from '@angular/core';
import { PickerResult, CandyDate } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-date-picker-time',
  template: `
    <nz-date-picker
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      nzPlaceholder="Select Time"
      (nzOnChange)="onChange($event)"
      (nzOnOk)="onOk($event)"
    ></nz-date-picker>
    <br>
    <nz-range-picker
      [nzShowTime]="{ nzFormat: 'HH:mm' }"
      nzFormat="yyyy-MM-dd HH:mm"
      [nzPlaceholder]="[ 'Start Time', 'End Time' ]"
      (nzOnChange)="onChange($event)"
      (nzOnOk)="onOk($event)"
    ></nz-range-picker>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerTimeComponent {
  onChange(result: PickerResult): void {
    console.log('Selected Time: ', result.date);
    console.log('Formatted Selected Time: ', result.dateString);
  }

  onOk(value: CandyDate | CandyDate[]): void {
    console.log('onOk: ', value);
  }
}
