import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-group-disabled',
  template: `
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio [nzValue]="'A'">
        <span>A</span>
      </label>
      <label nz-radio [nzValue]="'B'" [nzDisabled]="isDisabled">
        <span>B</span>
      </label>
      <label nz-radio [nzValue]="'C'" [nzDisabled]="isDisabled">
        <span>C</span>
      </label>
      <label nz-radio [nzValue]="'D'">
        <span>D</span>
      </label>
    </nz-radio-group>
    <div style="margin-top: 20px;">
      <button nz-button [nzType]="'primary'" (click)="toggleDisabled()">Toggle Disabled</button>
    </div>
  `,
  styles  : []
})
export class NzDemoRadioGroupDisabledComponent {
  radioValue = 'A';
  isDisabled = true;
  toggleDisabled = () => {
    this.isDisabled = !this.isDisabled;
  };
}

