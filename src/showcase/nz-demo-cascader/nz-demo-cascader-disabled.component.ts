import {Component} from '@angular/core';

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
  disabled: true,
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
  selector: 'nz-demo-cascader-disabled',
  template: `
    <nz-cascader
      [nzOptions]="_options"
      [(ngModel)]="_value"
      (ngModelChange)="_console($event)"
      (nzChange)="_console($event)">
    </nz-cascader>`,
  styles  : []
})
export class NzDemoCascaderDisabledComponent {
  /** init data */
  _options = options;

  _value: any[] = null;

  _console(value) {
    console.log(value);
  }
}

