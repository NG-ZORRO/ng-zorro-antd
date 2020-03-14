import { Component } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

const options = [
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

@Component({
  selector: 'nz-demo-cascader-default-value',
  template: `
    <nz-cascader [nzOptions]="nzOptions" [(ngModel)]="values" (ngModelChange)="onChanges($event)"> </nz-cascader>
  `
})
export class NzDemoCascaderDefaultValueComponent {
  nzOptions: NzCascaderOption[] = options;

  values: string[] = ['zhejiang', 'hangzhou', 'xihu'];
  /* // or like this:
  values: any[] = [{
    value: 'zhejiang',
    label: 'Zhejiang'
  }, {
    value: 'hangzhou',
    label: 'Hangzhou'
  }, {
    value: 'xihu',
    label: 'West Lake'
  }]; */

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }
}
