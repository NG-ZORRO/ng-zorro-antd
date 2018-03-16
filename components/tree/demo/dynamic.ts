import { Component } from '@angular/core';

@Component({
    selector: 'nz-demo-tree-dynamic',
    template: `
        <nz-tree [nzTreeData]="nodes" [nzAsyncData]="true" (nzCheckBoxChange)="mouseAction('check',$event)"
                 (nzExpandChange)="mouseAction('expand',$event)">
        </nz-tree>`
})
export class NzDemoTreeDynamicComponent {
    nodes = [
        {
            title: 'root1',
            key: '1001',
            children: []
        },
        {
            title: 'root2',
            key: '1002',
            children: []
        },
        {
            title: 'root3',
            key: '1003'
        }
    ];

    mouseAction(name: string, e: any): void {
        if (name === 'expand') {
            setTimeout(_ => {
                if (e.node.getChildren().length === 0 && e.node.isExpanded) {
                    e.node.addChildren([
                        {
                            title: 'childAdd-1',
                            key: '10031-' + (new Date()).getTime()
                        },
                        {
                            title: 'childAdd-2',
                            key: '10032-' + (new Date()).getTime(),
                            isLeaf: true
                        }]);
                }
            }, 1000);
        }
    }
}
