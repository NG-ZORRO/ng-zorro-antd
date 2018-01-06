import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-basic',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'"></nz-datepicker>
    <nz-rangepicker [(ngModel)]="_dateRange"
                    [nzPlaceholder]="['Select start date', 'Select end date']"></nz-rangepicker>
  `,
  styles  : []
})
export class NzDemoDatePickerBasicComponent {
  _date = null;
  _dateRange = [null, null];

  constructor() {
  }

}
