import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-disabled',
  template: `
    <nz-datepicker [(ngModel)]="_date" [nzPlaceHolder]="'Select date'" nzDisabled></nz-datepicker>`,
  styles  : []
})
export class NzDemoDatePickerDisabledComponent {
  _date = new Date();
}
