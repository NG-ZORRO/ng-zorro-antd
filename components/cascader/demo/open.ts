import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

const options: NzCascaderOption[] = [
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
  selector: 'nz-demo-cascader-open',
  imports: [FormsModule, NzCascaderModule, NzFlexModule, NzSwitchModule],
  template: `
    <div nz-flex nzVertical nzGap="small">
      <nz-switch [(ngModel)]="open" nzCheckedChildren="open" nzUnCheckedChildren="close"></nz-switch>
      <nz-cascader
        [nzOptions]="nzOptions"
        [ngModel]="values"
        [nzOpen]="open"
        (nzSelectionChange)="onSelectionChange($event)"
        (nzVisibleChange)="onVisibleChange($event)"
      ></nz-cascader>
    </div>
  `
})
export class NzDemoCascaderOpenComponent {
  nzOptions = options;
  values = ['zhejiang', 'hangzhou', 'xihu'];
  open = false;

  onSelectionChange(selectedOptions: NzCascaderOption[]): void {
    console.log(selectedOptions);
  }

  onVisibleChange(visible: boolean): void {
    console.log(visible);
  }
}
