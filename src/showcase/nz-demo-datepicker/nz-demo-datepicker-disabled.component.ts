import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-disabled',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'" nzDisabled></nz-datepicker>
    <nz-rangepicker [(ngModel)]="_dateRange" nzDisabled></nz-rangepicker>`,
  styles  : []
})
export class NzDemoDatePickerDisabledComponent {
  _date = new Date();
  _dateRange = [new Date(), new Date(Date.now() + 3600 * 24 * 5 * 1000)];

  constructor() {
  }

}
