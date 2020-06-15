import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-radiogroup-more',
  template: `
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio nzValue="A">Option A</label>
      <label nz-radio nzValue="B">Option B</label>
      <label nz-radio nzValue="C">Option C</label>
      <label nz-radio nzValue="M">More... <input type="text" nz-input *ngIf="radioValue === 'M'" /></label>
    </nz-radio-group>
  `,
  styles: [
    `
      [nz-radio] {
        display: block;
        height: 32px;
        line-height: 32px;
      }
      input {
        width: 100px;
        margin-left: 10px;
      }
    `
  ]
})
export class NzDemoRadioRadiogroupMoreComponent {
  radioValue = 'A';
}
