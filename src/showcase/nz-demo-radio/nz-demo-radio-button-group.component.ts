import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-button-group',
  template: `
    <div>
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
      <nz-radio-group [(ngModel)]="radioValue">
        <label nz-radio-button [nzValue]="'A'">
          <span>Hangzhou</span>
        </label>
        <label nz-radio-button [nzValue]="'B'" nzDisabled>
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
        <label nz-radio-button [nzValue]="'A'" nzDisabled>
          <span>Hangzhou</span>
        </label>
        <label nz-radio-button [nzValue]="'B'" nzDisabled>
          <span>Shanghai</span>
        </label>
        <label nz-radio-button [nzValue]="'C'" nzDisabled>
          <span>Beijing</span>
        </label>
        <label nz-radio-button [nzValue]="'D'" nzDisabled>
          <span>Chengdu</span>
        </label>
      </nz-radio-group>
    </div>
  `,
  styles  : []
})
export class NzDemoRadioButtonGroupComponent {
  radioValue = 'A';
}
