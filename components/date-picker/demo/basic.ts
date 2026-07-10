import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'nz-demo-date-picker-basic',
  imports: [FormsModule, NzDatePickerModule],
  template: `
    <nz-date-picker [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-date-picker nzMode="week" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-date-picker nzMode="month" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-date-picker nzMode="quarter" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
    <br />
    <nz-date-picker nzMode="year" [(ngModel)]="date" (ngModelChange)="onChange($event)" />
  `,
  styles: `
    nz-date-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerBasicComponent {
  readonly date = signal<Date | null>(null);

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
