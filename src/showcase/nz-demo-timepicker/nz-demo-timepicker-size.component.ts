import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-size',
  template: `
    <nz-timepicker [(ngModel)]="_date" [nzSize]="'large'"></nz-timepicker>
    <nz-timepicker [(ngModel)]="_date"></nz-timepicker>
    <nz-timepicker [(ngModel)]="_date" [nzSize]="'small'"></nz-timepicker>`,
  styles  : []
})
export class NzDemoTimePickerSizeComponent {
  _date = new Date();
}
