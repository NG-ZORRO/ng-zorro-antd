import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-bordered',
  template: `
    <nz-date-picker nzBorderless></nz-date-picker>
    <br />
    <nz-range-picker nzBorderless></nz-range-picker>
    <br />
  `,
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerBorderedComponent {}
