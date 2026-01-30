import { Component } from '@angular/core';

import { NzFormatEmitEvent, NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'nz-demo-tree-dynamic',
  imports: [NzTreeModule],
  template: ` <nz-tree [nzData]="nodes" nzAsyncData (nzClick)="nzEvent($event)" (nzExpandChange)="nzEvent($event)" /> `
})
export class NzDemoTreeDynamicComponent {
  readonly nodes = [
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2', isLeaf: true }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    // load child async
    if (event.eventName === 'expand') {
      const node = event.node;
      if (node?.getChildren().length === 0 && node?.isExpanded) {
        this.loadNode().then(data => {
          node.addChildren(data);
        });
      }
    }
  }

  loadNode(): Promise<NzTreeNodeOptions[]> {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve([
            { title: 'Child Node', key: `${new Date().getTime()}-0` },
            { title: 'Child Node', key: `${new Date().getTime()}-1` }
          ]),
        1000
      );
    });
  }
}
