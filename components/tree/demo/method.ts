import { Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-method',
  template: `
    <nz-tree
      [(ngModel)]="nodes"
      [nzCheckable]="true"
      [nzMultiple]="true"
      [nzDefaultExpandedKeys]="expandKeys"
      [nzDefaultCheckedKeys]="checkedKeys"
      [nzDefaultSelectedKeys]="selectedKeys"
      [nzDefaultExpandAll]="expandDefault"
      (nzClick)="mouseAction('click',$event)"
      (nzCheckBoxChange)="mouseAction('check',$event)"
      (nzDblClick)="mouseAction('dblclick', $event)"
    >
    </nz-tree>`
})

export class NzDemoTreeMethodComponent implements OnInit {
  @ViewChild(NzTreeComponent) nzTree: NzTreeComponent;
  expandKeys = [ '1001', '10001' ];
  checkedKeys = [ '10001', '1002' ];
  selectedKeys = [ '10001', '100011' ];
  expandDefault = false;
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

  mouseAction(name: string, event: NzFormatEmitEvent): void {
    console.log('checkedNodes: %o, flatCheckedNodes: %o', this.nzTree.getCheckedNodeList(), this.nzTree.getFlatCheckedNodeList());
    console.log('selectedNodes: %o', this.nzTree.getSelectedNodeList());
  }

  ngOnInit(): void {
    console.log(this.nzTree.nzTreeService);
  }
}
