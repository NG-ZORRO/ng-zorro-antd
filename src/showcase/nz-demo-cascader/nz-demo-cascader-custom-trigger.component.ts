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
  selector: 'nz-demo-cascader-custom-trigger',
  template: `
    {{_text}}
    <nz-cascader
      [nzShowInput]="false"
      [nzOptions]="_options"
      [(ngModel)]="_value"
      (ngModelChange)="_console($event)"
      (nzChange)="_console($event)"
      (nzSelectionChange)="onSelectionChange($event)"
      >
      <a href="javascript: void(0)">Change city</a>
    </nz-cascader>`,
  styles  : []
})
export class NzDemoCascaderCustomTriggerComponent {
  /** init data */
  _options = options;

  _value: any[] = null;

  _text = 'Unselect';

  _console(value) {
    console.log(value);
  }

  onSelectionChange(selectedOptions: any[]): void {
    this._text = selectedOptions.map(o => o.label).join(', ');
  }
}

