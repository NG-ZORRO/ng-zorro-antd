import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="large">large</label>
      <label nz-radio-button nzValue="default">default</label>
      <label nz-radio-button nzValue="small">small</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-date-picker [nzSize]="size"></nz-date-picker>
    <br />
    <nz-date-picker nzMode="week" [nzSize]="size"></nz-date-picker>
    <br />
    <nz-date-picker nzMode="month" [nzSize]="size"></nz-date-picker>
    <br />
    <nz-range-picker [nzSize]="size"></nz-range-picker>
  `,
  styles: [
    `
      nz-date-picker,
      nz-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerSizeComponent {
  size: 'large' | 'small' | 'default' = 'default';
}
