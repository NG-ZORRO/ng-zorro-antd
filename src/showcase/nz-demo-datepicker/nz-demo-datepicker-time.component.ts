import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-datepicker-time',
  template: `
    <nz-datepicker [(ngModel)]="_date" nzShowTime [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY-MM-DD HH:mm:ss'"></nz-datepicker>`,
  styles  : []
})

export class NzDemoDatePickerTimeComponent {
  _date = null;
}
