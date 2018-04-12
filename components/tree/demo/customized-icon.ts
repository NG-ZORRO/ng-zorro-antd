import { Component, OnInit } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-customized-icon',
  template: `
    <nz-tree [(ngModel)]="nodes"
             [nzShowExpand]="false"
             [nzDraggable]="true"
             (nzClick)="mouseAction('click', $event)"
             (nzDblClick)="mouseAction('dblclick',$event)"
    >
      <ng-template #nzTreeTemplate let-node>
        <span class="custom-node" draggable="true" aria-grabbed="true" [class.active]="node.isSelected">
          <span>
            <i class="anticon anticon-smile-o" *ngIf="node.isExpanded"></i>
            <i class="anticon anticon-frown-o" *ngIf="!node.isExpanded"></i> {{node.title}}
          </span>
        </span>
      </ng-template>
    </nz-tree>`,
  styles  : [ `
    .custom-node {
      padding: 2px 8px;
    }

    .active {
      background-color: #bae7ff;
    }

    .anticon {
      padding-left: 4px;
      padding-right: 4px;
    }

    :host ::ng-deep .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
      width: calc(100% - 8px);
    }

    :host ::ng-deep .ant-tree li span[draggable], :host ::ng-deep .ant-tree li span[draggable="true"] {
      width: calc(100% - 8px);
    }
  ` ]
})
export class NzDemoTreeCustomizedIconComponent implements OnInit {
  nodes = [
    new NzTreeNode({
      title   : 'root1',
      key     : '1001',
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
        },
        {
          title: 'child2',
          key  : '10002'
        }
      ]
    }),
    new NzTreeNode({
      title   : 'root2',
      key     : '1002',
      expanded: true,
      children: [
        {
          title   : 'child2.1',
          key     : '10021',
          children: []
        },
        {
          title   : 'child2.2',
          key     : '10022',
          children: [
            {
              title: 'grandchild2.2.1',
              key  : '100221'
            }
          ]
        }
      ]
    }),
    new NzTreeNode({ title: 'root3', key: '1003' })
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
