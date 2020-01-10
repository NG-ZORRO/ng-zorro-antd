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
  selector: 'nz-demo-cascader-size',
  template: `
    <nz-cascader [nzSize]="'large'" [nzOptions]="nzOptions" [(ngModel)]="value1" (ngModelChange)="onChanges($event)"> </nz-cascader>
    <nz-cascader [nzOptions]="nzOptions" [(ngModel)]="value2" (ngModelChange)="onChanges($event)"> </nz-cascader>
    <nz-cascader [nzSize]="'small'" [nzOptions]="nzOptions" [(ngModel)]="value3" (ngModelChange)="onChanges($event)"> </nz-cascader>
  `,
  styles: [
    `
      .ant-cascader-picker {
        width: 300px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoCascaderSizeComponent {
  nzOptions: NzCascaderOption[] = options;
  value1: string[] | null = null;
  value2: string[] | null = null;
  value3: string[] | null = null;

  onChanges(values: string[]): void {
    console.log(values);
  }
}
