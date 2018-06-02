import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-draggable',
  template: `
    <nz-tree [(ngModel)]="nodes"
             (nzExpandChange)="mouseAction('expand',$event)"
             [nzDraggable]="true"
             (nzOnDragStart)="mouseAction('dragstart',$event)"
             (nzOnDragEnter)="mouseAction('enter',$event)"
             (nzOnDragLeave)="mouseAction('leave', $event)"
             (nzOnDrop)="mouseAction('drop', $event)"
             (nzOnDragEnd)="mouseAction('end', $event)">
    </nz-tree>`,
  styles  : [ `
    :host ::ng-deep .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
      width: calc(100% - 8px);
    }

    :host ::ng-deep .ant-tree li span[draggable], :host ::ng-deep .ant-tree li span[draggable="true"] {
      width: calc(100% - 8px);
    }
  ` ]
})
export class NzDemoTreeDraggableComponent implements OnInit {
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
              title : 'child1.1',
              key   : '100011',
              isLeaf: true
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
    }),
    new NzTreeNode({
      title   : 'root2',
      key     : '1002',
      children: [
        {
          title : 'child2.1',
          key   : '10021',
          isLeaf: true
        },
        {
          title   : 'child2.2',
          key     : '10022',
          children: [
            {
              title : 'grandchild2.2.1',
              key   : '100221',
              isLeaf: true
            }
          ]
        }
      ]
    })
  ];

  mouseAction(name: string, e: NzFormatEmitEvent): void {
    if (name !== 'over') {
      console.log(name, e);
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
