import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-group',
  template: `
    <div>
      <label nz-radio [(ngModel)]="singleValue">
        <span>独立使用 {{ singleValue }}</span>
      </label>
    </div>
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio [nzValue]="'A'">
        <span>A</span>
      </label>
      <label nz-radio [nzValue]="'B'">
        <span>B</span>
      </label>
      <label nz-radio [nzValue]="'C'">
        <span>C</span>
      </label>
      <label nz-radio [nzValue]="'D'">
        <span>D</span>
      </label>
    </nz-radio-group>`,
  styles  : []
})
export class NzDemoRadioGroupComponent {
  radioValue = 'A';
  singleValue = true;
}
