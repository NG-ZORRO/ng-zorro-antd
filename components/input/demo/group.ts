import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-group',
  template: `
    <nz-input-group [nzSize]="'large'">
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="5">
          <input type="text" nz-input [ngModel]="'0571'" />
        </div>
        <div nz-col nzSpan="8">
          <input type="text" nz-input [ngModel]="'26888888'" />
        </div>
      </div>
    </nz-input-group>
    <br />
    <nz-input-group nzCompact>
      <input type="text" nz-input [ngModel]="'0571'" style="width: 20%;" />
      <input type="text" nz-input [ngModel]="'26888888'" style="width:30%;" />
    </nz-input-group>
    <br />
    <nz-input-group nzCompact>
      <nz-select [ngModel]="'Zhejiang'">
        <nz-option [nzLabel]="'Zhejiang'" [nzValue]="'Zhejiang'"></nz-option>
        <nz-option [nzLabel]="'Jiangsu'" [nzValue]="'Jiangsu'"></nz-option>
      </nz-select>
      <input type="text" nz-input [ngModel]="'Xihu District, Hangzhou'" style="width:50%;" />
    </nz-input-group>
    <br />
    <nz-input-group nzCompact>
      <nz-select [ngModel]="'Option1'">
        <nz-option [nzLabel]="'Option1'" [nzValue]="'Option1'"></nz-option>
        <nz-option [nzLabel]="'Option2'" [nzValue]="'Option2'"></nz-option>
      </nz-select>
      <input type="text" nz-input [ngModel]="'input content'" style="width:50%;" />
      <nz-input-number></nz-input-number>
    </nz-input-group>
    <br />
    <nz-input-group nzCompact>
      <input type="text" nz-input [ngModel]="'input content'" style="width:50%;" />
      <nz-date-picker></nz-date-picker>
    </nz-input-group>
    <br />
    <nz-input-group nzCompact>
      <nz-select [ngModel]="'Option1-1'">
        <nz-option [nzLabel]="'Option1-1'" [nzValue]="'Option1-1'"></nz-option>
        <nz-option [nzLabel]="'Option1-2'" [nzValue]="'Option1-2'"></nz-option>
      </nz-select>
      <nz-select [ngModel]="'Option2-1'">
        <nz-option [nzLabel]="'Option2-1'" [nzValue]="'Option2-1'"></nz-option>
        <nz-option [nzLabel]="'Option2-2'" [nzValue]="'Option2-2'"></nz-option>
      </nz-select>
    </nz-input-group>
    <br />
    <nz-input-group nzCompact>
      <nz-select [ngModel]="'Between'">
        <nz-option [nzLabel]="'Between'" [nzValue]="'Between'"></nz-option>
        <nz-option [nzLabel]="'Except'" [nzValue]="'Except'"></nz-option>
      </nz-select>
      <input type="text" nz-input placeholder="Minimum" style="width:100px; text-align: center;" />
      <input
        type="text"
        disabled
        nz-input
        placeholder="~"
        style="width: 30px; border-left: 0px; pointer-events: none; background-color: rgb(255, 255, 255);"
      />
      <input type="text" nz-input placeholder="Maximum" style="width: 100px; text-align: center; border-left: 0px;" />
    </nz-input-group>
    <br />
    <nz-input-group nzCompact>
      <nz-select [ngModel]="'Sign Up'">
        <nz-option [nzLabel]="'Sign Up'" [nzValue]="'Sign Up'"></nz-option>
        <nz-option [nzLabel]="'Sign In'" [nzValue]="'Sign In'"></nz-option>
      </nz-select>
      <input type="email" nz-input placeholder="Email" style="width: 200px;" />
    </nz-input-group>
    <br />
    <nz-input-group nzCompact>
      <nz-select [ngModel]="'Home'" style="width: 30%;">
        <nz-option [nzLabel]="'Home'" [nzValue]="'Home'"></nz-option>
        <nz-option [nzLabel]="'Company'" [nzValue]="'Company'"></nz-option>
      </nz-select>
      <nz-cascader [nzOptions]="options" style="width: 70%;"></nz-cascader>
    </nz-input-group>
  `
})
export class NzDemoInputGroupComponent {
  options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
              isLeaf: true
            }
          ]
        },
        {
          value: 'ningbo',
          label: 'Ningbo',
          isLeaf: true
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];
}
