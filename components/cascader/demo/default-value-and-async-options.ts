import { Component, OnInit } from '@angular/core';
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
  selector: 'nz-demo-cascader-default-value-and-async-options',
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader [(ngModel)]="values" [nzOptions]="nzOptions" (ngModelChange)="onChanges($event)"></nz-cascader>
  `
})
export class NzDemoCascaderDefaultValueAndAsyncOptionsComponent implements OnInit {
  nzOptions: NzCascaderOption[] | null = null;
  values: string[] = ['zhejiang', 'hangzhou', 'xihu'];

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.nzOptions = options;
    }, 500);
  }
}
