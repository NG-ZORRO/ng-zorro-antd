import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-tree-select-custom-dropdown-header',
  imports: [FormsModule, NzTreeSelectModule, NzDividerModule, NzIconModule],
  template: `
    <nz-tree-select
      style="width: 250px"
      [nzNodes]="nodes"
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
      [nzDropdownRender]="renderTemplate"
    />
    <ng-template #renderTemplate>
      <div class="container">
        <div class="header">
          <nz-icon nzType="plus" />
          Add Item
        </div>
        <nz-divider style="margin: 4px 0" />
      </div>
    </ng-template>
  `,
  styles: `
    .container {
      padding: 4px 8px;
      cursor: pointer;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1890ff;
    }
  `
})
export class NzDemoTreeSelectCustomDropdownHeaderComponent {
  value?: string;
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
        }
      ]
    }
  ];
}
