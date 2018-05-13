import { Component, OnInit } from '@angular/core';
import { PanelMode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-date-picker-mode',
  template: `
    <nz-date-picker
      [nzMode]="dateMode"
      nzShowTime
      (nzOnOpenChange)="handleDateOpenChange($event)"
      (nzOnPanelChange)="handleDatePanelChange($event)"
    ></nz-date-picker>
  `,
  styles: [`
    :host ::ng-deep .ant-calendar-picker {
      margin: 0 8px 12px 0;
    }
  `]
})

export class NzDemoDatePickerModeComponent {
  dateMode = 'time';

  handleDateOpenChange(open: boolean): void {
    if (open) {
      this.dateMode = 'time';
    }
  }

  handleDatePanelChange(mode: PanelMode): void {
    console.log('handleDatePanelChange: ', mode);
    // this.dateMode = mode;
  }
}
