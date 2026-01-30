import { Component } from '@angular/core';

import { NzCascaderModule, NzCascaderOption, NzCascaderPlacement } from 'ng-zorro-antd/cascader';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

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
  selector: 'nz-demo-cascader-placement',
  imports: [NzCascaderModule, NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="placements" (nzValueChange)="setPlacement($event)" />
    <br />
    <br />
    <nz-cascader [nzOptions]="nzOptions" [nzPlacement]="placement" />
  `
})
export class NzDemoCascaderPlacementComponent {
  readonly nzOptions: NzCascaderOption[] = options;
  placement: NzCascaderPlacement = 'topLeft';
  readonly placements: NzCascaderPlacement[] = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

  setPlacement(placement: string | number): void {
    this.placement = placement as NzCascaderPlacement;
  }
}
