import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-input-group',
  template: `
    <nz-input-group [nzSize]="'large'">
      <div nz-col [nzSpan]="4">
        <input [(ngModel)]="_valueOne" nz-input>
      </div>
      <div nz-col [nzSpan]="8">
        <input [(ngModel)]="_valueTwo" nz-input>
      </div>
    </nz-input-group>
    <br>
    <nz-input-group [nzSize]="'large'" nzCompact>
      <input [(ngModel)]="_valueOne" style="width: 20%;" nz-input>
      <input [(ngModel)]="_valueTwo" style="width: 30%;" nz-input>
    </nz-input-group>
    <br>
    <nz-input-group [nzSize]="'large'" nzCompact>
      <nz-select [ngModel]="'Zhejiang'">
        <nz-option [nzLabel]="'Zhejiang'" [nzValue]="'Zhejiang'"></nz-option>
        <nz-option [nzLabel]="'Jiangsu'" [nzValue]="'Jiangsu'"></nz-option>
      </nz-select>
      <input [ngModel]="'Xihu District, Hangzhou'" style="width: 50%;" nz-input>
    </nz-input-group>
    <br>
    <nz-input-group [nzSize]="'large'" nzCompact>
      <nz-select [ngModel]="'Option1'">
        <nz-option [nzLabel]="'Option1'" [nzValue]="'Option1'"></nz-option>
        <nz-option [nzLabel]="'Option2'" [nzValue]="'Option2'"></nz-option>
      </nz-select>
      <input [ngModel]="'input content'" style="width: 50%;" nz-input>
      <nz-input-number [ngModel]="1" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>
    </nz-input-group>
    <br>
    <nz-input-group [nzSize]="'large'" nzCompact>
      <input [ngModel]="'input content'" style="width: 50%;" nz-input>
      <nz-datepicker [(ngModel)]="date"></nz-datepicker>
    </nz-input-group>
    <br>
    <nz-input-group [nzSize]="'large'" nzCompact>
      <nz-select [ngModel]="'Option1-1'">
        <nz-option [nzLabel]="'Option1-1'" [nzValue]="'Option1-1'"></nz-option>
        <nz-option [nzLabel]="'Option1-2'" [nzValue]="'Option1-2'"></nz-option>
      </nz-select>
      <nz-select [ngModel]="'Option2-1'">
        <nz-option [nzLabel]="'Option2-1'" [nzValue]="'Option2-1'"></nz-option>
        <nz-option [nzLabel]="'Option2-2'" [nzValue]="'Option2-2'"></nz-option>
      </nz-select>
    </nz-input-group>
    <br>
    <nz-input-group [nzSize]="'large'" nzCompact>
      <nz-select [ngModel]="'Between'">
        <nz-option [nzLabel]="'Between'" [nzValue]="'Between'"></nz-option>
        <nz-option [nzLabel]="'Except'" [nzValue]="'Except'"></nz-option>
      </nz-select>
      <input type="text" placeholder="Minimum" nz-input style="width: 100px; text-align: center;">
      <input type="text" placeholder="~" nz-input style="width: 24px; border-left: 0px; pointer-events: none;">
      <input type="text" placeholder="Maximum" nz-input style="width: 100px; text-align: center; border-left: 0px;">
    </nz-input-group>
    <br>
    <nz-input-group [nzSize]="'large'" nzCompact>
      <nz-select [ngModel]="'Sign Up'">
        <nz-option [nzLabel]="'Sign Up'" [nzValue]="'Sign Up'"></nz-option>
        <nz-option [nzLabel]="'Sign In'" [nzValue]="'Sign In'"></nz-option>
      </nz-select>
      <input placeholder="Email" style="width: 50%;" nz-input>
    </nz-input-group>
  `,

  styles: []
})
export class NzDemoInputGroupComponent {
  _valueOne = '0571';
  _valueTwo = '26888888';
  date = new Date();
}
