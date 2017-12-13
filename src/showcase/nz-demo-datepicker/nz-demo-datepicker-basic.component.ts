import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-basic',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'"></nz-datepicker>`,
  styles  : []
})
export class NzDemoDatePickerBasicComponent {
  _date = null;
}
