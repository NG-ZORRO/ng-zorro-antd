import {Component, OnInit} from '@angular/core';

const init_options = [{
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

const other_options = [{
  value: 'fujian',
  label: 'Fujian',
  children: [{
    value: 'xiamen',
    label: 'Xiamen',
    children: [{
      value: 'Kulangsu',
      label: 'Kulangsu',
      isLeaf: true
    }],
  }],
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
    }],
  }],
}];


@Component({
  selector: 'nz-demo-cascader-basic',
  template: `
    <nz-cascader
      [class.class123]="true"
      [nzOptions]="_options"
      [(ngModel)]="_value"
      (ngModelChange)="_console($event)"
      (nzChange)="_console($event)">
    </nz-cascader>
    <a href="javascript:;" (click)="_changeNzOptions()" class="change-options">
      Change Options
    </a>
    `,
  styles  : [
    `
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
  _options = null;

  _value: any[] = null;

  _console(value) {
    console.log(value);
  }

  constructor() {
  }

  ngOnInit() {
    // let's set nzOptions in a asynchronous  way
    setTimeout(() => {
      this._options = init_options;
    }, 100);
  }

  _changeNzOptions(): void {
    if (this._options === init_options) {
      this._options = other_options;
    } else {
      this._options = init_options;
    }
  }
}

