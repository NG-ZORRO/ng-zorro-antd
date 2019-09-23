import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-disabled',
  template: `
    <nz-date-picker nzDisabled></nz-date-picker>
    <nz-month-picker nzDisabled></nz-month-picker>
    <nz-range-picker nzDisabled></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-month-picker,
      nz-range-picker {
        display: block;
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerDisabledComponent {}
