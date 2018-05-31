import { Component, OnInit } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-customized-icon',
  template: `
    <nz-tree [(ngModel)]="nodes"
             [nzShowExpand]="false"
             (nzClick)="mouseAction('click', $event)"
             (nzDblClick)="mouseAction('dblclick',$event)"
    >
      <ng-template #nzTreeTemplate let-node>
        <span class="custom-node" [class.active]="node.isSelected">
          <span>
            <i class="anticon anticon-smile-o" *ngIf="node.isExpanded"></i>
            <i class="anticon anticon-frown-o" *ngIf="!node.isExpanded"></i> {{node.title}}
          </span>
        </span>
      </ng-template>
    </nz-tree>`,
  styles  : [ `
    :host ::ng-deep .ant-tree {
      overflow: hidden;
      margin: 0 -24px;
      padding: 0 24px;
    }
    
    .custom-node {
      cursor: pointer;
      line-height: 30px;
      display: inline-block;
      margin: 0 -1000px;
      padding: 0 1000px;
    }

    .active {
      background: #1890ff;
      color: #fff;
    }

    .anticon {
      padding: 0 4px;
    }
  ` ]
})
export class NzDemoTreeCustomizedIconComponent implements OnInit {
  nodes = [
    new NzTreeNode({
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
    })
  ];

  mouseAction(name: string, e: any): void {
    switch (name) {
      case 'click':
        break;
      case 'dblclick':
        setTimeout(() => {
          e.node.isExpanded = !e.node.isExpanded;
        });
        break;
    }
  }

  ngOnInit(): void {

  }
}
