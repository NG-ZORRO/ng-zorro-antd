// tslint:disable:no-any
import { Component } from '@angular/core';

const options = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    children: [
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        children: [
          {
            code: 'xihu',
            name: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        code: 'ningbo',
        name: 'Ningbo',
        children: [
          {
            code: 'dongqianlake',
            name: 'Dongqian Lake',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    children: [
      {
        code: 'nanjing',
        name: 'Nanjing',
        children: [
          {
            code: 'zhonghuamen',
            name: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'nz-demo-cascader-custom-field-names',
  template: `
    <nz-cascader
      [nzChangeOn]="validate"
      [nzOptions]="nzOptions"
      [nzLabelProperty]="'name'"
      [nzValueProperty]="'code'"
      [nzShowSearch]="true"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
    >
    </nz-cascader>
  `,
  styles: [
    `
      .ant-cascader-picker {
        width: 300px;
      }
    `
  ]
})
export class NzDemoCascaderCustomFieldNamesComponent {
  nzOptions = options;
  values: any[] | null = null;

  onChanges(values: any): void {
    console.log(values, this.values);
  }

  validate(option: any, _index: number): boolean {
    const value = option.value;
    return ['hangzhou', 'xihu', 'nanjing', 'zhonghuamen'].indexOf(value) >= 0;
  }
}
