import { Component } from '@angular/core';
import { CascaderOption } from 'ng-zorro-antd/cascader';

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
  nzOptions: CascaderOption[] = options;
  values: string[] | null = null;

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  validate(option: CascaderOption, _index: number): boolean {
    const value = option.value as string;
    return ['hangzhou', 'xihu', 'nanjing', 'zhonghuamen'].indexOf(value) >= 0;
  }
}
