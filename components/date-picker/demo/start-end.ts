import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-start-end',
  template: `
    <nz-date-picker
      [nzDisabledDate]="disabledStartDate"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [(ngModel)]="startValue"
      nzPlaceholder="Start"
      (ngModelChange)="onStartChange($event)"
      (nzOnOpenChange)="handleStartOpenChange($event)"
    ></nz-date-picker>
    <nz-date-picker
      [nzDisabledDate]="disabledEndDate"
      nzShowTime
      nzFormat="yyyy-MM-dd HH:mm:ss"
      [(ngModel)]="endValue"
      nzPlaceholder="End"
      [nzOpen]="endOpen"
      (ngModelChange)="onEndChange($event)"
      (nzOnOpenChange)="handleEndOpenChange($event)"
    ></nz-date-picker>
  `
})

export class NzDemoDatePickerStartEndComponent {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
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
