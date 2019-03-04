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

const otherOptions = [{
  value: 'fujian',
  label: 'Fujian',
  children: [{
    value: 'xiamen',
    label: 'Xiamen',
    children: [{
      value: 'Kulangsu',
      label: 'Kulangsu',
      isLeaf: true
    }]
  }]
}, {
  value: 'guangxi',
  label: 'Guangxi',
  children: [{
    value: 'guilin',
    label: 'Guilin',
    children: [{
      value: 'Lijiang',
      label: 'Li Jiang River',
      isLeaf: true
    }]
  }]
}];

@Component({
  selector: 'nz-demo-cascader-basic',
  template: `
    <nz-cascader
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)">
    </nz-cascader>
    &nbsp;
    <a href="javascript:;" (click)="changeNzOptions()" class="change-options">
      Change Options
    </a>
    `,
  styles  : [
    `
    .ant-cascader-picker {
      width: 300px;
    }
    .change-options {
      display: inline-block;
      font-size: 12px;
      margin-top: 8px;
    }
    `
  ]
})
export class NzDemoCascaderBasicComponent implements OnInit {
  /** init data */
  public nzOptions = null;

  /** ngModel value */
  public values: any[] = null;

  ngOnInit(): void {
    // let's set nzOptions in a asynchronous way
    setTimeout(() => {
        this.nzOptions = options;
    }, 100);
  }

  public changeNzOptions(): void {
    if (this.nzOptions === options) {
      this.nzOptions = otherOptions;
    } else {
      this.nzOptions = options;
    }
  }

  public onChanges(values: any): void {
    console.log(values, this.values);
  }
}
