import { Component } from '@angular/core';
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
  selector: 'nz-demo-cascader-trigger',
  template: `
    {{ text }}
    <nz-cascader
      [nzShowInput]="false"
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
      (nzSelectionChange)="onSelectionChange($event)"
    >
      <a href="javascript: void(0)">Change city</a>
    </nz-cascader>
  `
})
export class NzDemoCascaderTriggerComponent {
  nzOptions: NzCascaderOption[] = options;
  values: string[] | null = null;
  text = 'Unselect';

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  onSelectionChange(selectedOptions: NzCascaderOption[]): void {
    this.text = selectedOptions.map(o => o.label).join(', ');
  }
}
