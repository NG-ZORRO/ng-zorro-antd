import { Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-method',
  template: `
    <nz-tree
      #nzTree
      [(ngModel)]="nodes"
      [nzCheckable]="true"
      [nzMultiple]="true"
      [nzCheckStrictly]="true"
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
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  expandKeys = [ '1001', '10001' ];
  checkedKeys = [ '10001' ];
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
    console.log(name, event);
    // just for demo, should get in ngAfterViewInit
    console.log('checkedNodes: %o', this.nzTree.getCheckedNodeList());
    console.log('selectedNodes: %o', this.nzTree.getSelectedNodeList());
    console.log(this.nzTree.nzTreeService.getCheckedNodeList());
  }

  ngOnInit(): void {
  }
}
