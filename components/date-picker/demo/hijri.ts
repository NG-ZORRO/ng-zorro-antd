import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-hijri',
  imports: [FormsModule, NzDatePickerModule],
  template: `
    <nz-hijri-date-picker [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-hijri-date-picker nzMode="month" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-hijri-date-picker nzMode="year" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-hijri-date-picker nzFormat="dd MMMM yyyy" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-hijri-range-picker [(ngModel)]="range" (ngModelChange)="onRangeChange($event)" />
  `,
  styles: `
    nz-hijri-date-picker,
    nz-hijri-range-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerHijriComponent {
  readonly date = signal<Date | null>(null);
  readonly range = signal<Date[]>([]);

  onChange(result: Date | null): void {
    console.log('onChange: ', result);
  }

  onRangeChange(result: Date[]): void {
    console.log('onRangeChange: ', result);
  }
}
