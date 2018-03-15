// tslint:disable:no-any
import { Component } from '@angular/core';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }]
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }]
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }]
  }]
}];

@Component({
  selector: 'nz-demo-cascader-default-value',
  template: `
    <nz-cascader
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)">
    </nz-cascader>
  `,
  styles  : [
    `
    .ant-cascader-picker {
      width: 300px;
    }
    `
  ]
})
export class NzDemoCascaderDefaultValueComponent {
  /** init data */
  public nzOptions = options;

  /** ngModel value */
  public values: any[] = ['zhejiang', 'hangzhou', 'xihu'];
  /* // or like this:
  public values: any[] = [{
    value: 'zhejiang',
    label: 'Zhejiang'
  }, {
    value: 'hangzhou',
    label: 'Hangzhou'
  }, {
    value: 'xihu',
    label: 'West Lake'
  }]; */

  public onChanges(values: any): void {
    console.log(values, this.values);
  }
}
