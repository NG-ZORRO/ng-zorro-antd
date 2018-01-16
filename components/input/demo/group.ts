import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-group',
  template: `
    <nz-input-group [nzSize]="'large'">
      <div nz-col nzSpan="4">
        <input type="text" nz-input [ngModel]="'0571'">
      </div>
      <div nz-col nzSpan="8">
        <input type="text" nz-input [ngModel]="'26888888'">
      </div>
    </nz-input-group>
    <br>
    <nz-input-group nzCompact>
      <input type="text" nz-input [ngModel]="'0571'" style="width: 20%;">
      <input type="text" nz-input [ngModel]="'26888888'" style="width:30%;">
    </nz-input-group>
    <br>
    <nz-input-group nzCompact>
      <nz-select [ngModel]="'Zhejiang'">
        <nz-option [nzLabel]="'Zhejiang'" [nzValue]="'Zhejiang'"></nz-option>
        <nz-option [nzLabel]="'Jiangsu'" [nzValue]="'Jiangsu'"></nz-option>
      </nz-select>
      <input type="text" nz-input [ngModel]="'Xihu District, Hangzhou'" style="width:50%;">
    </nz-input-group>
  `
})
export class NzDemoInputGroupComponent {
}
