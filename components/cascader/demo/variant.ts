import { Component } from '@angular/core';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzFlexModule } from 'ng-zorro-antd/flex';

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
  selector: 'nz-demo-cascader-variant',
  imports: [NzCascaderModule, NzFlexModule],
  template: `
    <nz-flex nzVertical nzGap="middle">
      <nz-cascader [nzOptions]="options" nzVariant="outlined" />
      <nz-cascader [nzOptions]="options" nzVariant="filled" />
      <nz-cascader [nzOptions]="options" nzVariant="borderless" />
      <nz-cascader [nzOptions]="options" nzVariant="underlined" />
    </nz-flex>
  `
})
export class NzDemoCascaderVariantComponent {
  readonly options = options;
}
