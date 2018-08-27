import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-select-customized-icon',
  template: `
    <nz-tree-select
      style="width: 250px"
      [nzNodes]="nodes"
      [(ngModel)]="value"
      nzPlaceHolder="Please select"
    >
      <ng-template #nzTreeTemplate let-node>
        <span class="ant-tree-node-content-wrapper" [class.ant-tree-node-selected]="node.isSelected">
          <span>
            <i class="anticon anticon-smile-o" *ngIf="node.isExpanded"></i>
            <i class="anticon anticon-frown-o" *ngIf="!node.isExpanded"></i> {{node.title}}
          </span>
        </span>
      </ng-template>
    </nz-tree-select>`,
  styles  : [ `
    .anticon {
      padding-right: 4px;
    }
  ` ]
})
export class NzDemoTreeSelectCustomizedIconComponent {
  value: string;
  nodes = [
    {
      title   : 'root1',
      key     : '1001',
      expanded: true,
      children: [
        {
          title   : 'child1',
          key     : '10001',
          children: [
            {
              title   : 'child1.1',
              key     : '100011',
              selected: true,
              children: []
            },
            {
              title   : 'child1.2',
              key     : '100012',
              children: [
                {
                  title   : 'grandchild1.2.1',
                  key     : '1000121',
                  isLeaf  : true,
                  checked : true,
                  disabled: true
                },
                {
                  title : 'grandchild1.2.2',
                  key   : '1000122',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}
