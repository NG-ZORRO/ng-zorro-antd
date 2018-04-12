import { Component } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-search',
  template: `
    <nz-input-group [nzSuffix]="suffixIcon">
      <input type="text" nz-input placeholder="Search Tree Node" [(ngModel)]="searchValue">
    </nz-input-group>
    <ng-template #suffixIcon>
      <i class="anticon anticon-search"></i>
    </ng-template>
    <nz-tree [(ngModel)]="nodes"
             [nzSearchValue]="searchValue"
             [nzCheckable]="true"
             (nzOnSearchNode)="mouseAction('search',$event)"
             (nzCheckBoxChange)="mouseAction('check',$event)"
             (nzClick)="mouseAction('click', $event)"
             (nzExpandChange)="mouseAction('expand',$event)"
             (nzDblClick)="mouseAction('dblclick',$event)">
    </nz-tree>`
})
export class NzDemoTreeSearchComponent {
  searchValue;
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
              checked : true,
              children: [
                {
                  title : 'grandchild1.2.1',
                  key   : '1000121',
                  isLeaf: true
                }
              ]
            }
          ]
        },
        {
          title : 'child2',
          key   : '10002',
          isLeaf: true
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
          title     : 'child1.2',
          key       : '10022',
          selectable: false,
          children  : [
            {
              title: 'grandchild2.2.1',
              key  : '100221'
            }
          ]
        }
      ]
    }),
    new NzTreeNode({
      title: 'root3',
      key  : '1003'
    })
  ];

  mouseAction(name: string, e: any): void {
    console.log(name, e);
  }
}
