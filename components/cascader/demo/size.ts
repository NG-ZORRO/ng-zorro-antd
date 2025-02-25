import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';

const options: NzCascaderOption[] = [
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
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader
      [nzSize]="'large'"
      [nzOptions]="nzOptions"
      [(ngModel)]="value1"
      (ngModelChange)="onChanges($event)"
    ></nz-cascader>
    <br />
    <br />
    <nz-cascader [nzOptions]="nzOptions" [(ngModel)]="value2" (ngModelChange)="onChanges($event)"></nz-cascader>
    <br />
    <br />
    <nz-cascader
      nzSize="small"
      [nzOptions]="nzOptions"
      [(ngModel)]="value3"
      (ngModelChange)="onChanges($event)"
    ></nz-cascader>
  `
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
