import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

function createNodes(): NzTreeNodeOptions[] {
  return [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      icon: 'smile',
      children: [
        { title: 'leaf 1-0-0', key: '10010', icon: 'meh', isLeaf: true },
        { title: 'leaf 1-0-1', key: '10011', icon: 'frown', isLeaf: true }
      ]
    }
  ];
}

@Component({
  selector: 'nz-demo-tree-select-customized-selected-node',
  imports: [FormsModule, NzIconModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      style="width: 250px"
      [(ngModel)]="value"
      [nzNodes]="nodes1"
      [nzSelectedTemplate]="nzSelectedTemplate"
      nzPlaceHolder="Please select"
      nzShowIcon
    ></nz-tree-select>
    <br />
    <nz-tree-select
      style="width: 250px; margin-top: 20px;"
      [(ngModel)]="multipleValue"
      [nzNodes]="nodes2"
      [nzSelectedTemplate]="nzSelectedTemplate"
      nzMultiple
      nzPlaceHolder="Please select"
    >
    </nz-tree-select>
    <ng-template #nzSelectedTemplate let-node>
      <span class="ant-tree-node-content-wrapper" [class.ant-tree-node-selected]="node.isSelected">
        <span>
          <span nz-icon [nzType]="node.icon"></span>
          {{ node.title }}
        </span>
      </span>
    </ng-template>
  `
})
export class NzDemoTreeSelectCustomizedSelectedNodeComponent {
  value?: string;
  readonly nodes1 = createNodes();

  multipleValue?: string[];
  readonly nodes2 = createNodes();
}
