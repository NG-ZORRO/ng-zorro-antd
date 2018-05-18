import {Component, OnInit} from '@angular/core';
import {NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-select-multiple',
  template: `
    <nz-tree-select style="width: 250px"
                    [nzNodes]="nodes"
                    [nzDefaultExpandAll]="true"
                    [nzAllowClear]="false"
                    nzPlaceHolder="Please select"
                    [(ngModel)]="value"
                    [nzMultiple]="true"
                    (ngModelChange)="onChange($event)">
    </nz-tree-select>
  `
})

export class NzDemoTreeSelectMultipleComponent implements OnInit {

  value: string[] = ['100011'];
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
          disableCheckbox: true
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

  onChange($event: NzTreeNode): void {
    console.log($event);
  }

  ngOnInit(): void {
  }
}
