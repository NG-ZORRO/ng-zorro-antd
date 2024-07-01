import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-radiogroup',
  template: `
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio nzValue="A">A</label>
      <label nz-radio nzValue="B">B</label>
      <label nz-radio nzValue="C">C</label>
      <label nz-radio nzValue="D">D</label>
    </nz-radio-group>
  `
})
export class NzDemoRadioRadiogroupComponent {
  radioValue = 'A';
}
