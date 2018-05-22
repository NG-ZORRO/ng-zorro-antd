// tslint:disable:no-any
import { Component, OnInit } from '@angular/core';

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
  selector: 'nz-demo-cascader-default-value-and-asyn-options',
  template: `
    <nz-cascader
      [(ngModel)]="values"
      [nzOptions]="nzOptions"
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
export class NzDemoCascaderDefaultValueAndAsynOptionsComponent implements OnInit {
  /** init data */
  public nzOptions = null;

  /** ngModel value */
  public values: any[] = ['zhejiang', 'hangzhou', 'xihu'];

  public onChanges(values: any): void {
    console.log(values, this.values);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.nzOptions = options;
    }, 500);
  }

}
