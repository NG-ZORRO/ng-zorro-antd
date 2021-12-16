import { Component, OnInit } from '@angular/core';

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
            children: [
              {
                value: 'duanqiao',
                label: 'Duan Bridge',
                isLeaf: true
              }
            ]
          },
          {
            value: 'lingyinsi',
            label: 'Lingyin Temple',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true,
        disabled: true
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
  selector: 'nz-demo-cascader-multiple',
  template: `
    <nz-cascader
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      [nzMultiple]="true"
      [nzShowSearch]="true"
      [nzMaxTagCount]="2"
      (ngModelChange)="onChanges($event)"
      nzExpandTrigger="hover"
      style="width: 100%;"
    ></nz-cascader>
  `,
  styles: [
    `
      .change-options {
        display: inline-block;
        font-size: 12px;
        margin-top: 8px;
      }
    `
  ]
})
export class NzDemoCascaderMultipleComponent implements OnInit {
  nzOptions: NzCascaderOption[] | null = null;
  values: string[] | string[][] | null = null;

  ngOnInit(): void {
    setTimeout(() => {
      this.nzOptions = options;
    }, 100);
  }

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }
}
