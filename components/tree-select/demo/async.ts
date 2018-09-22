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
  expandKeys = [ '0-0' ];
  value: string;
  nodes = [ {
    title   : 'Node1',
    value   : '0-0',
    key     : '0-0',
    children: [ {
      title: 'Child Node1',
      value: '0-0-1',
      key  : '0-0-1'
    }, {
      title: 'Child Node2',
      value: '0-0-2',
      key  : '0-0-2'
    } ]
  }, {
    title: 'Node2',
    value: '0-1',
    key  : '0-1'
  } ];

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
          { title: 'Child Node', key: `${(new Date()).getTime()}-0` },
          { title: 'Child Node', key: `${(new Date()).getTime()}-1` } ]),
        1000);
    });
  }

  ngOnInit(): void {
  }
}
