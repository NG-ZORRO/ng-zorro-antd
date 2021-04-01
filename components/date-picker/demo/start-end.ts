import { Component, ViewChild } from '@angular/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-start-end',
  template: `
    <nz-date-picker
      #startDatePicker
      [nzDisabledDate]="disabledStartDate"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [(ngModel)]="startValue"
      nzPlaceHolder="Start"
      (nzOnOk)="handleOk()"
      (keydown)="handleKeydown($event)"
    ></nz-date-picker>
    <nz-date-picker
      #endDatePicker
      [nzDisabledDate]="disabledEndDate"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [(ngModel)]="endValue"
      nzPlaceHolder="End"
    ></nz-date-picker>
  `,
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerStartEndComponent {
  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('startDatePicker') startDatePicker!: NzDatePickerComponent;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleOk(): void {
    this.endDatePicker.open();
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.startDatePicker.close();
      this.endDatePicker.open();
    }
  }
}
