import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-tree-dynamic',
  template: `
    <nz-tree
      [nzData]="nodes"
      nzAsyncData="true"
      (nzClick)="nzEvent($event)"
      (nzExpandChange)="nzEvent($event)">
    </nz-tree>
  `
})

export class NzDemoTreeDynamicComponent implements OnInit {
  nodes = [
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2', isLeaf: true }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    // load child async
    if (event.eventName === 'expand') {
      setTimeout(_ => {
        if (event.node.getChildren().length === 0 && event.node.isExpanded) {
          event.node.addChildren([
            { title: 'Child Node', key: `${event.node.key}-0` },
            { title: 'Child Node', key: `${event.node.key}-1` } ]);
        }
      }, 1000);
    }
  }

  ngOnInit(): void {
  }
}
