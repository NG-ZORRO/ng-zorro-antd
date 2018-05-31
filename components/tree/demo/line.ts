import { Component } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-line',
  template: `
    <nz-tree [(ngModel)]="nodes"
             [nzShowLine]="true"
             [nzDefaultExpandedKeys]="expandKeys"
             (nzExpandChange)="mouseAction('expand',$event)"
             (nzDblClick)="mouseAction('dblclick',$event)"
             (nzContextMenu)="mouseAction('contextmenu', $event)"
             (nzClick)="mouseAction('click',$event)">
    </nz-tree>`
})
export class NzDemoTreeLineComponent {
  expandKeys = [ '1001', '10001' ];
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
              title   : 'child1.2',
              key     : '100012',
              children: [
                {
                  title   : 'grandchild1.2.1',
                  key     : '1000121',
                  isLeaf  : true,
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
          title   : 'child2',
          key     : '10002',
          children: [
            {
              title : 'grandchild2.1',
              key   : '1000122',
              isLeaf: true
            },
            {
              title : 'grandchild2.2',
              key   : '1000123',
              isLeaf: true
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
          title          : 'child2.1',
          key            : '10021',
          children       : [],
          disableCheckbox: true
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

  mouseAction(name: string, e: any): void {
    console.log(name, e);
  }
}
