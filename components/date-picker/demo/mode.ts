import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-mode',
  template: `
    <nz-date-picker
      [nzMode]="dateMode"
      nzShowTime
      (nzOnOpenChange)="handleDateOpenChange($event)"
      (nzOnPanelChange)="handleDatePanelChange($event)"
    >
    </nz-date-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-month-picker,
      nz-range-picker,
      nz-week-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerModeComponent {
  dateMode = 'time';

  handleDateOpenChange(open: boolean): void {
    if (open) {
      this.dateMode = 'time';
    }
  }

  handleDatePanelChange(mode: string): void {
    console.log('handleDatePanelChange: ', mode);
  }
}
