import {Component, OnInit} from '@angular/core';

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
    }],
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }],
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
    }],
  }],
}];


@Component({
  selector: 'nz-demo-cascader-size',
  template: `
    <nz-cascader
      [nzSize]="'large'"
      [nzOptions]="_options"
      [(ngModel)]="_value1"
      (ngModelChange)="_console($event)"
      (nzChange)="_console($event)">
    </nz-cascader>
    <br><br>
    <nz-cascader
      [nzOptions]="_options"
      [(ngModel)]="_value2"
      (ngModelChange)="_console($event)"
      (nzChange)="_console($event)">
    </nz-cascader>
    <br><br>
    <nz-cascader
      [nzSize]="'small'"
      [nzOptions]="_options"
      [(ngModel)]="_value3"
      (ngModelChange)="_console($event)"
      (nzChange)="_console($event)">
    </nz-cascader>
  `,
  styles  : []
})
export class NzDemoCascaderSizeComponent implements OnInit {
  /** init data */
  _options = options;

  _value1: any[] = null;
  _value2: any[] = null;
  _value3: any[] = null;

  _console(value) {
    console.log(value);
  }

  constructor() {
  }

  ngOnInit() {
  }
}

