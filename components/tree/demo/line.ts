import { Component } from '@angular/core';

@Component({
    selector: 'nz-demo-tree-line',
    template: `
        <nz-tree [nzTreeData]="nodes"
                 [nzShowLine]="true"
                 (nzExpandChange)="mouseAction('expand',$event)"
                 (nzDblClick)="mouseAction('dblclick',$event)"
                 (nzContextMenu)="mouseAction('contextmenu', $event)"
                 (nzClick)="mouseAction('click',$event)">
        </nz-tree>`
})
export class NzDemoTreeLineComponent {
    nodes = [
        {
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
                                    checked: true,
                                    disabled: true
                                },
                                {
                                    title: 'grandchild1.2.2',
                                    key: '1000122',
                                    isLeaf: true,
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'child2',
                    key: '10002'
                }
            ]
        },
        {
            title: 'root2',
            key: '1002',
            children: [
                {
                    title: 'child2.1',
                    key: '10021',
                    children: []
                },
                {
                    title: 'child2.2',
                    key: '10022',
                    children: [
                        {
                            title: 'grandchild2.2.1',
                            key: '100221',
                        }
                    ]
                }
            ]
        },
        {title: 'root3', key: '1003'}
    ];

    mouseAction(name: string, e: any): void {
        console.log(name, e);
    }
}
