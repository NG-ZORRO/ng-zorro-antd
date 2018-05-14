import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-disabled',
  template: `
    <nz-date-picker nzDisabled></nz-date-picker>
    <br>
    <nz-month-picker nzDisabled></nz-month-picker>
    <br>
    <nz-range-picker nzDisabled></nz-range-picker>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerDisabledComponent {
}
