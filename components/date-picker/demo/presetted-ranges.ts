import { Component, OnInit } from '@angular/core';
import { CandyDate, PickerResultRange } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-date-picker-presetted-ranges',
  template: `
    <nz-range-picker
      [nzRanges]="ranges1"
      (nzOnChange)="onChange($event)"
    ></nz-range-picker>
    <br>
    <nz-range-picker
      [nzRanges]="ranges1"
      nzShowTime
      nzFormat="yyyy/MM/dd HH:mm:ss"
      (nzOnChange)="onChange($event)"
    ></nz-range-picker>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerPresettedRangesComponent {
  ranges1 = { 'Today': [ new CandyDate(), new CandyDate() ], 'This Month': [ new CandyDate(), (new CandyDate()).endOf('month') ] };
  ranges2 = { 'Today': [ new CandyDate(), new CandyDate() ], 'This Month': [ new CandyDate(), (new CandyDate()).endOf('month') ] };

  onChange(result: PickerResultRange): void {
    console.log('From: ', result.date[0], ', to: ', result.date[1]);
    console.log('From: ', result.dateString[0], ', to: ', result.dateString[1]);
  }
}
