import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-hide-options',
  template: `
    <nz-timepicker [(ngModel)]="_date" nzHideDisabledOptions [nzDisabledHours]="disabledHours" [nzDisabledMinutes]="disabledMinutes"></nz-timepicker>`,
  styles  : []
})
export class NzDemoTimePickerHideOptionsComponent {
  _date = null;
  newArray = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  disabledHours = () => {
    const hours = this.newArray(0, 60);
    hours.splice(20, 4);
    return hours;
  };

  disabledMinutes = (h) => {
    if (h === 20) {
      return this.newArray(0, 31);
    } else if (h === 23) {
      return this.newArray(30, 60);
    }
    return [];
  };
}
