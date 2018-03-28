import { Component, OnInit } from '@angular/core';
import { PickerResult } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-date-picker-basic',
  template: `
    <nz-date-picker (nzOnChange)="onChange($event)"></nz-date-picker>
    <br>
    <nz-month-picker (nzOnChange)="onChange($event)" nzPlaceholder="Select month"></nz-month-picker>
    <br>
    <nz-range-picker (nzOnChange)="onChange($event)"></nz-range-picker>
    <br>
    <nz-week-picker (nzOnChange)="onChange($event)" nzPlaceholder="Select week"></nz-week-picker>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerBasicComponent {
  onChange(result: PickerResult): void {
    console.log('onChange: ', result);
  }
}
