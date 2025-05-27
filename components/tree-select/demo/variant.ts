import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-variant',
  imports: [FormsModule, NzTreeSelectModule, NzFlexDirective, NzSpaceModule],
  template: `
    <div nz-flex nzGap="large">
      <nz-space nzDirection="vertical" style="flex: 1">
        <nz-tree-select
          *nzSpaceItem
          style="width: 100%"
          [nzNodes]="nodes"
          nzVariant="outlined"
          [ngModel]="defaultValue"
          [nzDefaultExpandAll]="true"
        ></nz-tree-select>
        <nz-tree-select
          *nzSpaceItem
          style="width: 100%"
          [nzNodes]="nodes"
          nzVariant="filled"
          [ngModel]="defaultValue"
          [nzDefaultExpandAll]="true"
        ></nz-tree-select>
        <nz-tree-select
          *nzSpaceItem
          style="width: 100%"
          [nzNodes]="nodes"
          nzVariant="borderless"
          [ngModel]="defaultValue"
          [nzDefaultExpandAll]="true"
        ></nz-tree-select>
        <nz-tree-select
          *nzSpaceItem
          style="width: 100%"
          [nzNodes]="nodes"
          nzVariant="underlined"
          [ngModel]="defaultValue"
          [nzDefaultExpandAll]="true"
        ></nz-tree-select>
      </nz-space>
      <nz-space nzDirection="vertical" style="flex: 1">
        <nz-tree-select
          *nzSpaceItem
          style="width: 100%"
          nzVariant="outlined"
          [nzNodes]="nodes"
          [nzMaxTagCount]="3"
          [nzAllowClear]="true"
          [nzMultiple]="true"
          [ngModel]="defaultValue"
          [nzDefaultExpandAll]="true"
        ></nz-tree-select>
        <nz-tree-select
          *nzSpaceItem
          style="width: 100%"
          nzVariant="filled"
          [nzNodes]="nodes"
          [nzMaxTagCount]="3"
          [nzAllowClear]="true"
          [nzMultiple]="true"
          [ngModel]="defaultValue"
          [nzDefaultExpandAll]="true"
        ></nz-tree-select>
        <nz-tree-select
          *nzSpaceItem
          style="width: 100%"
          nzVariant="borderless"
          [nzNodes]="nodes"
          [nzMaxTagCount]="3"
          [nzAllowClear]="true"
          [nzMultiple]="true"
          [ngModel]="defaultValue"
          [nzDefaultExpandAll]="true"
        ></nz-tree-select>
        <nz-tree-select
          *nzSpaceItem
          style="width: 100%"
          nzVariant="underlined"
          [nzNodes]="nodes"
          [nzMaxTagCount]="3"
          [nzAllowClear]="true"
          [nzMultiple]="true"
          [ngModel]="defaultValue"
          [nzDefaultExpandAll]="true"
        ></nz-tree-select>
      </nz-space>
    </div>
  `
})
export class NzDemoTreeSelectVariantComponent {
  readonly defaultValue = '100';
  readonly nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];
}
