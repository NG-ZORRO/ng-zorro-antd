import { Component } from '@angular/core';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  selector: 'nz-demo-cascader-prefix-and-suffix',
  imports: [NzCascaderModule, NzFlexModule, NzIconModule],
  template: `
    <nz-flex nzVertical nzGap="small">
      <nz-cascader [nzOptions]="nzOptions" nzSuffixIcon="smile" />
      <nz-cascader [nzOptions]="nzOptions" nzExpandIcon="smile" />
      <nz-cascader [nzOptions]="nzOptions" [nzPrefix]="smile" />
    </nz-flex>
    <ng-template #smile><nz-icon nzType="smile" /></ng-template>
  `
})
export class NzDemoCascaderPrefixAndSuffixComponent {
  readonly nzOptions: NzCascaderOption[] = options;
}
