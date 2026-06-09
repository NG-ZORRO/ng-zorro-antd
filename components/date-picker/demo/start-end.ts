import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-start-end',
  imports: [FormsModule, NzDatePickerModule],
  template: `
    <nz-date-picker
      [nzDisabledDate]="disabledStartDate"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [(ngModel)]="startValue"
      nzPlaceHolder="Start"
      (nzOnOpenChange)="handleStartOpenChange($event)"
    />
    <nz-date-picker
      #endDatePicker
      [nzDisabledDate]="disabledEndDate"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [(ngModel)]="endValue"
      nzPlaceHolder="End"
      (nzOnOpenChange)="handleEndOpenChange($event)"
    />
  `,
  styles: `
    nz-date-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerStartEndComponent {
  readonly startValue = signal<Date | null>(null);
  readonly endValue = signal<Date | null>(null);

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  readonly disabledStartDate = (startValue: Date): boolean => {
    const endValue = this.endValue();
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.getTime() > endValue.getTime();
  };

  readonly disabledEndDate = (endValue: Date): boolean => {
    const startValue = this.startValue();
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.getTime() <= startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }
}
