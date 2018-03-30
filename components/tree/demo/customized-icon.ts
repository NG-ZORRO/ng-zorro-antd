import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-tree-customized-icon',
  template: `
    <nz-tree [nzTreeData]="nodes"
             [nzShowExpand]="false"
             [nzCheckable]="true"
             [nzDraggable]="true"
             (nzDblClick)="mouseAction('dblclick',$event)"
    >
      <ng-template #nzTreeTemplate let-node>
        <span draggable="true" aria-grabbed="true" [class.active]="node.isSelected">
          <span>
            <i class="anticon anticon-smile-o" *ngIf="node.isExpanded"></i>
            <i class="anticon anticon-frown-o" *ngIf="!node.isExpanded"></i> {{node.title}}
          </span>
        </span>
      </ng-template>
    </nz-tree>`,
  styles  : [ `
    .active {
      background-color: #bae7ff;
    }
  ` ]
})
export class NzDemoTreeCustomizedIconComponent implements OnInit {
  nodes = [
    {
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
    },
    {
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
    },
    { title: 'root3', key: '1003' }
  ];

  mouseAction(name: string, e: any): void {
    if (name === 'dblclick') {
      setTimeout(() => {
        e.node.isExpanded = !e.node.isExpanded;
      });
    }
  }

  ngOnInit(): void {

  }
}
