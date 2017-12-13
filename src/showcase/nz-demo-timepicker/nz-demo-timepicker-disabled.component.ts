import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timepicker-disabled',
  template: `
    <nz-timepicker [(ngModel)]="_date" nzDisabled></nz-timepicker>`,
  styles  : []
})
export class NzDemoTimePickerDisabledComponent {
  _date = new Date();
}
