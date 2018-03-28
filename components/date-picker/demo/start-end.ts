import { Component, OnInit } from '@angular/core';
import { CandyDate, PickerResultSingle } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-date-picker-start-end',
  template: `
    <nz-date-picker
      [nzDisabledDate]="disabledStartDate.bind(this)"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [nzValue]="startValue"
      nzPlaceholder="Start"
      (nzOnChange)="onStartChange($event)"
      (nzOnOpenChange)="handleStartOpenChange($event)"
    ></nz-date-picker>
    <nz-date-picker
      [nzDisabledDate]="disabledEndDate.bind(this)"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [nzValue]="endValue"
      nzPlaceholder="End"
      [nzOpen]="endOpen"
      (nzOnChange)="onEndChange($event)"
      (nzOnOpenChange)="handleEndOpenChange($event)"
    ></nz-date-picker>
  `
})

export class NzDemoDatePickerStartEndComponent {
  startValue: CandyDate = null;
  endValue: CandyDate = null;
  endOpen: boolean = false;

  disabledStartDate(startValue: CandyDate): boolean {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  }

  disabledEndDate(endValue: CandyDate): boolean {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

  onStartChange({ date }: PickerResultSingle): void {
    this.startValue = date;
  }

  onEndChange({ date }: PickerResultSingle): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }
}
