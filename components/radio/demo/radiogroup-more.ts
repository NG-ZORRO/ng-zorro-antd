import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-radiogroup-more',
  template: `
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio [ngStyle]="style" [nzValue]="'A'">
        <span>Option A</span>
      </label>
      <label nz-radio [ngStyle]="style" [nzValue]="'B'">
        <span>Option B</span>
      </label>
      <label nz-radio [ngStyle]="style" [nzValue]="'C'">
        <span>Option C</span>
      </label>
      <label nz-radio [ngStyle]="style" [nzValue]="'M'">
        <span>
          More...
          <input type="text" nz-input *ngIf="radioValue=='M'" style="width: 100px; margin-left: 10px;">
        </span>
      </label>
    </nz-radio-group>

  `,
  styles  : [
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
    lineHeight: '30px',
  };
}
