import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-button-group-size',
  template: `
    <div>
      <nz-radio-group [(ngModel)]="radioValue" [nzSize]="'large'">
        <label nz-radio-button [nzValue]="'A'">
          <span>Hangzhou</span>
        </label>
        <label nz-radio-button [nzValue]="'B'">
          <span>Shanghai</span>
        </label>
        <label nz-radio-button [nzValue]="'C'">
          <span>Beijing</span>
        </label>
        <label nz-radio-button [nzValue]="'D'">
          <span>Chengdu</span>
        </label>
      </nz-radio-group>
    </div>
    <div style="margin-top:16px;">
      <nz-radio-group [(ngModel)]="radioValue">
        <label nz-radio-button [nzValue]="'A'">
          <span>Hangzhou</span>
        </label>
        <label nz-radio-button [nzValue]="'B'">
          <span>Shanghai</span>
        </label>
        <label nz-radio-button [nzValue]="'C'">
          <span>Beijing</span>
        </label>
        <label nz-radio-button [nzValue]="'D'">
          <span>Chengdu</span>
        </label>
      </nz-radio-group>
    </div>
    <div style="margin-top:16px;">
      <nz-radio-group [(ngModel)]="radioValue" [nzSize]="'small'">
        <label nz-radio-button [nzValue]="'A'">
          <span>Hangzhou</span>
        </label>
        <label nz-radio-button [nzValue]="'B'">
          <span>Shanghai</span>
        </label>
        <label nz-radio-button [nzValue]="'C'">
          <span>Beijing</span>
        </label>
        <label nz-radio-button [nzValue]="'D'">
          <span>Chengdu</span>
        </label>
      </nz-radio-group>
    </div>
  `,
  styles  : []
})
export class NzDemoRadioButtonGroupSizeComponent {
  radioValue = 'A';
}

