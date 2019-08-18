import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-method',
  template: `
    <nz-date-picker #datePicker [(ngModel)]="date"></nz-date-picker>
    <button nz-button nzType="default" (click)="datePicker.open()">Open</button>
  `,
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerMethodComponent {
  date = null;
}
