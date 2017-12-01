import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-size',
  template: `
    <nz-radio-group [(ngModel)]="size" style="margin-bottom: 16px">
      <label nz-radio-button [nzValue]="'large'"><span>Large</span></label>
      <label nz-radio-button [nzValue]="'default'"><span>Default</span></label>
      <label nz-radio-button [nzValue]="'small'"><span>Small</span></label>
    </nz-radio-group>
    <nz-datepicker [(ngModel)]="_date" [nzSize]="size" [nzPlaceHolder]="'Select date'"></nz-datepicker>
    <nz-datepicker [(ngModel)]="_month" [nzMode]="'month'" [nzSize]="size" [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY/MM'"></nz-datepicker>
    <nz-rangepicker [(ngModel)]="_dateRange" [nzSize]="size"></nz-rangepicker>
   `,
  styles  : []
})
export class NzDemoDatePickerSizeComponent {
  size = 'default';
  _date = null;
  _month = null;
  _dateRange = [null, null];

  constructor() {
  }

}
