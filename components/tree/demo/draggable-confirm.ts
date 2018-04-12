import { Component } from '@angular/core';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzModalService, NzTreeNode } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'nz-demo-tree-draggable-confirm',
  template: `
    <nz-tree [(ngModel)]="nodes"
             (nzExpandChange)="mouseAction('expand',$event)"
             [nzDraggable]="true"
             [nzBeforeDrop]="beforeDrop"
             (nzOnDragStart)="mouseAction('dragstart',$event)"
             (nzOnDragEnter)="mouseAction('enter',$event)"
             (nzOnDragLeave)="mouseAction('leave', $event)"
             (nzOnDrop)="mouseAction('drop', $event)"
             (nzOnDragEnd)="mouseAction('end', $event)">
    </nz-tree>
  `,
  styles  : [
      `
      :host ::ng-deep .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
        width: calc(100% - 8px);
      }

      :host ::ng-deep .ant-tree li span[draggable], :host ::ng-deep .ant-tree li span[draggable="true"] {
        width: calc(100% - 8px);
      }
    `
  ]
})

export class NzDemoTreeDraggableConfirmComponent {
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

  mouseAction(name: string, e: NzFormatEmitEvent): void {
    if (name !== 'over') {
      console.log(name, e);
    }
  }

  beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
    // if insert node into another node, wait 1s
    if (arg.pos === 0) {
      return of(true).pipe(delay(1000));
    } else {
      return of(false);
    }
  }
}
