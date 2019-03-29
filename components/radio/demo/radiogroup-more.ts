import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-radiogroup-more',
  template: `
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio [ngStyle]="style" nzValue="A">Option A</label>
      <label nz-radio [ngStyle]="style" nzValue="B">Option B</label>
      <label nz-radio [ngStyle]="style" nzValue="C">Option C</label>
      <label nz-radio [ngStyle]="style" nzValue="M">
        More...
        <input type="text" nz-input *ngIf="radioValue == 'M'" style="width: 100px; margin-left: 10px;" />
      </label>
    </nz-radio-group>
  `,
  styles: [
    `
      [nz-radio] {
        display: block;
      }
    `
  ]
})
export class NzDemoRadioRadiogroupMoreComponent {
  radioValue = 'A';
  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };
}
