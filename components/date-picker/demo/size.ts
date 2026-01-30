import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule, NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-date-picker-size',
  imports: [FormsModule, NzDatePickerModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="large">large</label>
      <label nz-radio-button nzValue="default">default</label>
      <label nz-radio-button nzValue="small">small</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-date-picker [nzSize]="size" />
    <br />
    <nz-date-picker nzMode="week" [nzSize]="size" />
    <br />
    <nz-date-picker nzMode="month" [nzSize]="size" />
    <br />
    <nz-date-picker nzMode="quarter" [nzSize]="size" />
    <br />
    <nz-range-picker [nzSize]="size" />
  `,
  styles: `
    nz-date-picker,
    nz-range-picker {
      margin: 0 8px 12px 0;
    }
  `
})
export class NzDemoDatePickerSizeComponent {
  size: NzDatePickerSizeType = 'default';
}
