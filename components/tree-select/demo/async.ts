import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-select-async',
  template: `
    <nz-tree-select style="width: 250px"
                    nzPlaceHolder="Please select"
                    [nzDefaultExpandedKeys]="expandKeys"
                    [nzDropdownMatchSelectWidth]="true"
                    [nzDropdownStyle]="{ 'max-height': '300px' }"
                    [(ngModel)]="value"
                    [nzNodes]="nodes"
                    [nzAsyncData]="true"
                    (nzExpandChange)="onExpandChange($event)">
    </nz-tree-select>
  `
})

export class NzDemoTreeSelectAsyncComponent implements OnInit {
  expandKeys = [ '1001', '10001' ];
  value: string;
  nodes = [
    new NzTreeNode({
      title: 'root1',
      key: '1001',
      children: [
        {
          title: 'child1',
          key: '10001',
          children: [
            {
              title: 'child1.1',
              key: '100011',
              children: []
            },
            {
              title: 'child1.2',
              key: '100012',
              children: [
                {
                  title: 'grandchild1.2.1',
                  key: '1000121',
                  isLeaf: true,
                  disabled: true
                },
                {
                  title: 'grandchild1.2.2',
                  key: '1000122',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    }),
    new NzTreeNode({
      title: 'root2',
      key: '1002',
      children: [
        {
          title: 'child2.1',
          key: '10021',
          children: [],
          disabled: true
        },
        {
          title: 'child2.2',
          key: '10022',
          children: [
            {
              title: 'grandchild2.2.1',
              key: '100221',
              isLeaf: true
            }
          ]
        }
      ]
    })
  ];

  onExpandChange(e: NzFormatEmitEvent): void {
    if (e.node.getChildren().length === 0 && e.node.isExpanded) {
      this.loadNode().then(data => {
        e.node.addChildren(data);
      });
    }
  }

  loadNode(): Promise<any[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([
          new NzTreeNode({
            title: 'root2',
            key: '10030-' + (new Date()).getTime(),
            children: [
              {
                title: 'child2.1',
                key: '10021',
                children: [],
                checked: true,
                disabled: true
              },
              {
                title: 'child2.2',
                key: '10022',
                children: [
                  {
                    title: 'grandchild2.2.1',
                    key: '100221',
                    isLeaf: true
                  }
                ]
              }
            ]
          }),
          {
            title: 'childAdd-1',
            key: '10031-' + (new Date()).getTime()
          },
          {
            title: 'childAdd-2',
            key: '10032-' + (new Date()).getTime(),
            isLeaf: true
          }]),
        1000);
    });
  }

  ngOnInit(): void {
  }
}
