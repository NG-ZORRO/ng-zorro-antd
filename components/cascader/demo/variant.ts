import { Component } from '@angular/core';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzSpaceModule } from 'ng-zorro-antd/space';

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
  imports: [NzCascaderModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-cascader *nzSpaceItem [nzOptions]="options" nzVariant="outlined" />
      <nz-cascader *nzSpaceItem [nzOptions]="options" nzVariant="filled" />
      <nz-cascader *nzSpaceItem [nzOptions]="options" nzVariant="borderless" />
      <nz-cascader *nzSpaceItem [nzOptions]="options" nzVariant="underlined" />
    </nz-space>
  `
})
export class NzDemoCascaderVariantComponent {
  protected readonly options = options;
}
