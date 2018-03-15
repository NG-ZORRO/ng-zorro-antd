import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nz-demo-tree-basic',
    template: `
        <nz-tree [nzTreeData]="nodes"
                 [nzCheckable]="true"
                 [nzMultiple]="true"
                 [nzDefaultExpandedKeys]="expandKeys"
                 [nzDefaultCheckedKeys]="checkedKeys"
                 [nzDefaultSelectedKeys]="selectedKeys"
                 [nzDefaultExpandAll]="expandDefault"
                 (nzClick)="mouseAction('click',$event)">
        </nz-tree>`
})
export class NzDemoTreeBasicComponent implements OnInit {
    expandKeys = ['1001', '10001'];
    checkedKeys = ['10001', '100012'];
    selectedKeys = ['10001', '100011'];
    expandDefault = false;
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
                    children: [],
                    disableCheckbox: true,
                },
                {
                    title: 'child2.2',
                    key: '10022',
                    children: [
                        {
                            title: 'grandchild2.2.1',
                            key: '100221'
                        }
                    ]
                }
            ]
        },
        {title: 'root3', key: '1003'}
    ];

    mouseAction(name: string, event: any): void {
        console.log(name, event);
    }

    ngOnInit(): void {
    }
}
